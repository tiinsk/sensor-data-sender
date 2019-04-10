const disableHumidity = (sensorTag) => {
  return new Promise((resolve, reject) => {
    sensorTag.disableHumidity((err) => {
      if (err) return reject(err);
      else return resolve();
    });
  })
};

const disableBarometricPressure = (sensorTag) => {
  return new Promise((resolve, reject) => {
    sensorTag.disableBarometricPressure((err) => {
      if (err) return reject(err);
      else return resolve();
    });
  })
};

const disableLuxometer = (sensorTag) => {
  return new Promise((resolve, reject) => {
    sensorTag.disableLuxometer((err) => {
      if (err) return reject(err);
      else return resolve();
    });
  })
};


module.exports = {
  disableHumidity,
  disableBarometricPressure,
  disableLuxometer
};
