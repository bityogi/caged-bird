import Q from 'q';

import Wallet from './walletBase';

const electron = window.require('electron');
const remote = electron.remote;
const bitcoin = remote.require('bitcoinjs-lib');
const Buffer = remote.require('safe-buffer').Buffer;

export default class UTXO extends Wallet {
    
    decodeTransaction(hex) {
        let deferred = Q.defer();
        console.log('decoding BTC raw tx: ', hex);
        
        try {
            let network;
            if (this.network === 'test') {
                console.log('it is a testnet');
                network = bitcoin.networks.testnet;
            } else {
                console.log('it is a mainnet');
                network = bitcoin.networks.bitcoin;
            }
            console.log('converting hex to buffer: ', hex);
            const buffer = Buffer.from(hex, 'hex');
            console.log('hex buffer: ', buffer);
            const tx = bitcoin.Transaction.fromHex(buffer, network);

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