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
  try {

    drivelist.list((error, drives) => {
      if (error) {
        console.error('Error reading drive list: ', error);
        deferred.reject(error);
      }
      let usbFound = false;
      console.log('drives found: ', drives);
      _.map(drives, d => {
        console.log('JSON drive: ', JSON.stringify(d));
        console.log('checking drive: ', d);
        console.log('drive isUSB: ', d.isUSB);
        console.log('drive isRemovable: ', d.isRemovable);
        console.log('drive device: ', d.device);
        console.log('drive mountpoint: ', d.mountpoints[0]);
        console.log('drive busType: ', d.busType);
        console.log('drive blockSize: ', d.blockSize);
        console.log('drive description: ', d.description);
        console.log('drive isSystem: ', d.isSystem);
        if (d.isUSB || !d.isSystem) {
          console.log('Found a drive that is either a USB or marked as non-system');
          usbFound = true;
          const mountPath = d.mountpoints[0].path.toString();
          console.log('mountpath = ', mountPath);
          const infoFile = process.env.REACT_APP_TX_FILENAME;
          const infoFilePath = path.join(mountPath, infoFile);

          const txInfo = fs.readFileSync(infoFilePath, 'utf-8');
          const txData = JSON.parse(txInfo.toString());

          const dataFile = process.env.REACT_APP_SIGNED_FILENAME;
          const dataFilePath = path.join(mountPath, dataFile);

          var data = fs.readFileSync(dataFilePath, 'utf-8');

          const signedTxPayload = {
            ...txData,
            payload: data.toString()
          };

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
