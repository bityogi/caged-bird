import { decode } from 'ripple-binary-codec';
import Q from 'q';

import Wallet from './walletBase';

export default class XRP extends Wallet {
    
    decodeTransaction(hex) {
        let deferred = Q.defer();
        
        try {
            const rawHex = hex.substring(64);
            const tx = decode(rawHex);
            console.log('decoded ripple tx: ', tx);
            deferred.resolve(tx);
        } catch (error) {
            console.error('Error decoding tx: ', error);
            deferred.reject({ message: 'Error decoding transaction', error: error });
        } finally {
            return deferred.promise;
        }
    }
}