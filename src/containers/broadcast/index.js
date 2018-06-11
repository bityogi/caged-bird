import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardActions } from 'material-ui/Card';
import { CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import LinearProgress from 'material-ui/LinearProgress';
import _ from 'lodash';

import TransactionDetail from 'components/transactionDetail';
import DecodedTransaction from './decodedTransaction';

import {
  signedTransaction,
  broadcastTransaction,
} from 'actions';

import {
  RETRIEVING,
  RETRIEVED,
  RETRIEVE_ERROR,
  SUBMITTING,
  SUBMITTED,
  SUBMIT_ERROR,
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
  },
  error: {
    color: '#FF0000'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  component: {
    flex: 1,
    margin: 3,
  } 
}
class Broadcast extends Component {

  state = {
    requested: false,
    usbTries: 0,
    broadcastTries: 0,
  }

  handleReadUSBRetry() {
    const { usbTries } = this.state;
    console.log('retrying again! tries:  ', usbTries);
    this.setState({ requested: false, usbTries: usbTries + 1 });
  }

  handleBroadcastRetry() {
    const { broadcastTries } = this.state;
    console.log('retrying again! tries:  ', broadcastTries);
    this.setState({ requested: false, broadcastTries: broadcastTries + 1 });
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

  renderErrorDetails() {
    const { signed } = this.props;

    if (signed.error) {
      if (signed.error.constructor === Array) {
        return _.map(signed.error, (e, i) => {
          return <div key={i}>{`Drive: ${e.driveNumber}. Message: ${e.message}`}</div>;
        })

      } else {
        return <div>{signed.error}</div>;
      }
    }
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
      case RETRIEVE_ERROR:
        return (
          <div>
            <span style={styles.error}>Error while retrieving data from USB.</span>
            <br />
            <div style={styles.error}>
              Error details: { this.renderErrorDetails() }
            </div>
            <div>
              Ensure USB is connected and the file exists:
              <span>
                <RaisedButton
                  label="Try Again"
                  primary={true}
                  onClick={this.handleReadUSBRetry.bind(this)}
                />
              </span>
            </div>
          </div>
        )
      case RETRIEVED:
        return (
          <div style={styles.container}>
            <Card style={styles.component}>
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
            <Card style={styles.component}>
              <CardTitle title={'Decoded Transaction'} />
              <DecodedTransaction detail={signed.broadcast} />
            </Card>
          </div>
          

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

        case SUBMIT_ERROR:
          return (
            <div>
              <span style={styles.error}>Error while broadcasting transaction.</span>
              <div>
                This was a bluebird API error:
                <span>
                  <RaisedButton
                    label="Try Again"
                    primary={true}
                    onClick={this.handleBroadcastRetry.bind(this)}
                  />
                </span>
              </div>
            </div>
          )
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

    // const { status } = this.props.signed;
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
