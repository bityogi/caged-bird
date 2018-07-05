import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import EjectAction from 'material-ui/svg-icons/action/eject';
import { withRouter } from 'react-router-dom';

import { logout } from 'actions';

const style = {
  margin: 12,
};

class Landing extends Component {



  render() {
    const { logout, history } = this.props;

    return (
      <Card>
        <CardHeader
          title="Welcome to Caged-Bird"
          subtitle="A DACC Application"
        />

        <CardActions>
          <RaisedButton
            label="Create Unsigned Transaction"
            style={style}
            primary={true}
            onClick={() => history.push('/transactions')}
          />
          <RaisedButton
            label="Broadcast Signed Transaction"
            style={style}
            secondary={true}
            onClick={() => history.push('/broadcast')}
          />
          <RaisedButton
            label="Import Cold Wallets"
            style={style}
            secondary={true}
            onClick={() => history.push('/import')}
          />
          <RaisedButton
            label="Log Out"
            style={style}
            icon={<EjectAction />}
            onClick={() => logout()}
          />
        </CardActions>

      </Card>
    )

  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  logout
}, dispatch)

export default connect(null, mapDispatchToProps)(withRouter(Landing));
