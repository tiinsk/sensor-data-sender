//Code copied from: https://github.com/ruuvi/ruuvi.endpoints.js/blob/master/handlers/raw2.js

var parseRaw = function(manufacturerDataString){
  let robject = {};
  let data = manufacturerDataString;
  let temperature = (data[1] << 8 | data[2] & 0xFF);
  if (temperature > 32767) {
    temperature -= 65535;
  }
  temperature /= 200.0;
  let humidity =  ((data[3] & 0xFF) << 8 | data[4] & 0xFF) / 400.0;
  let pressure = ((data[5] & 0xFF) << 8 | data[6] & 0xFF) + 50000;
  let pm25 = ((data[7] & 0xFF) << 8 | data[8] & 0xFF) / 10;
  let co2 = ((data[9] & 0xFF) << 8 | data[10] & 0xFF);

  let vocLo = data[11] & 0xff;
  let noxLo = data[12] & 0xff;
  let flags = data[16] & 0xff;
  let voc9 = (vocLo << 1) | ((flags >> 6) & 1);
  let nox9 = (noxLo << 1) | ((flags >> 7) & 1);

  robject.temperature = temperature;
  robject.humidity = humidity;
  robject.pressure = pressure * 0.01 //Pa -> mBar;
  robject.pm25 = pm25;
  robject.co2 = co2;
  robject.voc = voc9;
  robject.nox = nox9;

  return robject;
}

module.exports = function(data) {
  let robject = {};

  if(data[0] != 0x06 || data.length < 20){
    console.log("Improperly formatted RuuviAir data");
  }
  else {
    robject = parseRaw(data);
  }
  return robject;
};
