const SensorBug = require('./sensorbug');
//const SensorTag = require('./sensortag');
const RuuviTag = require('./ruuvitag');

const INTERVAL = 600000; //10min

const main = async () => {
  console.log("Application started:", `(at: ${new Date()})`);

  // TODO: Fork sensorTag and change dependency to lib/noble-device
  //const readSensorTagData = await SensorTag.discover();
  //await readSensorTagData();

  //await SensorBug.discoverAndRead(true);
  await RuuviTag.discoverAndRead(true);

  setInterval(async () => {
    //await readSensorTagData();
    //await SensorBug.discoverAndRead(false);
    await RuuviTag.discoverAndRead(false);
  }, INTERVAL);
}

try {
  main();
} catch (e) {
  console.log("MAIN ERROR: ", e);
}
