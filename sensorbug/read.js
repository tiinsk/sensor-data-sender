const addReading = require('../api/add-reading');

const readAll = async (sensorBug) => {
  const data = sensorBug.readManuData();

  await addReading(sensorBug.uuid, {
    temperature: data.temperature,
    humidity: data.humidity,
    pressure: data.pressure,
    lux: data.lux,
    battery: data.batteryLevel
  });
};

module.exports = {
  readAll
};
