const SensorBug = require('./sensorbug');
const SensorTag = require('./sensortag');

const INTERVAL = 600000; //10min


( async () => {
  const readSensorTagData = await SensorTag.discover();
  await readSensorTagData();

  await SensorBug.discoverAndRead();

  setInterval(async () => {
    await readSensorTagData();
    await SensorBug.discoverAndRead();
  }, INTERVAL);

})();

