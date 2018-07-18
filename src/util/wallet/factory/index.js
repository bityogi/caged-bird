import ETH from './ETH';
import UTXO from './UTXO';
import XRP from './XRP';

export default class WalletFactory {

    static getWallet(coin, network) {
        switch(coin) {
            case 'ETH':
            case 'ETC':
                return new ETH(coin, network);
            
            case 'XRP':
                return new XRP(coin, network);

            case 'BTC':
                return new UTXO(coin, network);

            default:
                return new UTXO(coin, network);

        }
    }
}