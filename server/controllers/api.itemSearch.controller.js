const { ElasticsearchService } = require('../services/itemSearch.service');

exports.itemSearch = async (req, res) => {
  const query = req.query.query;

  console.log(query);

  try {
    const suggestions = await ElasticsearchService(query);
    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error 1' });
  }
};
