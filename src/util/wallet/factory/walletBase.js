

export default class Wallet {
    constructor(coin) {
        this._coin = coin;
    }

    get coin() {
        return this._coin;
    }

    set coin(value) {
        this._coin = value;
    }

    decodeTransaction(hex) {
        console.log('Decode transaction base class.');
    }
}