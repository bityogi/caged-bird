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

  try {

    drivelist.list((error, drives) => {
      if (error) {
        console.error('Error reading drive list: ', error);
        deferred.reject(error);
      }
      let usbFound = false;
      console.log('drives found: ', drives);
      _.map(drives, d => {
        if (d.isUSB || !d.isSystem) {
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
            deferred.reject(`Error getting mount path for USB drive`);
          }
          try {
            const infoFilePath = path.join(mountPath, infoFile);
            const txInfo = fs.readFileSync(infoFilePath, 'utf-8');
            txData = JSON.parse(txInfo.toString());
          } catch (e) {
            deferred.reject(`Error reading transaction information file | InfoFile: ${infoFile}`);
          }
          try {
            const dataFilePath = path.join(mountPath, dataFile);

            var data = fs.readFileSync(dataFilePath, 'utf-8');

            signedTxPayload = {
              ...txData,
              payload: data.toString()
            };
          } catch (e) {
            deferred.reject(`Error reading transaction data (hex) file | DataFile: ${dataFile}.`);
          }




            deferred.resolve(signedTxPayload);


        }
      });

      if (!usbFound) {
        deferred.reject('No USB Found');
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
