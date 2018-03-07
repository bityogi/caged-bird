import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import TransactionDetail from 'components/transactionDetail';
import {
  signedTransaction,
  broadcastTransaction,
} from 'actions';

import {
  RETRIEVING,
  RETRIEVED,
  SUBMITTED,
  SAVED
} from 'util/broadcastStatus';

class Broadcast extends Component {

  state = {
    requested: false,
  }

  handleTransactionBroadcast() {

  }

  handleCancelBroadcast() {
    this.setState({ requested: false })
  }

  getSignedTransaction() {
    console.log('Get Signed Transaction from USB');
    this.props.signedTransaction();
    this.setState({ requested: true })
  }

  renderSignedTransaction() {
    const { signed } = this.props;
    switch (signed.status) {
      case RETRIEVING:
        return (
          <span>Retrieving signed transaction ...</span>
        )

      case RETRIEVED:
        return (
          <Card>
            <TransactionDetail detail={signed.broadcast} />
            <CardActions>
              <FlatButton
                label="broadcast"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleTransactionBroadcast.bind(this)}
              />,
              <FlatButton
                label="Cancel"
                onClick={this.handleCancelBroadcast.bind(this)}
              />,
            </CardActions>
          </Card>

        )
      default:

    }
  }

  render() {
    const actionStyles = {
      prompt: {
        margin: 5,
        padding: 5,
        display: this.state.requested ? 'none' : 'inline-block',
      },
      okButton: {
        marginLeft: 5,
      },
      signed: {
        display: this.state.requested ? 'block' : 'none',
        margin: 5,
        padding: 5,

      }
    };

    const { status } = this.props.signed;
    return (
      <Card>


        <CardTitle title={'Broadcast Signed Transaction'} />

        <div style={actionStyles.prompt}>
          Insert USB then click
          <span>
            <RaisedButton
              label="OK"
              style={actionStyles.okButton}
              primary={true}
              onClick={() => this.getSignedTransaction()}
            />
          </span>
        </div>

        <div style={actionStyles.signed}>
          {this.renderSignedTransaction()}
        </div>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signedTransaction,
  broadcastTransaction,
}, dispatch)

const mapStateToProps = (state) => ({
  signed: state.signed,
})


export default connect(mapStateToProps, mapDispatchToProps)(Broadcast);
