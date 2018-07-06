import Q from 'q';
import _ from 'lodash';
import path from 'path';

const electron = window.require('electron');
const remote = electron.remote;
const fs = remote.require('fs');
const drivelist = remote.require('drivelist');


export const getUSBData = () => {
  var deferred = Q.defer();
  console.log('getUSBData start');
  const infoFile = process.env.REACT_APP_TX_FILENAME;
  const dataFile = process.env.REACT_APP_SIGNED_FILENAME;
  const unsignedInfoFile = process.env.REACT_APP_UNSIGNED_FILENAME;

  try {

    drivelist.list((error, drives) => {
      if (error) {
        console.error('Error reading drive list: ', error);
        deferred.reject(error);
      }
      let usbFound = false;
      console.log('drives found: ', drives);
      let errors = [];
      let results = [];
      let driveNumber = 0;
      _.map(drives, d => {
        if (d.isUSB || !d.isSystem) {
          driveNumber++;
          let mountPath;
          let txData;
          let signedTxPayload;

          try {
            console.log('JSON USB (non-system) drive: ', JSON.stringify(d));

            usbFound = true;
            console.log('mountPoints = ', d.mountpoints);
            console.log('1st mountPoint = ', d.mountpoints[0].path);
            mountPath = d.mountpoints[0].path.toString();
            console.log('mountpath = ', mountPath);


          } catch (e) {
            errors.push({ driveNumber, message: 'Error getting mount path for USB drive', error: e });
            // deferred.reject(`Error getting mount path for USB drive`);
          }
          try {
            const infoFilePath = path.join(mountPath, infoFile);
            const txInfo = fs.readFileSync(infoFilePath, 'utf-8');
            txData = JSON.parse(txInfo.toString());
          } catch (e) {
            errors.push({ driveNumber, message: `Error reading transaction information file | InfoFile: ${infoFile}`, error: e });
            // deferred.reject();
          }
          try {
            const dataFilePath = path.join(mountPath, dataFile);

            var data = fs.readFileSync(dataFilePath, 'utf-8');

            signedTxPayload = {
              ...txData,
              payload: data.toString()
            };
           
          } catch (e) {
            errors.push({ driveNumber, message: `Error reading transaction data (hex) file | DataFile: ${dataFile}.`, error: e });
            // deferred.reject();
          }
          try {
            const unsignedInfoFilePath = path.join(mountPath, unsignedInfoFile);
            const unsignedInfo = fs.readFileSync(unsignedInfoFilePath, 'utf-8');
            signedTxPayload = {
              ...signedTxPayload,
              unsignedInfo: JSON.parse(unsignedInfo)
            }
            results.push({ payload: signedTxPayload });

          } catch (e) {
            errors.push({ driveNumber, message: `Error reading unsigned tx data file | DataFile: ${unsignedInfoFile}.`, error: e });
          }

          // deferred.resolve(signedTxPayload);


        }
      });

      if (!usbFound) {
        deferred.reject('No USB Found');
      } else if (results.length > 0 ) {
        deferred.resolve(results[0].payload);
      } else if (errors.length > 0) {
        deferred.reject(errors);
      }
    })
  } catch (e) {
    console.log(e);
    deferred.reject(e);
  }
  return deferred.promise;
}


export const writeToUSB = (data) => {
  var deferred = Q.defer();

  console.log('writing data to USB: ', data);
  try {
    drivelist.list((error, drives) => {
      if (error) {
        console.error('Error reading drive list: ', error);
        deferred.reject(error);
      }
      let usbFound = false;
      _.map(drives, d => {
        if (d.isUSB || !d.isSystem) {
          usbFound = true;
          const mountPath = d.mountpoints[0].path.toString();
          const fileName = process.env.REACT_APP_UNSIGNED_FILENAME;
          const filePath = path.join(mountPath, fileName);

          fs.writeFileSync(filePath, JSON.stringify(data));
          deferred.resolve();
        }
      });
      if (!usbFound) {
        deferred.reject('No USB Found');
      }
    });
  } catch (e) {
    console.log(e);
    deferred.reject(e);
  }

  return deferred.promise;
}

export const writeInfoToUSB = (data) => {
  var deferred = Q.defer();

  console.log('writing Info data to USB: ', data);
  try {
    drivelist.list((error, drives) => {
      if (error) {
        console.error('Error reading drive list: ', error);
        deferred.reject(error);
      }
      let usbFound = false;
      _.map(drives, d => {
        if (d.isUSB || !d.isSystem) {
          usbFound = true;
          const mountPath = d.mountpoints[0].path.toString();
          const fileName = process.env.REACT_APP_TX_FILENAME;
          const filePath = path.join(mountPath, fileName);

          fs.writeFileSync(filePath, JSON.stringify(data));
          deferred.resolve();
        }
      });
      if (!usbFound) {
        deferred.reject('No USB Found');
      }
    });
  } catch (e) {
    console.log(e);
    deferred.reject(e);
  }

  return deferred.promise;
}

//getUSBMountPath: helper method used by usb.js methods to get the mounted path of the first USB (or non-system) it detects.
const getUSBMountPath = () => {
  let deferred = Q.defer();

  try {
    drivelist.list((error, drives) => {
      if (error) {
        console.error('Error reading drive list: ', error);
        deferred.reject(error);
      }
      let usbFound = false;
      console.log('drives found: ', drives);
      let errors = [];
      let results = [];

      _.map(drives, d => {
        if (d.isUSB || !d.isSystem) {
          let mountPath;

          try {
            console.log('JSON USB/Non-System drive: ', JSON.stringify(d));

            usbFound = true;
            console.log('mountPoints = ', d.mountpoints);
            console.log('1st mountPoint = ', d.mountpoints[0].path);
            mountPath = d.mountpoints[0].path.toString();
            console.log('mountpath = ', mountPath);
            results.push({ mountPath });
          } catch (e) {
            errors.push({ message: 'Error getting mount path for USB drive', error: e });
          }

        }
      });

      if (!usbFound) {
        deferred.reject('No USB Found');
      } else if (results.length > 0 ) {
        deferred.resolve(results[0]);
      } else if (errors.length > 0) {
        deferred.reject(errors);
      }
    })
  } catch (e) {
    console.error('Error reading drrive list: ', e);
    deferred.reject(e);
  } finally {
    return deferred.promise;
  }

}