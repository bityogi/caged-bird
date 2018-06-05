import Q from 'q';

import WalletFactory from './factory';

export const decodeTransaction = (coin, hex) => {
    let deferred = Q.defer();

    try {
        const wallet = WalletFactory.getWallet(coin);
        const tx = wallet.decodeTransaction(hex);

        deferred.resolve(tx);
    } catch (error) {
        console.error('Error decoding tx: ', error);
        deferred.reject({ message: 'Error decoding transaction', error: error });
    } finally {
        return deferred.promise;
    }
}