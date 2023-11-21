const addReading = require('../api/add-reading');

const readAll = async (ruuviTag) => {
  const data = ruuviTag.readManuData();

  await addReading(ruuviTag.uuid, {
    temperature: data.temperature,
    humidity: data.humidity,
    pressure: data.pressure,
    battery: data.batteryVoltage
  });
};

module.exports = {
  readAll
};
