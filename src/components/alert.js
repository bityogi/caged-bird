import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';

import { actions as alertActions } from 'util/alertActions';

class AlertDialog extends Component {
  state = {
    open: false
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.alert && !_.isEmpty(nextProps.alert.key)) {
        this.setState({ open: true })
      }
  }

  handleClose() {
    const { key } = this.props.alert;
    const handleAlert = alertActions[key];
    console.log('alertHandle: ', handleAlert);

    this.setState({ open: false });
    handleAlert();
  }

  render() {
    const { message } = this.props.alert;


    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
      {message}
      </Dialog>
    );

  }
}

const mapStateToProps = (state) => ({
  alert : state.admin.alert
})



export default connect(mapStateToProps, null)(AlertDialog);
