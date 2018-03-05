import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import FontIcon from 'material-ui/FontIcon';
import { withRouter } from 'react-router-dom';

import { logout } from 'actions';
import theme from 'theme';




const { primary1Color, textColor } = theme.palette;

const styles = {
  title: {
    cursor: 'pointer',
    color: textColor,
  },
  icon: {
    marginRight: 24,
  },
  toolbar: {
    backgroundColor: primary1Color,
  },
  separator: {
    margin: 20,
    width: "2px",
  }

};

class Header extends Component {

  navigateHome() {
    this.props.history.push('/');
  }

  render() {
    const { users } = this.props;
    console.log('User: ', users);
    return (
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup firstChild={true}>
            <FontIcon className="material-icons" style={styles.icon}>menu</FontIcon>
            <ToolbarTitle text="Caged Bird" style={styles.title} onClick={this.navigateHome.bind(this)} />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarSeparator style={styles.separator} />

          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users : state.users
})

const mapDispatchToProps = dispatch => bindActionCreators({
  logout
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
