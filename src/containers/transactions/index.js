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
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';


import {
  pendingTransactions,
  transactionDetail,
  transactionExecute
} from 'actions';
import {
  PENDING,
  CREATING,
  CREATED,
  CREATE_ERROR,
  SAVING,
  SAVED,
  SAVE_ERROR,
} from 'util/transactionStatus';

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

  handleTransactionExecution() {
    console.log('handle transaction signing');
    this.props.transactionExecute(this.state.selectedTransaction);
  }

  handleRowSelection(index) {
    const selected = this.props.transactions[index];

    console.log('selected transaction: ', selected);
    this.props.transactionDetail(selected.id);
    this.setState({ open: true, selectedTransaction: selected.id });

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
    const executionStatus = transaction.execution.status;
    const { detail } = transaction;

    const actionStyles = {
      executeButton: {
        display: executionStatus === PENDING ? 'inline-block' : 'none',
      },
      cancelButton: {

      },
      okButton: {
        display: executionStatus === SAVED ? 'inline-block' : 'none',
      }
    };

    const actions = [

      <FlatButton
        label="Execute"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleTransactionExecution.bind(this)}
        style={actionStyles.executeButton}
      />,
      <FlatButton
        label="Cancel"
        onClick={this.handleCloseTransactionDialog.bind(this)}
      />,
      <FlatButton
        label="OK"
        onClick={this.handleCloseTransactionDialog.bind(this)}
        style={actionStyles.okButton}
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
          detail.loading ?
            <CircularProgress />
            :
            executionStatus === PENDING ?

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
              :
              this.renderTransactionExecution()
        }

      </Dialog>
    )
  }

  renderTransactionExecution() {
    const { transaction } = this.props;
    const executionStatus = transaction.execution.status;

    return (
      <div>
        <span>Creating unsigned transaction and writing data</span>
        <br />
        <span>Status: {executionStatus}</span>
      </div>
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
  transactionDetail,
  transactionExecute
}, dispatch)

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  transaction: state.transaction,
})


export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
