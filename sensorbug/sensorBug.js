const NobleDevice = require('../lib/noble-device');

const BLUE_RADIOS_CID = 0x0085;
const STATIC_DATA_TEMPLATE_ID = 0x3c;
const TEMPERATURE_DATA_TYPE_ID = 0x43; // consists of alert enabled flag [0|1], data flag [0|1] and temperature data type value [000011 (hex value: 0x03)] = [0|1]+[0|1]+[000011], as alert flag is 0 and data flag is 1 => 01000011 = 0x43 (hex)

const SensorBug = function(peripheral) {
  NobleDevice.call(this, peripheral);
};

NobleDevice.Util.inherits(SensorBug, NobleDevice);

NobleDevice.Util.mixin(SensorBug, NobleDevice.BatteryService);
NobleDevice.Util.mixin(SensorBug, NobleDevice.DeviceInformationService);

SensorBug.prototype.readManuData = function() {
  const manuDataBuff = this._peripheral.advertisement.manufacturerData;

  const buff = Buffer.from(manuDataBuff);

  /*

  console.log("Header (Blue Radios SID = 0x0085):", buff.readInt16LE(0).toString(16)); //buf 0-1
  console.log("Major PID (0x02 = Sensor):", buff.readInt8(2).toString(16));
  console.log("Minor PID (0x00 = SensorBug):", buff.readInt8(3).toString(16));
  console.log("Template ID:", buff.readInt8(4).toString(16));
  console.log("Battery level:", buff.readInt8(5));
  console.log("Config counter:", buff.readInt8(6));
  console.log("Dynamic data type:", buff.readInt8(7)); // 0x43 = Temperature, 0x3c = Accelerometer
  console.log("Temperature:", buff.readInt16LE(8) * 0.0625);

  */

  const data = {};

  if(buff.readInt16LE(0) === BLUE_RADIOS_CID) {

    if(buff.readInt8(4) === STATIC_DATA_TEMPLATE_ID) {
      data.batteryLevel = buff.readInt8(5);
    }

    if(buff.length >= 10 && buff.readInt8(7) === TEMPERATURE_DATA_TYPE_ID) {
      data.temperature = buff.readInt16LE(8) * 0.0625;
    } else {
      console.log("No temperature data found");
    }
  }

  return data
};

module.exports = SensorBug;

