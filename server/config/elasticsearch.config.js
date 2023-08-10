const { Client } = require('@elastic/elasticsearch');

const elasticsearchConfig = {
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'VRa1s8seRcHdtRGe-VYk',
  },
};

const es = new Client(elasticsearchConfig);

module.exports = {
  es,
};
