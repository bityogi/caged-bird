import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FontIcon from 'material-ui/FontIcon';

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



class ETH extends Component {

    render() {
        const { decodedTx } = this.props;
        console.log('decodedTX: ', decodedTx);
        console.log('decodedTX value: ', decodedTx.value.toString());
        return(
            <List>
                <ListItem
                    primaryText="To"
                    secondaryText={decodedTx.to}
                    innerDivStyle={styles.listItems}
                    leftIcon={<ActionInfo style={styles.icon} color={primary1Color} />}
                />
                
                <ListItem
                    primaryText="r"
                    secondaryText={decodedTx.r}
                    innerDivStyle={styles.listItems}
                    leftIcon={<FontIcon className="material-icons" style={styles.icon}>person_pin</FontIcon>}
                />

                <ListItem
                    primaryText="s"
                    secondaryText={decodedTx.s}
                    innerDivStyle={styles.listItems}
                    leftIcon={<FontIcon className="material-icons" style={styles.icon}>album</FontIcon>}
                />

                <ListItem
                    primaryText="v"
                    secondaryText={decodedTx.v}
                    innerDivStyle={styles.listItems}
                    leftIcon={<FontIcon className="material-icons" style={styles.icon}>account_balance</FontIcon>}
                />


            </List>
        )
    }
}

export default ETH;