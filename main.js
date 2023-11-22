const ruuviTag = require('./ruuvitag');
const config = require('./config');
const noble = require('@abandonware/noble');
const parseData = require("./ruuvitag/parse");
const getAllDevices = require('./api/get-all-devices');

const scanDevices = async (showLog) => {
  const devices = await getAllDevices();
  if(devices && devices.values) {
    // TODO add other device types. Currently handles only ruuvi tags
    let ruuviTagIds = devices.values.map(device => device.id);
    let discoverTimeout;

    noble.startScanningAsync();

    const stopDiscovering = () => {
      noble.stopScanning();
      noble.removeListener('discover', onDiscover);
    }

    const onDiscover = (peripheral) => {
      if (ruuviTagIds.includes(peripheral.uuid)) {
        ruuviTag.readManuData(peripheral, showLog);
        ruuviTagIds = ruuviTagIds.filter(id => id !== peripheral.uuid);
      }
      if (ruuviTagIds.length === 0) {
        stopDiscovering();

        if (discoverTimeout) {
          clearTimeout(discoverTimeout);
        }
      }
    }

    noble.on('discover', onDiscover);
    discoverTimeout = setTimeout(() => {
      stopDiscovering();
    }, config.timeout);
  }
}

const main = async () => {
  console.log("Application started:", `(at: ${new Date()})`);
  scanDevices(true);

  setInterval(() => {
    scanDevices();
  }, config.interval);
}

try {
  main();
} catch (e) {
  console.log("MAIN ERROR: ", e);
}
