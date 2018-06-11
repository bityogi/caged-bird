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
            let network;
            if (this.network === 'test') {
                network = bitcoin.networks.testnet;
            } else {
                network = bitcoin.networks.bitcoin;
            }
            
            console.log('network = ', network);
                
            const tx = bitcoin.Transaction.fromHex(hex, network);
            console.log('decoded tx: ', tx);
            deferred.resolve(tx);
        } catch (error) {
            console.error('Error decoding tx: ', error);
            deferred.reject({ message: 'Error decoding transaction', error: error });
        } finally {
            return deferred.promise;
        }
        

    }
}