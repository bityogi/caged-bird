import Q from 'q';

const electron = window.require('electron');
const remote = electron.remote;
const bitcoin = remote.require('bitcoinjs-lib');

import Wallet from './walletBase';

export default class UTXO extends Wallet {
    
    decodeTransaction(hex) {
        let deferred = Q.defer();
        
        try {
            if (this.network === 'test') {
                bitcoin.networks.testnet;
            } else {
                bitcoin.networks.bitcoin;
            }
    
            const tx = bitcoin.Transaction.fromHex(hex);
            deferred.resolve(tx);
        } catch (error) {
            deferred.reject({ message: 'Error decoding transaction', error: error });
        } finally {
            return deferred.promise;
        }
        

    }
}