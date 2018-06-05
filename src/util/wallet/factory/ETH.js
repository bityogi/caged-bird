const electron = window.require('electron');
const remote = electron.remote;
const txDecoder = remote.require('ethereum-tx-decoder');

import Wallet from './walletBase';

export default class ETH extends Wallet {
    
    decodeTransaction(hex) {
        let deferred = Q.defer();
        
        try {
            const tx = txDecoder.decodeTx(hex);
            deferred.resolve(tx);
        } catch (error) {
            deferred.reject({ message: 'Error decoding transaction', error: error });
        } finally {
            return deferred.promise;
        }
    }
}