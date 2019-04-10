const SensorTag = require('sensortag');
const readSensorData = require('./sensortag/read');
const enableSensorData = require('./sensortag/enable');
const disableSensorData = require('./sensortag/disable');
const addReading = require('./api/add-reading');

const deviceId = require('./config').device_id;

const INTERVAL = 600000;
const ENABLE_WAIT_TIME = 1000;

const readAll = async (sensorTag) => {
  await enableAll(sensorTag);

    setTimeout(async ()=> {
      const data = await readData(sensorTag);
      await addReading(sensorTag.id, {
        temperature: data.temperature,
        humidity: data.humidity,
        pressure: data.pressure,
        lux: data.lux,
        battery: data.batteryLevel
      });

    await disableAll(sensorTag);
  }, ENABLE_WAIT_TIME);
};

const readData = async (sensorTag) => {
  const [hum, press, lux, battery] = await Promise.all([
    readSensorData.readHumidity(sensorTag),
    readSensorData.readBarometricPressure(sensorTag),
    readSensorData.readLuxometer(sensorTag),
    readSensorData.readBatteryLevel(sensorTag)
  ]);

  return {
    ...hum,
    ...press,
    ...lux,
    ...battery
  };
};

const enableAll = async (sensorTag) => {
  return await Promise.all([
    enableSensorData.enableHumidity(sensorTag),
    enableSensorData.enableBarometricPressure(sensorTag),
    enableSensorData.enableLuxometer(sensorTag)
  ]);
};

const disableAll = (sensorTag) => {
  return Promise.all([
    disableSensorData.disableHumidity(sensorTag),
    disableSensorData.disableBarometricPressure(sensorTag),
    disableSensorData.disableLuxometer(sensorTag)
  ]);
};

SensorTag.discoverById(deviceId, function (sensorTag) {
  console.log("Connecting to device:", sensorTag.id);
  sensorTag.on('disconnect', function() {
    console.log("Disconnected from device:", sensorTag.id);
    process.exit(0);
  });
  sensorTag.connectAndSetUp(async function (error) {
    console.log("Connected to device:", sensorTag.id);

    readAll(sensorTag);
    setInterval(() => readAll(sensorTag), INTERVAL);
  });
});
