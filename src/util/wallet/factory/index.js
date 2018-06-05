import ETH from './ETH';
import UTXO from './UTXO';
import XRP from './XRP';

export default class WalletFactory {

    static getWallet(coin) {
        switch(coin) {
            case 'ETH':
            case 'ETC':
                return new ETH(coin);
            
            case 'XRP':
                return new XRP(coin);

            case 'BTC':
                return new UTXO(coin);

            default:
                return new UTXO(coin);

        }
    }
}