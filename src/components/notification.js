import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import theme from 'theme';
import { hideNotification } from 'actions/notification';


class Notification extends Component {

  handleRequestClose = () => {
        this.props.hideNotification();
  };

  render() {
    const style = {
      height: 'auto',
      lineHeight: '20px',
      padding: 14,
      whiteSpace: 'pre-line'
    };
    const { primary1Color, accent1Color } = theme.palette;
    const { type, message } = this.props;
    if (type === 'warning') {
      style.backgroundColor = accent1Color;
    }
    if (type === 'confirm') {
      style.backgroundColor = primary1Color;
    }
    return (
      <Snackbar
        open={!!message}
        message={!!message && message}
        autoHideDuration={5000}
        bodyStyle={style}
        onRequestClose={this.handleRequestClose}

      />
    );
  }
}

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string.isRequired,
    hideNotification: PropTypes.func.isRequired,
};

Notification.defaultProps = {
    type: 'info',
};

const mapStateToProps = state => ({
    message: state.admin.notification.text,
    type: state.admin.notification.type,
});

const mapDispatchToProps = {
  hideNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
