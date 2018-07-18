import Q from 'q';

import Wallet from './walletBase';



export default class UTXO extends Wallet {
    
    decodeTransaction(hex) {
        let deferred = Q.defer();
        console.log('decoding Unknown raw tx: ', hex);
        
        try {
            const rawInfo = {
                coin: this.coin,
                message: 'Unable to decode this type of coin transaction'
            };

            deferred.resolve(rawInfo);
        } catch (error) {
            console.error('Error decoding tx: ', error);
            deferred.reject({ message: 'Error decoding transaction', error: error });
        } finally {
            return deferred.promise;
        }
        

    }
}