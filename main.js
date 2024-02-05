const noble = require('@abandonware/noble');

const ruuviTag = require('./ruuvitag');
const sensorbug = require('./sensorbug');
const config = require('./config');
const getAllDevices = require('./api/get-all-devices');

const scanDevices = async (showLog) => {
  const deviceResult = await getAllDevices();
  if(deviceResult && deviceResult.values) {
    let devices = deviceResult.values;
    let discoverTimeout;

    noble.startScanningAsync();

    const stopDiscovering = () => {
      noble.stopScanning();
      noble.removeListener('discover', onDiscover);
    }

    const onDiscover = (peripheral) => {
      const device = devices.find(d => d.id === peripheral.uuid);
      if (device) {
        if(device.type === 'sensorbug') {
          sensorbug.readManuData(peripheral, showLog);
        }
        else if(device.type === 'ruuvi') {
          ruuviTag.readManuData(peripheral, showLog);
        }
        devices = devices.filter(d => d.id !== peripheral.uuid);
      }
      if (devices.length === 0) {
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
