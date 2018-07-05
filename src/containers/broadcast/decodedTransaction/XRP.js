import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import ReactJson from 'react-json-view';

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

class XRP extends Component {
    render() {
        const { decodedTx } = this.props;
        console.log('decodedTX (XRP): ', decodedTx);
        
        return(
            <div>
                 <List>
                    <ListItem
                        primaryText="Destination"
                        secondaryText={decodedTx.Destination}
                        innerDivStyle={styles.listItems}
                        leftIcon={<ActionInfo style={styles.icon} color={primary1Color} />}
                    />
                    
                    <ListItem
                        primaryText="Amount"
                        secondaryText={decodedTx.Amount}
                        innerDivStyle={styles.listItems}
                        leftIcon={<FontIcon className="material-icons" style={styles.icon}>person_pin</FontIcon>}
                    />

                    <ListItem
                        primaryText="Account"
                        secondaryText={decodedTx.Account}
                        innerDivStyle={styles.listItems}
                        leftIcon={<FontIcon className="material-icons" style={styles.icon}>album</FontIcon>}
                    />

                    <ListItem
                        primaryText="Fee"
                        secondaryText={decodedTx.Fee}
                        innerDivStyle={styles.listItems}
                        leftIcon={<FontIcon className="material-icons" style={styles.icon}>account_balance</FontIcon>}
                    />
                </List>
                <Divider />
                <div>
                    <ReactJson src={decodedTx} />
                </div>
            </div>
           
        )
    }
}

export default XRP;