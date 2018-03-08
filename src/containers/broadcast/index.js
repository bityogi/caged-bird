import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import LinearProgress from 'material-ui/LinearProgress';

import TransactionDetail from 'components/transactionDetail';
import {
  signedTransaction,
  broadcastTransaction,
} from 'actions';

import {
  RETRIEVING,
  RETRIEVED,
  SUBMITTING,
  SUBMITTED,
  SAVING,
  SAVED
} from 'util/broadcastStatus';

import theme from 'theme';

const { palette: { primary1Color} } = theme;

const styles = {
  iconStyles: {
    marginRight: 25,
    color: primary1Color,
  },
  progressBar: {
    marginTop: 25,
  }
}
class Broadcast extends Component {

  state = {
    requested: false,
  }

  handleTransactionBroadcast() {
    console.log('Broadcasting transaction');
    this.props.broadcastTransaction();
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
    const { signed, history } = this.props;
    switch (signed.status) {
      case RETRIEVING:
        return (
          <div>
            <FontIcon className="material-icons" style={styles.iconStyles}>usb</FontIcon>
            <span>Retrieving signed transaction ...</span>
            <div>
              <LinearProgress mode="indeterminate" style={styles.progressBar} />
            </div>
          </div>

        );

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

        );
       case SUBMITTING:
        return (
          <span>Submitting transaction for broadcast ...</span>
        );

       case SUBMITTED:
        return (
          <div>
            <div>Transaction successfully submitted for broadcast ..</div>

              <RaisedButton
                label="Home"
                primary={true}
                onClick={() => history.push('/')}
              />
          </div>
        );


      default:
        return null;
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

      },

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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Broadcast));
