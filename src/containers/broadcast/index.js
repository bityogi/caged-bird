import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import {
  signedTransaction,
  broadcastTransaction,
} from 'actions';

class Broadcast extends Component {

  render() {
    return (
      <span>BroadCast Transaction</span>
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
