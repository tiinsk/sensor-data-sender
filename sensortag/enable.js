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
    enableHumidity(sensorTag),
    enableBarometricPressure(sensorTag),
    enableLuxometer(sensorTag)
  ]);
};

module.exports = {
  enableHumidity,
  enableBarometricPressure,
  enableLuxometer,
  enableAll
};
