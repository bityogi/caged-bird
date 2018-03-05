import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import EjectAction from 'material-ui/svg-icons/action/eject';

const style = {
  margin: 12,
};

class Landing extends Component {

  render() {
    return (
      <Card>
        <CardHeader
          title="Welcome to Caged-Bird"
          subtitle="A DACC Application"
        />

        <CardActions>
          <RaisedButton label="Create Unsigned Transaction" style={style} primary={true} />
          <RaisedButton label="Broadcast Signed Transaction" style={style} secondary={true} />
          <RaisedButton label="Log Out" style={style} icon={<EjectAction />} />
        </CardActions>

      </Card>
    )

  }
}

export default Landing;
