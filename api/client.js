const axios = require('axios');
const env = require('../env');

const client = axios.create({
  baseURL: env.api.route,
});

module.exports = client;
