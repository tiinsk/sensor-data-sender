const enableSensorData = require('./enable');
const disableSensorData = require('./disable');
const addReading = require('../api/add-reading');

const ENABLE_WAIT_TIME = 1500;

const readHumidity = (sensorTag) => {
  return new Promise((resolve, reject) => {
    sensorTag.readHumidity((err, temperature, humidity) => {
      if (err) return reject(err);
      else return resolve({
        temperature,
        humidity
      });
    });
  })
};

const readBarometricPressure = (sensorTag) => {
  return new Promise((resolve, reject) => {
    sensorTag.readBarometricPressure((err, pressure) => {
      if (err) return reject(err);
      else return resolve({
        pressure
      });
    });
  })
};

const readLuxometer = (sensorTag) => {
  return new Promise((resolve, reject) => {
    sensorTag.readLuxometer((err, lux) => {
      if (err) return reject(err);
      else return resolve({
        lux
      });
    });
  })
};

const readBatteryLevel = (sensorTag) => {
  return new Promise((resolve, reject) => {
    sensorTag.readBatteryLevel((err, batteryLevel) => {
      if (err) return reject(err);
      else return resolve({
        batteryLevel
      });
    });
  })
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

const readAll = async (sensorTag) => {
  await enableSensorData.enableAll(sensorTag);

  setTimeout(async ()=> {
    const data = await readData(sensorTag);
    await addReading(sensorTag.id, {
      temperature: data.temperature,
      humidity: data.humidity,
      pressure: data.pressure,
      lux: data.lux,
      battery: data.batteryLevel
    });

    await disableSensorData.disableAll(sensorTag);
  }, ENABLE_WAIT_TIME);
};

module.exports = {
  readHumidity,
  readBarometricPressure,
  readLuxometer,
  readBatteryLevel,
  readAll
};
