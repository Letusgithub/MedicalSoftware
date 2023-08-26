const { ElasticsearchService } = require('../services/itemSearch.service');

exports.itemSearch = async (req, res) => {
  const query = req.query.query;

  console.log(query);

  try {
    const suggestions = await ElasticsearchService(query);
    const object = suggestions.suggest.medicine_suggestion[0].options;

    const data = object.map((item) => item._source);

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error 1' });
  }
};
