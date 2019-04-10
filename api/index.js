const config = require('../config');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const instance = axios.create({
  baseURL: apiConfig.route
});

const post = async (params) => {
  try {
    const response = await instance({
      method: 'post',
      url: params.route,
      headers: {
        'authorization': jwt.sign({
          device: params.deviceId,
          iat: Date.now(),
          api_key: config.api_keys[params.deviceId]
        }, config.api.secret)
      },
      data: params.payload
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  post
};
