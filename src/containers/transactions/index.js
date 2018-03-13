import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import {
  Table,
  TableBody,
  // TableFooter,
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
// import { List, ListItem } from 'material-ui/List';



import TransactionDetail from 'components/transactionDetail';
import {
  pendingTransactions,
  transactionDetail,
  transactionExecute,
  initializeTransaction
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
import { formatDate } from 'util/format';

const styles = {
  headerColumn: {
    textAlign: 'left',
    fontSize: '1.1em',
  },

  rowColumn: {
    // textAlign: 'center',

  }
}
class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedTransaction: null
    };

    this.handleCloseTransactionDialog = this.handleCloseTransactionDialog.bind(this);
  }


  componentDidMount() {
    this.props.pendingTransactions();
  }

  handleOpenTransactionDialog() {
    this.setState({ open: true });
  }

  handleCloseTransactionDialog(initialize) {
    console.log('closing transaction signing window');
    this.setState({ open: false, selectedTransaction: null });
    if (initialize) {
      this.props.initializeTransaction();
    }
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
          <TableRowColumn colSpan="5">No Transactions to display</TableRowColumn>
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
            <TableRowColumn style={{ width: '20%', ...styles.rowColumn }}>{t.client}</TableRowColumn>
            <TableRowColumn style={{ width: '20%', ...styles.rowColumn }}>{t.coinDescription}</TableRowColumn>
            <TableRowColumn style={{ width: '15%', ...styles.rowColumn }}>{t.account}</TableRowColumn>
            <TableRowColumn style={{ width: '25%', ...styles.rowColumn }}>{`${t.ticker} ${Number.parseFloat(t.amount).toFixed(8)}`}</TableRowColumn>
            <TableRowColumn style={{ width: '20%', ...styles.rowColumn }}>{formatDate(t.generatedOn)}</TableRowColumn>
          </TableRow>
        )
      })
    }
  }

  renderTransactionDialog() {


    const { transaction } = this.props;
    const executionStatus = transaction.execution.status;
    const { detail } = transaction;

    const okStatusOptions = [
      CREATING,
      CREATED,
      CREATE_ERROR,
      SAVING,
      SAVED,
      SAVE_ERROR,
    ]

    const actionStyles = {
      executeButton: {
        display: executionStatus === PENDING ? 'inline-block' : 'none',
      },
      cancelButton: {
        display: executionStatus === PENDING ? 'inline-block' : 'none',
      },
      okButton: {
        display: okStatusOptions.includes(executionStatus) ? 'inline-block' : 'none',
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
        onClick={() => this.handleCloseTransactionDialog(false)}
        style={actionStyles.cancelButton}
      />,
      <FlatButton
        label="OK"
        onClick={() => this.handleCloseTransactionDialog(true)}
        style={actionStyles.okButton}
        disabled={executionStatus !== SAVED}
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
              <TransactionDetail detail={detail} />
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
          <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ ...styles.headerColumn, width: '20%' }}>Client</TableHeaderColumn>
              <TableHeaderColumn style={{ ...styles.headerColumn, width: '20%' }}>Coin</TableHeaderColumn>
              <TableHeaderColumn style={{ ...styles.headerColumn, width: '15%' }}>Account</TableHeaderColumn>
              <TableHeaderColumn style={{ ...styles.headerColumn, width: '25%' }}>Amount</TableHeaderColumn>
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
  transactionExecute,
  initializeTransaction,
}, dispatch)

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  transaction: state.transaction,
})


export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
