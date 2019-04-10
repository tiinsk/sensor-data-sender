const api = require('./index');

module.exports = (deviceId, reading) => {
  return api.post({
    route: `/devices/${deviceId}/readings`,
    deviceId,
    payload: reading
  });
};

