    const es = require('@elastic/elasticsearch');
    var fs = require('fs');
    const esClient = new es.Client({
        node: process.env.ELASTIC_DB_URL,
        auth: {
          username:process.env.ELASTIC_DB_USERNAME,
          password:process.env.ELASTIC_DB_PASSWORD,
        },
        tls: {
          ca: fs.readFileSync(process.env.CERTIFICATE_PATH),
          rejectUnauthorized: false
        }
    });
module.exports = esClient;