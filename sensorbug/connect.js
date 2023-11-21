/*const connectAndSetup = (sensorBug) => {

  sensorBug.on('disconnect', () => {
    console.log("Disconnected from device:", sensorBug.uuid, `(at: ${new Date()})`);
  });

  sensorBug.connectAndSetUp((error) => {
    if (error) {
      console.log("Connection error: ", error);
    }
    console.log("Connected to device:", sensorBug.uuid, `(at: ${new Date()})`);

    sensorBug.enableTemperature((err) => {
      if (err) {
        console.log("Error enabling temperature sensor", err);
      } else console.log('Temperature sensor enabled');
    });

    setTimeout(() => {
      readTemperature(sensorBug);

      sensorBug.disableTemperature((err) => {
        if (err) {
          console.log("Error disabling temperature sensor", err);
        } else console.log('Temperature sensor disabled');
      });
    }, 1500);
  });
};*/

/*
const readTemperature = (sensorBug) => {
  sensorBug.readTemperature((error, data) => {
    if (data) {
      const buf = Buffer.from(data);

      if (buf.length) {
        console.log(buf.readUInt16LE(0).toString() * .0625);
      }
    }
  });
};
*/
