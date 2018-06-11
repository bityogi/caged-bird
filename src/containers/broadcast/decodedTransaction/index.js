import React, { Component } from 'react';

import ETH from './ETH';
import XRP from './XRP';
import BTC from './BTC';

class DecodedTransaction extends Component {

    render() {
        const { detail } = this.props;
        const { decodedTx, ticker } = detail.data;
        console.log('broadcast detail: ', detail);
        switch(ticker) {
            case 'ETH':
            case 'ETC':
                return(
                    <ETH decodedTx={decodedTx} />
                );
            case 'XRP':
                return (
                    <XRP decodedTx={decodedTx} />
                );
            case 'BTC':
                return (
                    <BTC decodedTx={decodedTx} />
                );
            default:
                return (
                    <BTC decodedTx={decodedTx} />
                );
                    
        }
        
    }
}

export default DecodedTransaction;