//Code copied from: https://github.com/ruuvi/ruuvi.endpoints.js/blob/master/handlers/raw2.js

function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

var parseRawRuuvi = function(manufacturerDataString){
  let robject = {};
  let data = manufacturerDataString;
  //let dataFormat = data[0] & 0xFF;
  let temperature = (data[1] << 8 | data[2] & 0xFF);
  if (temperature > 32767) {
    temperature -= 65535;
  }
  temperature /= 200.0;
  let humidity =  ((data[3] & 0xFF) << 8 | data[4] & 0xFF) / 400.0;
  let pressure = ((data[5] & 0xFF) << 8 | data[6] & 0xFF) + 50000;
  //let accelerationX = (data[7] << 8 | data[8] & 0xFF) / 1000.0;
  //let accelerationY = (data[9] << 8 | data[10] & 0xFF) / 1000.0;
  //let accelerationZ = (data[11] << 8 | data[12] & 0xFF) / 1000.0;
  let powerInfo = (data[13] & 0xFF) << 8 | data[14] & 0xFF;
  let batteryVoltage = (powerInfo >>> 5) / 1000.0 + 1.6;
  //let txPower = (powerInfo & 0b11111) * 2 - 40;
  //let movementCounter = data[15] & 0xFF;
  //let measurementSequenceNumber = (data[16] & 0xFF) << 8 | data[17] & 0xFF;
  //let mac = toHexString(data.subarray(18));

  //robject.destination_endpoint = dataFormat;
  robject.temperature = temperature;
  robject.humidity = humidity;
  robject.pressure = pressure * 0.01 //Pa -> mBar;
  //robject.accelerationX = accelerationX;
  //robject.accelerationY = accelerationY;
  //robject.accelerationZ = accelerationZ;
  robject.batteryVoltage = batteryVoltage;
  //robject.txPower = txPower;
  //robject.movementCounter = movementCounter;
  //robject.measurementSequenceNumber = measurementSequenceNumber;
  //robject.mac = mac;

  return robject;
}

module.exports = function(data) {
  let robject = {};

  if(data[0] != 0x05 || data.length < 24){
    console.log("Improperly formatted RuuviTag data");
  }
  else {
    robject = parseRawRuuvi(data);
  }
  return robject;
};
