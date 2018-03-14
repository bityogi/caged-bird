import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';

import theme from 'theme';
import LoginForm from './login';

import { login } from 'actions'

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        minWidth: 300,
    },
    avatar: {
        margin: '1em',
        textAlign: 'center ',
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        display: 'flex',
    },
};

function getColorsFromTheme(theme) {
    const { palette: { primary1Color, accent1Color } } = theme;
    return { primary1Color, accent1Color };
}

class LoginPage extends Component {

  handleLogin = (values) => {
    this.props.login(values);
  }

  render() {
    const { theme } = this.props;
    const muiTheme = getMuiTheme(theme);
    const { primary1Color, accent1Color } = getColorsFromTheme(muiTheme);

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ ...styles.main, backgroundColor: primary1Color }}>
          <Card style={styles.card}>
            <div style={styles.avatar}>
                <Avatar
                    backgroundColor={accent1Color}
                    icon={<LockIcon />}
                    size={60}
                />
            </div>
            <LoginForm onSubmit={this.handleLogin} />
          </Card>
        </div>
      </MuiThemeProvider>
    )
  }
}

LoginPage.propTypes = {
  users: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {
    theme: theme,
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(login(credentials))
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
