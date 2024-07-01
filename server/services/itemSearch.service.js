const { es } = require('../config/elasticsearch');

module.exports = {
  ESitemSearchService: async (query) => {
    const baseQuery = {
      _source: ['med_name', 'mfd_mkt', 'pack_size', 'salt_composition', 'added_by', 'id'],
      query: {
        match: {
          med_name_search: {
            query,
            fuzziness: 'auto',
          },
        },
      },
      // Commented out the suggest part to avoid undefined error
      /* suggest: { 
        medicine_suggestion: {
          prefix: query,
          completion: {
            field: 'med_name',
            size: 10,
            fuzzy: {
              fuzziness: 'auto',
            },
          },
        },
      }, */
    };

    const indexName = 'product_search_index_v2';

    try {
      // Attempt the search
      const { body } = await es.search({
        index: indexName,
        body: baseQuery,
        /* body: {  **for index v2
          suggest: baseQuery.suggest, // Use the suggest object directly
        }, */
      });
      return body;
    } catch (error) {
      // Handle index not found error
      if (error.meta && error.meta.body && error.meta.body.error && error.meta.body.error.type === 'index_not_found_exception') {
        console.error(`Index not found: ${indexName}. Creating index...`);

        try {
          // Create the index
          await es.indices.create({
            index: indexName,
            body: {
              mappings: {
                properties: {
                  med_name_search: { type: 'text' },
                  med_name: { type: 'completion' },
                  mfd_mkt: { type: 'text' },
                  pack_size: { type: 'text' },
                  salt_composition: { type: 'text' },
                  added_by: { type: 'text' },
                  id: { type: 'integer' },
                },
              },
            },
          });
          console.log(`Index created: ${indexName}`);

          // Retry the search
          const { body } = await es.search({
            index: indexName,
            body: baseQuery,
            /* body: {  **for index v2
              suggest: baseQuery.suggest, // Use the suggest object directly
            }, */
          });
          return body;
        } catch (createError) {
          throw new Error(`Error creating index: ${createError.message}`);
        }
      } else {
        // Handle other errors
        throw new Error(`Error fetching suggestions: ${error.message}`);
      }
    }
  },
};
