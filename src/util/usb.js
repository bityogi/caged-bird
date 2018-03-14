import Q from 'q';
import _ from 'lodash';
import path from 'path';

const electron = window.require('electron');
const remote = electron.remote;
const fs = remote.require('fs');
const drivelist = remote.require('drivelist');

// import USB from 'Central/USB';



export const getUSBData = () => {
  var deferred = Q.defer();
  console.log('inside getUSBData!');
  try {

    drivelist.list((error, drives) => {
      if (error) {
        console.error('Error reading drive list: ', error);
        deferred.reject(error);
      }
      let usbFound = false;
      _.map(drives, d => {
        if (d.isUSB) {
          const fileName = process.env.REACT_APP_USB_FILENAME;
          const filePath = path.join(d.mountpoints[0].path.toString(), fileName);

          var content = fs.readFileSync(filePath, 'utf-8');

          usbFound = true;
          deferred.resolve(content.toString());
        }
      });

      if (!usbFound) {
        deferred.reject({ message: 'No USB Found' });
      }

    })
  } catch (e) {
    console.log(e);
    deferred.reject(e);
  }
  return deferred.promise;
}


export const writeToUSB = (data) => {
  // const fileName = constants.transactionFileJson;

  //Write file to USB.

}
