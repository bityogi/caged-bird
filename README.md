# Caged-Bird
This project handles the caged-bird application for DACC

The application is built with the React Framework using CRA (create-react-app) and packaged into a desktop application using Electron.

---

### Installation (development)
```
npm install
```
---

### Tests
```
npm test
```
This application uses the Jest framework that is packaged with the CRA.

To update component snapshots:
```
npm test -- --u
```
---

### Running (in development)
```
npm start
```
The application will start as an electron app, but uses localhost:3000 port in a development server.

Production/Packaged app runs off the `/build` directory which is pacakaged under the `/dist` folder.

---
### Packaging the electron app
##### For Mac
```
npm run package-mac
```
##### For Linux
```
npm run package-linux
```
---

## Environment Variables

#### **REACT_APP_BLUEBIRD_API**
Bluebird API url

e.g: `http://bluebird:60541`

#### **REACT_APP_TX_FILENAME**
Name of file (can include any directory path) in the USB media

e.g: `DACC/tx_info.txt`

#### **REACT_APP_SIGNED_FILENAME**
Name of the file (can include any directory path) that the caged-bird app will try to retrieve FROM the USB media in order to broadcast the transaction using Bluebird.

e.g: `DACC/signed_tx.txt`

#### **REACT_APP_UNSIGNED_FILENAME**
Name of the file (can include any directory path) that the caged-bird app will try to write the unsigned-transaction TO the USB media.

e.g: `DACC/unsigned_tx.txt`

---------

Built with :heart: by [DACC](https://www.digitalassetcustody.com/)

&copy; All rights reserved.
