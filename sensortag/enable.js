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


module.exports = {
  enableHumidity,
  enableBarometricPressure,
  enableLuxometer
};
