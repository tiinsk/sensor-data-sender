const config = require('../config');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const instance = axios.create({
  baseURL: config.api.route
});

const post = async (params) => {
  try {
    const response = await instance({
      method: 'post',
      url: params.route,
      headers: {
        Authorization: `Bearer ${jwt.sign({
          iat: Date.now(),
          apiKey: config.api_key,
        }, config.api.secret)}`,
      },
      data: params.payload
    });
    return response.data;
  } catch (error) {
    console.error(error.code, error && error.response ? error.response.data : '', `(at: ${new Date()})`);
  }
};

const get = async (params) => {
  try {
    const response = await instance({
      method: 'GET',
      url: params.route,
      headers: {
        Authorization: `Bearer ${jwt.sign({
          iat: Date.now(),
          apiKey: config.api_key,
        }, config.api.secret)}`,
      },
      data: params.payload,
    });
    return response.data;
  } catch (error) {
    console.error(error.code, error && error.response ? error.response.data : '', `(at: ${new Date()})`);
  }
};


module.exports = {
  post,
  get,
};
