import Q from 'q';

import Wallet from './walletBase';

const electron = window.require('electron');
const remote = electron.remote;
const txDecoder = remote.require('ethereum-tx-decoder');


export default class ETH extends Wallet {
    
    decodeTransaction(hex) {
        let deferred = Q.defer();
        
        try {
            const rawHex = `0x${hex}`; //Ensure that hex is prefixed with '0x'
            
            const tx = txDecoder.decodeTx(rawHex);
            deferred.resolve(tx);
        } catch (error) {
            console.error('Error decoding tx: ', error);
            deferred.reject({ message: 'Error decoding transaction', error: error });
        } finally {
            return deferred.promise;
        }
    }
}