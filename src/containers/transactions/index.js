import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { CardTitle } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

import { pendingTransactions, transactionDetail } from 'actions';

const styles = {
  headerColumn: {
    textAlign: 'center',
    fontSize: '1.1em',
  },

  rowColumn: {
    textAlign: 'center',

  }
}
class Transactions extends Component {

  state = {
    open: false,
    selectedTransaction: null
  };

  componentWillMount() {
    this.props.pendingTransactions();
  }

  handleOpenTransactionDialog() {
    this.setState({ open: true });
  }

  handleCloseTransactionDialog() {
    console.log('closing transaction signing window');
    this.setState({ open: false });
  }

  handleTransactionSigning() {
    console.log('handle transaction signing');
  }

  handleRowSelection(index) {
    const selected = this.props.transactions[index];

    console.log('selected transaction: ', selected);
    this.props.transactionDetail(selected.id);
    this.setState({ open: true, selectedTransaction: selected.id })
    // this.handleOpenTransactionDialog();
  }

  renderTransactions() {
    const { transactions } = this.props;
    if (_.isEmpty(transactions)) {
      return (
        <TableRow key={0}>
          <TableRowColumn colspan="5">No Transactions to display</TableRowColumn>
         </TableRow>
      );
    } else {
      return _.map(transactions, (t, i) => {
        return (
          <TableRow
            hoverable={true}
            key={i}
            value={t}
            style={{ textAlign: 'center' }}
          >
            <TableRowColumn style={{ width: '30%', ...styles.rowColumn }}>{t.client}</TableRowColumn>
            <TableRowColumn style={{ width: '20%', ...styles.rowColumn }}>{t.coin}</TableRowColumn>
            <TableRowColumn style={{ width: '20%', ...styles.rowColumn }}>{t.account}</TableRowColumn>
            <TableRowColumn style={{ width: '10%', ...styles.rowColumn }}>{t.amount}</TableRowColumn>
            <TableRowColumn style={{ width: '20%', ...styles.rowColumn }}>{t.genTime}</TableRowColumn>
          </TableRow>
        )
      })
    }
  }

  renderTransactionDialog() {
    const { transaction } = this.props;
    const actions = [
      <FlatButton
        label="Execute"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleTransactionSigning.bind(this)}
      />,
      <FlatButton
        label="Cancel"
        onClick={this.handleCloseTransactionDialog.bind(this)}
      />
    ]

    return (
      <Dialog
        title="Create Unsigned Transaction"
        actions={actions}
        modal={true}
        open={this.state.open}
        onRequesetClose={this.handleCloseTransactionDialog.bind(this)}
      >
        {
          transaction.loading ?
            <CircularProgress />
            :
            <List>
              <ListItem
                primaryText="Transaction ID"
                secondaryText={transaction.data.id}
                leftIcon={<ActionInfo />}
              />
              <ListItem
                primaryText="Client"
                secondaryText={transaction.data.client}
                leftIcon={<ActionInfo />}
              />
              <ListItem
                primaryText="Coin"
                secondaryText={transaction.data.coin}
                leftIcon={<ActionInfo />}
              />
              <ListItem
                primaryText="Account"
                secondaryText={transaction.data.account}
                leftIcon={<ActionInfo />}
              />
              <ListItem
                primaryText="Cold Wallet"
                secondaryText={transaction.data.coldWallet}
                leftIcon={<ActionInfo />}
              />
              <ListItem
                primaryText="Hot Wallet"
                secondaryText={transaction.data.hotWallet}
                leftIcon={<ActionInfo />}
              />
              <ListItem
                primaryText="Amount"
                secondaryText={transaction.data.amount} 
                leftIcon={<ActionInfo />}
              />
              <ListItem
                primaryText="Fee"
                secondaryText={transaction.data.fee}
                leftIcon={<ActionInfo />}
              />
              <ListItem
                primaryText="Memo"
                secondaryText={transaction.data.memo}
                leftIcon={<ActionInfo />}
              />
              <ListItem
                primaryText="Gen Time"
                secondaryText={transaction.data.genTime}
                leftIcon={<ActionInfo />}
              />
            </List>
        }

      </Dialog>
    )
  }

  render() {

    return (
      <Paper>
        <CardTitle title={'Pending Transactions'} />
        <Table onRowSelection={this.handleRowSelection.bind(this)}>
          <TableHeader displaySelectAll={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{ ...styles.headerColumn, width: '30%' }}>Client</TableHeaderColumn>
              <TableHeaderColumn style={{ ...styles.headerColumn, width: '20%' }}>Coin</TableHeaderColumn>
              <TableHeaderColumn style={{ ...styles.headerColumn, width: '20%' }}>Account</TableHeaderColumn>
              <TableHeaderColumn style={{ ...styles.headerColumn, width: '10%' }}>Amount</TableHeaderColumn>
              <TableHeaderColumn style={{ ...styles.headerColumn, width: '20%' }}>Gen Time</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            style={{ textAlign: 'center' }}
            showRowHover={true}
          >
            {this.renderTransactions()}
          </TableBody>
        </Table>

        {this.renderTransactionDialog()}
      </Paper>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  pendingTransactions,
  transactionDetail
}, dispatch)

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  transaction: state.transaction,
})


export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
