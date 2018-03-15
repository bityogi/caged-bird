import React from 'react';
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
}

export default ({ detail }) => {
  const {
    coldWalletDesc,
    coldWalletFileName,
    coldWalletAddress,
    hotWalletDesc,
    hotWalletAddress
  } = detail.data;
  const coldWallet = `${coldWalletDesc} ${coldWalletFileName || coldWalletAddress}`;
  const hotWallet = `${hotWalletDesc} ${hotWalletAddress}`;

  return (
    <List>
      <ListItem
        primaryText="Transaction ID"
        secondaryText={detail.data.transactionId}
        innerDivStyle={styles.listItems}
        leftIcon={<ActionInfo style={styles.icon} color={primary1Color} />}
      />
      <ListItem
        primaryText="Client"
        secondaryText={detail.data.clientAccount}
        innerDivStyle={styles.listItems}
        leftIcon={<FontIcon className="material-icons" style={styles.icon}>person_pin</FontIcon>}
      />
      <ListItem
        primaryText="Coin"
        secondaryText={detail.data.coinDescription}
        innerDivStyle={styles.listItems}
        leftIcon={<FontIcon className="material-icons" style={styles.icon}>album</FontIcon>}
      />
      <ListItem
        primaryText="Account"
        secondaryText={detail.data.account}
        innerDivStyle={styles.listItems}
        leftIcon={<FontIcon className="material-icons" style={styles.icon}>account_balance</FontIcon>}
      />
      <ListItem
        primaryText="Cold Wallet"
        secondaryText={
          <p>
            {detail.data.coldWalletDesc}
            <br />
            {`${detail.data.coldWalletFileName || detail.data.coldWalletAddress}`}
          </p>
        }
        secondaryTextLines={2}
        innerDivStyle={styles.listItems}
        leftIcon={<FontIcon className="material-icons" style={styles.icon}>account_balance_wallet</FontIcon>}
      />
      <ListItem
        primaryText="Hot Wallet"
        secondaryText={
          <p>
            {detail.data.hotWalletDesc}
            <br />
            {`${detail.data.hotWalletAddress}`}
          </p>
        }
        secondaryTextLines={2}
        innerDivStyle={styles.listItems}
        leftIcon={<FontIcon className="material-icons" style={styles.icon}>camera_enhance</FontIcon>}
      />
      <ListItem
        primaryText="Amount"
        secondaryText={detail.data.amount}
        innerDivStyle={styles.listItems}
        leftIcon={<FontIcon className="material-icons" style={styles.icon}>monetization_on</FontIcon>}
      />
      <ListItem
        primaryText="Fee"
        secondaryText={detail.data.fee}
        innerDivStyle={styles.listItems}
        leftIcon={<FontIcon className="material-icons" style={styles.icon}>attach_money</FontIcon>}
      />
      <ListItem
        primaryText="Memo"
        secondaryText={detail.data.memo}
        innerDivStyle={styles.listItems}
        leftIcon={<FontIcon className="material-icons" style={styles.icon}>description</FontIcon>}
      />
      <ListItem
        primaryText="Gen Time"
        secondaryText={detail.data.generatedOn}
        innerDivStyle={styles.listItems}
        leftIcon={<FontIcon className="material-icons" style={styles.icon}>access_time</FontIcon>}
      />
    </List>
  )
}
