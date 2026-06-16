const client = require('./client');
const { getToken, invalidateToken } = require('./auth-token');

const sendRequest = async (config) => {
  const token = await getToken();

  try {
    const response = await client({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      invalidateToken();

      const retryToken = await getToken();
      const response = await client({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${retryToken}`,
        },
      });
      return response.data;
    }

    throw error;
  }
};

const post = async (params) => {
  try {
    return await sendRequest({
      method: 'post',
      url: params.route,
      data: params.payload,
    });
  } catch (error) {
    console.error(error.code, error && error.response ? error.response.data : '', `(at: ${new Date()})`);
  }
};

const get = async (params) => {
  try {
    return await sendRequest({
      method: 'GET',
      url: params.route,
      data: params.payload,
    });
  } catch (error) {
    console.error(error.code, error && error.response ? error.response.data : '', `(at: ${new Date()})`);
  }
};

module.exports = {
  post,
  get,
};
