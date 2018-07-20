import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { TextField } from 'redux-form-material-ui';
import { CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import styles from 'styles';
import theme from 'theme';

const { palette: { primary1Color } } = theme;

const loginFormStyles = {
  container: {
    display: 'flex'
  },
  userControls: {
    margin: 10,
    flex: 1,
    borderStyle: 'solid',
    borderWidth: '1px 1px 3px 1px',
    padding: 10,
    borderColor: primary1Color,
    borderRadius: '5px',
  }
}

const validate = values => {
  const errors = {}

  //values.username1='bboper'; //'Operator1';
  //values.username2='bboper2'; //'Operator3';
  //values.password1=values.password2='BluebirdBitcoin';

  if (!values.username1) {
    errors.username1 = 'Required';
  }

  if (!values.password1) {
    errors.password1 = 'Required';
  } else if (values.password1.length < 15) {
    errors.password1 = 'Should be atleast 15 characters';
  }

  if (!values.username2) {
    errors.username2 = 'Required';
  }

  if (!values.password2) {
    errors.password2 = 'Required';
  } else if (values.password2.length < 15) {
    errors.password2 = 'Should be atleast 15 characters';
  }

  if (values.username1 && values.username2) {
    if (values.username1 === values.username2) {
      errors.username2 = 'Same username credentials provided';
    }
  }
  return errors;
}


class LoginUser extends Component {

  render() {
    const { handleSubmit, onSubmit, pristine, submitting  } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={styles.formStyle}>
          <div style={loginFormStyles.container}>
            <div style={loginFormStyles.userControls}>
              <div>
                <label>Operator 1</label>
              </div>

                <div>
                  <Field
                    name="username1"
                    component={TextField}
                    floatingLabelText="Operator 1"
                    id="username1"
                  />
                </div>

                <div>
                  <Field
                    name="password1"
                    component={TextField}
                    floatingLabelText="Password"
                    type="password"
                    id="password1"
                  />
                </div>

            </div>

            <div style={loginFormStyles.userControls}>
              <div>
                <label>Operator 2</label>
              </div>

                <div>
                  <Field
                    name="username2"
                    component={TextField}
                    floatingLabelText="Operator 2"
                    id="username2"
                  />
                </div>

                <div>
                  <Field
                    name="password2"
                    component={TextField}
                    floatingLabelText="Password"
                    type="password"
                    id="password2"
                   />
                </div>
            </div>

          </div>


          <CardActions>
              <RaisedButton
                  type="submit"
                  primary
                  disabled={pristine || submitting}
                  icon={
                      submitting && (
                          <CircularProgress
                              size={25}
                              thickness={2}
                          />
                      )
                  }
                  label={'Sign In'}
                  fullWidth
              />

          </CardActions>

        </div>
      </form>
    );
  }
}

LoginUser = reduxForm({
  form: 'loginForm',
  validate,
  warn: () => {}
})(LoginUser);

export default LoginUser;
