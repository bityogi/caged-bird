import Q from 'q';

import Wallet from './walletBase';

const electron = window.require('electron');
const remote = electron.remote;
const bitcoin = remote.require('bitcoinjs-lib');

export default class UTXO extends Wallet {
    
    decodeTransaction(hex) {
        let deferred = Q.defer();
        console.log('decoding BTC raw tx: ', hex);
        try {
            // if (this.network === 'test') {
            //     bitcoin.networks.testnet;
            // } else {
            //     bitcoin.networks.bitcoin;
            // }
    
            const tx = bitcoin.Transaction.fromHex(hex);
            console.log('decoded tx: ', tx);
            deferred.resolve(tx);
        } catch (error) {
            deferred.reject({ message: 'Error decoding transaction', error: error });
        } finally {
            return deferred.promise;
        }
        

    }
}