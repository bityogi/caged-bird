import Q from 'q';
import _ from 'lodash';
import path from 'path';

const { remote } = window.require('electron');
const fs = remote.require('fs');
const drivelist = remote.require('drivelist');


export const getUSBData = () => {
  var deferred = Q.defer();
  try {

    drivelist.list((error, drives) => {
      if (error) {
        console.error('Error reading drive list: ', error);
        deferred.reject(error);
      }
      let usbFound = false;
      _.map(drives, d => {
        if (d.isUSB) {
          usbFound = true;
          const mountPath = d.mountpoints[0].path.toString();
          const infoFile = process.env.REACT_APP_READ_TX_FILENAME;
          const infoFilePath = path.join(mountPath, infoFile);

          const txInfo = fs.readFileSync(infoFilePath, 'utf-8');
          const txData = JSON.parse(txInfo.toString());

          const dataFile = process.env.REACT_APP_READ_SIGNED_FILENAME;
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
        if (d.isUSB) {
          usbFound = true;
          const mountPath = d.mountpoints[0].path.toString();
          const fileName = process.env.REACT_APP_WRITE_FILENAME;
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
