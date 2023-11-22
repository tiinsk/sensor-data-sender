const api = require('./index');

module.exports = () => {
  return api.get({
    route: `/devices`,
  });
};

