import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

export default ({ detail }) => {
  return (
    <List>
      <ListItem
        primaryText="Transaction ID"
        secondaryText={detail.data.id}
        leftIcon={<ActionInfo />}
      />
      <ListItem
        primaryText="Client"
        secondaryText={detail.data.client}
        leftIcon={<ActionInfo />}
      />
      <ListItem
        primaryText="Coin"
        secondaryText={detail.data.coin}
        leftIcon={<ActionInfo />}
      />
      <ListItem
        primaryText="Account"
        secondaryText={detail.data.account}
        leftIcon={<ActionInfo />}
      />
      <ListItem
        primaryText="Cold Wallet"
        secondaryText={detail.data.coldWallet}
        leftIcon={<ActionInfo />}
      />
      <ListItem
        primaryText="Hot Wallet"
        secondaryText={detail.data.hotWallet}
        leftIcon={<ActionInfo />}
      />
      <ListItem
        primaryText="Amount"
        secondaryText={detail.data.amount}
        leftIcon={<ActionInfo />}
      />
      <ListItem
        primaryText="Fee"
        secondaryText={detail.data.fee}
        leftIcon={<ActionInfo />}
      />
      <ListItem
        primaryText="Memo"
        secondaryText={detail.data.memo}
        leftIcon={<ActionInfo />}
      />
      <ListItem
        primaryText="Gen Time"
        secondaryText={detail.data.genTime}
        leftIcon={<ActionInfo />}
      />
    </List>
  )
}
