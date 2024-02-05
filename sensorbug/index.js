const { parseData } = require('./parse');
const addReading = require('../api/add-reading');

const readManuData = async (peripheral, showLog = false) => {
  const manuData = peripheral.advertisement.manufacturerData;
  const parsedData = parseData(manuData);

  try {
    if(showLog) {
      console.log("Connected to sensorbug: ", peripheral.id, ` (at: ${new Date()})`);
    }
    await addReading(peripheral.uuid, {
      temperature: parsedData.temperature,
      battery: parsedData.batteryVoltage
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  readManuData,
};
