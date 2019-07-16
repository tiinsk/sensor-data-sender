const SensorBug = require('./sensorBug');
const readSensorBug = require('./read');
const sensorBugId = require('../config').devices.sensorBug;

const discoverAndRead = async () => {
  return new Promise((resolve, reject) => {
    SensorBug.discoverById(sensorBugId, async (sensorBug) => {
      try {
        await readSensorBug.readAll(sensorBug);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
};

module.exports = {
  discoverAndRead
};
