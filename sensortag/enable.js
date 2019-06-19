const enableHumidity = (sensorTag) => {
  return new Promise((resolve, reject) => {
    sensorTag.enableHumidity((err) => {
      if (err) return reject(err);
      else return resolve();
    });
  })
};

const enableBarometricPressure = (sensorTag) => {
  return new Promise((resolve, reject) => {
    sensorTag.enableBarometricPressure((err) => {
      if (err) return reject(err);
      else return resolve();
    });
  })
};

const enableLuxometer = (sensorTag) => {
  return new Promise((resolve, reject) => {
    sensorTag.enableLuxometer((err) => {
      if (err) return reject(err);
      else return resolve();
    });
  })
};

const enableAll = async (sensorTag) => {
  return await Promise.all([
    enableSensorData.enableHumidity(sensorTag),
    enableSensorData.enableBarometricPressure(sensorTag),
    enableSensorData.enableLuxometer(sensorTag)
  ]);
};

module.exports = {
  enableHumidity,
  enableBarometricPressure,
  enableLuxometer,
  enableAll
};
