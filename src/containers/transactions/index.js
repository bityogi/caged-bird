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

import { pendingTransactions } from 'actions';

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


  componentWillMount() {
    this.props.pendingTransactions();
  }

  handleRowSelection(index) {
    const selected = this.props.transactions[index];

    console.log('selected transaction: ', selected);
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
        console.log('binding transaction : ', t);
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
      </Paper>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  pendingTransactions
}, dispatch)

const mapStateToProps = (state) => ({
  transactions: state.transactions
})


export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
