import Q from 'q';

import WalletFactory from './factory';

export const decodeTransaction = (coin, hex, isTestnet) => {
    let deferred = Q.defer();
    console.log('decoding tx for cointype: %s with hex: %s and isTest: %s', coin, hex, isTestnet);
    try {
        const network = isTestnet ? 'test' : 'main';
        const wallet = WalletFactory.getWallet(coin, network);
        console.log('Received wallet: ', wallet);

        wallet.decodeTransaction(hex)
            .then((tx) => {
                console.log('decoded tx: ', tx);
                deferred.resolve(tx);
            });
        
    } catch (error) {
        console.error('Error decoding tx: ', error);
        deferred.reject({ message: 'Error decoding transaction', error: error });
    } finally {
        return deferred.promise;
    }
}