import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import styles from 'styles';
import WalletFiles from './files';

const formStyles = {
    
    button: {
      width: '100%',
      color: '#fff'
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.addressFile || values.addressFile.length < 1) {
        errors.addressFile =  'No files selected';
    }

    return errors;
}

class ImportForm extends Component {
    render() {
        const { handleSubmit, onSubmit, pristine, submitting  } = this.props;

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={styles.formStyle}>
                    <div>
                        <Field
                            name="addressFile"
                            type="file"
                            component={WalletFiles}
                            id="addressFile"
                        />
                    </div>

                     <RaisedButton
                      type="submit"
                      primary={true}
                      disabled={pristine || submitting}
                      icon={
                          submitting && (
                              <CircularProgress
                                  size={25}
                                  thickness={2}
                              />
                          )
                      }
                      label={'Submit'}
                      labelColor={'#fff'}
                      style={formStyles.button}
                  />
                </div>
            </form>
        )
    }
}

ImportForm = reduxForm({
    form: 'importForm',
    validate,
    warn: () => {}
  })(ImportForm);



export default ImportForm;