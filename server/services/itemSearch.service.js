const es = require('../config/elasticsearch.config');

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

    try {
      const { body } = await es.search({ index: 'new_allopathy_index', body: baseQuery });
      return body;
    } catch (error) {
      throw new Error('Error fetching suggestions:', error);
    }
  },
};
