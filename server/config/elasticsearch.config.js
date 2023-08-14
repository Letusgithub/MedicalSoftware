const { Client } = require('@elastic/elasticsearch');
const { errors } = require('@elastic/elasticsearch');

const elasticsearchConfig = {
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'VRa1s8seRcHdtRGe-VYk',
  },
};

const es = new Client(elasticsearchConfig);

console.log(errors);

module.exports = {
  es,
};

// (async () => {
//   try {
//     // Ping Elasticsearch to check the connection
//     const response = await es.ping();

//     if (response.statusCode === 200) {
//       console.log('Connected to Elasticsearch');
//     } else {
//       console.log(response);
//       console.log('Failed to connect to Elasticsearch');
//     }
//   } catch (error) {
//     console.error('Error connecting to Elasticsearch:', error);
//   }
// })();
