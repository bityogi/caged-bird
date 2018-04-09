import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import { logout } from 'actions';
import theme from 'theme';
import logo from 'assets/images/LOGO_WHITE.png';
import cagedbirdTitle from 'assets/images/Artboard 3 copy 11.png';
import cagedbirdLogo from 'assets/images/Cagebird.png';

const { primary1Color, textColor } = theme.palette;

const styles = {
  title: {
    marginLeft: 25,
    cursor: 'pointer',
    color: textColor,
    fontSize: '1.8em',
  },
  titleImage: {
    marginRight: 50,
    marginTop: 3,
    marginBottom: 3,
  },
  logo: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 5,

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
    const { users, history } = this.props;
    if (_.isEmpty(users.data)) {
      //There is no token, navigate to '/'
      history.push('/');
    } else {
      //Token present, navigate to landing
      history.push('/landing');
    }

  }

  render() {
    const { users } = this.props;
    console.log('User: ', users);
    return (
      <div>
        <Toolbar style={styles.toolbar}>


          <ToolbarGroup firstChild={true} >
            <img src={cagedbirdLogo} height={50} width={60} style={styles.logo} alt={'Caged-Bird'} onClick={this.navigateHome.bind(this)}/>
            <img src={cagedbirdTitle} height={56} width={200} style={styles.titleImage} alt={'Caged-Bird'} onClick={this.navigateHome.bind(this)}/>
          </ToolbarGroup>


          <ToolbarGroup>
            <img src={logo} height={48} width={120} style={styles.logo} alt={'Caged-Bird'} />
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
