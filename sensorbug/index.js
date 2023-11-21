const SensorBug = require('./sensorBug');
const readSensorBug = require('./read');
const sensorBugId = require('../config').devices.sensorBug;

const discoverAndRead = async (showLog) => {
  return new Promise((resolve, reject) => {
    try {
      SensorBug.discoverById(sensorBugId, async (sensorBug) => {
        if (showLog) {
          console.log("Connecting to sensorbug:", sensorBug.id, `(at: ${new Date()})`);
        }
        try {
          await readSensorBug.readAll(sensorBug);
          resolve();
        } catch (e) {
          console.log("SensorBug Error: ", e);
          SensorBug.removeAllListeners()
          reject(e);
        }
      });
    } catch (e) {
      console.log("SensorBug discover error:", e);
    }
  });
};

module.exports = {
  discoverAndRead
};
