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


module.exports = {
  readHumidity,
  readBarometricPressure,
  readLuxometer,
  readBatteryLevel
};
