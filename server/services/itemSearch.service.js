const { es } = require('../config/elasticsearch');

module.exports = {

  ElasticsearchService: async (query) => {
    const baseQuery = {
      _source: false,
      suggest: {
        medicine_suggestion: {
          prefix: query,
          completion: {
            field: 'med_name',
            size: 10,
          },
        },
      },
    };

    console.log(baseQuery.suggest.medicine_suggestion);
    try {
      const { body } = await es.search({
        index: 'new_allopathy_index',
        body: {
          suggest: baseQuery.suggest, // Use the suggest object directly
        },
      });
      console.log(body);
      return body;
    } catch (error) {
      throw new Error(`Error fetching suggestions: ${error.message}`);
    }
  },
};
