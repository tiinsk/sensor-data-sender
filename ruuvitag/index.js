const RuuviTag = require('./ruuviTag');
const readRuuviTag = require('./read');
const ruuviTagIds = require('../config').devices.ruuviTags;

const discoverAndRead = async (showLog) => {
  return new Promise((resolve, reject) => {
    ruuviTagIds.forEach(id => {
      try {
        RuuviTag.discoverById(id, async (ruuviTag) => {
          if (showLog) {
            console.log("Connecting to ruuvitag:", ruuviTag.id, `(at: ${new Date()})`);
          }
          try {
            await readRuuviTag.readAll(ruuviTag);
            resolve();
          } catch (e) {
            console.log("Ruuvitag error:", e);
            reject(e);
          }
        });
      } catch (e) {
        console.log("Ruuvitag discover error: ", e);
      }
    })
  });
};

module.exports = {
  discoverAndRead
};
