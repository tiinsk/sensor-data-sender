const parseData = require("./parse");
const addReading = require('../api/add-reading');

const readManuData = async (peripheral, showLog = false) => {
  const manuData = peripheral.advertisement.manufacturerData;
  //Slice off manufacturer data (9904: Manufacturer: Ruuvi Innovations, least Significant byte first)
  const parsedData = parseData(manuData.slice(2));

  try {
    if(showLog) {
      console.log("Connected to ruuvitag: ", peripheral.id, ` (at: ${new Date()})`);
    }
    await addReading(peripheral.uuid, {
      temperature: parsedData.temperature,
      humidity: parsedData.humidity,
      pressure: parsedData.pressure,
      battery: parsedData.batteryVoltage
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  readManuData,
};
