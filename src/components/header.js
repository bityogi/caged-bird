import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { withRouter } from 'react-router-dom';

import { logout } from 'actions';
import theme from 'theme';
import logo from 'assets/images/LOGO_WHITE.png';



const { primary1Color, textColor } = theme.palette;

const styles = {
  title: {
    marginLeft: 25,
    cursor: 'pointer',
    color: textColor,
    fontSize: '1.8em',
  },
  logo: {
    marginRight: 50,
    marginTop: 3,
    marginBottom: 3,

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


          <ToolbarGroup firstChild={true} >

            <ToolbarTitle text="Caged Bird" style={styles.title} onClick={this.navigateHome.bind(this)} />
            <ToolbarSeparator style={styles.separator} />
          </ToolbarGroup>


          <ToolbarGroup>
            <img src={logo} height={48} width={120} style={styles.logo} />
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
