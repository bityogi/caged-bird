import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';
import CircularProgress from 'material-ui/CircularProgress';
import withWidth from 'material-ui/utils/withWidth';

import { Header, Notification, Alert } from 'components';
import Routes from './routes';
import theme from './theme';


import './App.css';

const styles = {
  wrapper: {
        // Avoid IE bug with Flexbox, see #467
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    body: {
        backgroundColor: '#edecec',
        display: 'flex',
        flex: 1,
        overflowY: 'hidden',
    },
    content: {
        flex: 1,
        paddingTop: '1em',
        paddingLeft: '1em',
        paddingRight: '1em',
    },
    loader: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 16,
        zIndex: 1200,
    },
};

const prefixedStyles = {};

class App extends Component {

  render() {
    const {
      width,
      isLoading
    } = this.props;

    const muiTheme = getMuiTheme(theme);
    if (!prefixedStyles.main) {
      const prefix = autoprefixer(muiTheme);
      prefixedStyles.wrapper = prefix(styles.wrapper);
      prefixedStyles.main = prefix(styles.main);
      prefixedStyles.body = prefix(styles.body);
      prefixedStyles.bodySmall = prefix(styles.bodySmall);
      prefixedStyles.content = prefix(styles.content);
      prefixedStyles.contentSmall = prefix(styles.contentSmall);
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={prefixedStyles.wrapper}>
          <div style={prefixedStyles.main}>
            {width !== 1 && <Header />}

            <div
             className="body"
             style={
               width === 1 ? ( prefixedStyles.bodySmall) : (prefixedStyles.body)
             }
            >

              <div style={
                    width === 1 ? (prefixedStyles.contentSmall) : (prefixedStyles.content)
                  }
                >
                <Routes />


              </div>


            </div>

            <Alert />
            <Notification />
            {isLoading && (
               <CircularProgress
                   className="app-loader"
                   color="#fff"
                   size={width === 1 ? 20 : 30}
                   thickness={2}
                   style={styles.loader}
               />
           )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  users : state.users,
  isLoading: state.admin.loading > 0,
})

const enhance = compose(
  connect(mapStateToProps, null),
  withWidth()
);

export default withRouter(enhance(App));
