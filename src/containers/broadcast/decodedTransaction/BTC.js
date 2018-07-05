import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import bitcoin from 'bitcoinjs-lib';
import _ from 'lodash';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';

import theme from 'theme';

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

    renderDestinationAddress(tx) {

        const addresses = _.map(tx.outs, (out, index) => {
            const pubKey = Buffer.from(out.script, 3, 20);
            const address = bitcoin.address.fromOutputScript(pubKey);
            console.log('btc to address: ', address);
            return (
                <ListItem
                    key={index}
                    primaryText={`To :${address}`}
                    secondaryText={out.value}
                    innerDivStyle={styles.listItems}
                    leftIcon={<ActionInfo style={styles.icon} color={primary1Color} />}
                />
            )
            
        })

        console.log('address items: ', addresses);
        return addresses;
    }

    render() {
        const { decodedTx } = this.props;
        console.log('decodedTX (BTC) : ', decodedTx);
        
        return(
            <div>
                <div>
                    <List>
                        {this.renderDestinationAddress(decodedTx)}
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