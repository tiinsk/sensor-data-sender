const SensorBug = require('./sensorBug');
const readSensorBug = require('./read');
const sensorBugId = require('../config').devices.sensorBug;

const discoverAndRead = () => {
  SensorBug.discoverById(sensorBugId, (sensorBug) => {
    readSensorBug.readAll(sensorBug);
  });
};

module.exports = {
  discoverAndRead
};
