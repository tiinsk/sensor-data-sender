const env = require('../env');
const client = require('./client');

const REFRESH_BUFFER_MS = 5 * 60 * 1000; // = 5 minutes

let cachedToken = null;
let expiresAt = 0;
let fetchPromise = null;

const isTokenValid = () =>
  cachedToken && Date.now() < expiresAt - REFRESH_BUFFER_MS;

const exchangeToken = async () => {
  const response = await client.post(
    'token',
    { apiKey: env.api_key },
    { headers: { 'Content-Type': 'application/json' } }
  );

  const { token, expiresIn } = response.data;
  cachedToken = token;
  expiresAt = Date.now() + expiresIn * 1000;
  return cachedToken;
};

const getToken = async () => {
  if (isTokenValid()) {
    return cachedToken;
  }

  if (!fetchPromise) {
    fetchPromise = exchangeToken().finally(() => {
      fetchPromise = null;
    });
  }

  return fetchPromise;
};

const invalidateToken = () => {
  cachedToken = null;
  expiresAt = 0;
};

module.exports = {
  getToken,
  invalidateToken,
};
