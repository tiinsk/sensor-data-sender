const NobleDevice = require('../lib/noble-device');
const parseData = require('./parse');

const RuuviTag = function(peripheral) {
  NobleDevice.call(this, peripheral);
};

NobleDevice.Util.inherits(RuuviTag, NobleDevice);

NobleDevice.Util.mixin(RuuviTag, NobleDevice.BatteryService);
NobleDevice.Util.mixin(RuuviTag, NobleDevice.DeviceInformationService);

RuuviTag.prototype.readManuData = function() {
  const manuData = this._peripheral.advertisement.manufacturerData;
  //Slice off manufacturer data (9904: Manufacturer: Ruuvi Innovations, Least Significant Byte first.)
  return parseData(manuData.slice(2));
};

module.exports = RuuviTag;

