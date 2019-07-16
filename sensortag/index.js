const SensorTag = require('sensortag');
const deviceId = require('../config').devices.sensorTag;
const readSensorData = require('./read');


const discover = () => {
  return new Promise((resolve, reject) => {

    SensorTag.discoverById(deviceId, function (sensorTag) {
      console.log("Connecting to device:", sensorTag.id, `(at: ${new Date()})`);

      sensorTag.on('disconnect', function () {
        console.log("Disconnected from device:", sensorTag.id, `(at: ${new Date()})`);
      });

      sensorTag.connectAndSetUp(async function (error) {
        console.log("Connected to device:", sensorTag.id, `(at: ${new Date()})`);

        const readData = () => {
          return readSensorData.readAll(sensorTag);
        };

        if (error) return reject(error);
        else return resolve(readData);
      });

    });

  });
};

module.exports = {
  discover
};
