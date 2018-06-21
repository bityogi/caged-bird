import React, { Component } from 'react';
import ReactJson from 'react-json-view';

class BTC extends Component {
    render() {
        const { decodedTx } = this.props;
        console.log('decodedTX (BTC) : ', decodedTx);
        
        return(
            <ReactJson src={decodedTx} />
        )
    }
}

export default BTC;