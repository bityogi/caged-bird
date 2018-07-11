import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import _ from 'lodash';

import styles from 'styles';
import WalletFiles from './files';
import theme from 'theme';

const { palette: { primary1Color } } = theme;

const formStyles = {
    main: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        minHeight: '10vh',
        justifyContent: 'space-between'
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 2,
    },
    button: {
        width: '100%',
        color: '#fff'
    },
    icon: {
      color: primary1Color,
    },
    listItems : {
      paddingTop: 10,
      paddingLeft: 50,
      paddingBottom: 2,
    },
    error: {
      color: '#FF0000'
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

    renderWalletFiles(files) {
        return (
            _.map(files, (f, i) => {
                return (
                    <ListItem
                        key={i}
                        primaryText={f.name}
                        secondaryText={'csv file'}
                        innerDivStyle={formStyles.listItems}
                        leftIcon={<ActionInfo style={formStyles.icon} color={primary1Color} />}
                        />
                )
            })
        )
    }
    render() {
        const { handleSubmit, onSubmit, submitting, wallets  } = this.props;
        console.log('wallets: ', wallets);
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={styles.formStyle}>
                    <div style={formStyles.main}>
                        <div style={formStyles.leftContainer}>
                            <Field
                                name="addressFile"
                                type="file"
                                component={WalletFiles}
                                id="addressFile"
                            />
                        </div>
                        <div style={formStyles.rightContainer}>
                            {
                                wallets.length > 0 && (
                                    <List>
                                        {this.renderWalletFiles(wallets)}
                                    </List>
                                )
                            }
                        </div>
                    </div>
                    

                     <RaisedButton
                      type="submit"
                      primary={true}
                      disabled={wallets.length < 1}
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

const mapStateToProps = (state) => ({
    values: getFormValues('importForm')(state),
});
  

export default connect(mapStateToProps, null)(ImportForm);