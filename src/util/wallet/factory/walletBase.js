

export default class Wallet {
    constructor(coin, network = 'test') {
        this._coin = coin;
        this._network = network;
    }

    get coin() {
        return this._coin;
    }

    set coin(value) {
        this._coin = value;
    }

    get network() {
        return this._network;
    }

    set network(value) {
        this._network = value;
    }

    decodeTransaction(hex) {
        console.log('Decode transaction base class.');
    }
}