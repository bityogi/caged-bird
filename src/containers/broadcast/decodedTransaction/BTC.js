import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import bitcoin from 'bitcoinjs-lib';
import _ from 'lodash';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';

import theme from 'theme';
import { scientificToDecimal } from 'util/format';

const { palette: { primary1Color } } = theme;

const styles = {
  icon: {
    color: primary1Color,
  },
  listItems : {
    paddingTop: 10,
    paddingLeft: 50,
    paddingBottom: 2,
  },
  error: {
    color: '#FF0000'
  }
}

class BTC extends Component {

    renderDestinationAddress(tx, metadata) {
        let network;
        if (metadata.testnet === true) {
            network = bitcoin.networks.testnet;
        } else {
            network = bitcoin.networks.mainnet
        }

        const addresses = _.map(tx.outs, (out, index) => {
            const pubKey = Buffer.from(out.script, 3, 20);
            const address = bitcoin.address.fromOutputScript(pubKey, network);
            const amount = scientificToDecimal(out.value / 100000000);
            console.log('amount: ', amount);
            console.log('amount cast to Number:', Number(amount));
            console.log('btc to address: ', address);
            return (
                <ListItem
                    key={index}
                    primaryText={`To :${address}`}
                    secondaryText={`${amount} BTC`}
                    innerDivStyle={styles.listItems}
                    leftIcon={<ActionInfo style={styles.icon} color={primary1Color} />}
                />
            )
            
        })

        console.log('address items: ', addresses);
        return addresses;
    }

    render() {
        const { decodedTx, metadata } = this.props;
        console.log('decodedTX (BTC) : ', decodedTx);
        console.log('metadata (BTC): ', metadata);
        return(
            <div>
                <div>
                    <List>
                        {this.renderDestinationAddress(decodedTx, metadata)}
                    </List>
                </div>
                <Divider />
                <div>
                    <ReactJson src={decodedTx} />
                </div>


            </div>
           
        )
    }
}

export default BTC;