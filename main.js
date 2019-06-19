const SensorTag = require('sensortag');
const SensorBug = require('./sensorbug');
const readSensorData = require('./sensortag/read');

const deviceId = require('./config').devices.sensorTag;

const INTERVAL = 600000; //10min



SensorTag.discoverById(deviceId, function (sensorTag) {
  console.log("Connecting to device:", sensorTag.id, `(at: ${new Date()})`);
  sensorTag.on('disconnect', function() {
    console.log("Disconnected from device:", sensorTag.id, `(at: ${new Date()})`);
    process.exit(0);
  });
  sensorTag.connectAndSetUp(async function (error) {
    console.log("Connected to device:", sensorTag.id, `(at: ${new Date()})`);

    readSensorData.readAll(sensorTag);
    setInterval(() => readSensorData.readAll(sensorTag), INTERVAL);
  });
});


SensorBug.discoverAndRead();

setInterval(() => {
  SensorBug.discoverAndRead();
}, INTERVAL);
