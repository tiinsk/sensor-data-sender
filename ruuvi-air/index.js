const parseData = require("./parse");
const addReading = require('../api/add-reading');

const readManuData = async (peripheral, showLog = false) => {
  const manuData = peripheral.advertisement.manufacturerData;
  //Slice off manufacturer data (least Significant byte first)
  const parsedData = parseData(manuData.slice(2));

  try {
    if(showLog) {
      console.log("Connected to ruuvi-air: ", peripheral.id, ` (at: ${new Date()})`);
    }
    await addReading(peripheral.uuid, {
      temperature: parsedData.temperature,
      humidity: parsedData.humidity,
      pressure: parsedData.pressure,
      pm25: parsedData.pm25,
      co2: parsedData.co2,
      voc: parsedData.voc,
      nox: parsedData.nox,
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  readManuData,
};
