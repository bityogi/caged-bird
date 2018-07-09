import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardText, CardTitle } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import {
    getSeed,
    importWallets
} from 'actions';

class ImportWallets extends Component {

     
    render() {
        const { seed } = this.props.wallet;
        console.log('seed: ', seed);
        return (
            <Card>
                <CardTitle title={'Import Cold Wallets'} />

                <CardText>
                    <div>
                
                        <div>Select one or more Cold Wallet files</div>
                        <br />
                      
                        <label htmlFor="wallet-upload">
                            <RaisedButton
                                containerElement='label'
                                label='Import'
                            >
                                <input type="file" style={{ display: 'none' }} />
                            </RaisedButton>
                          
                        </label>
                        
                        
                    </div>
                </CardText>
                
            </Card>
            
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getSeed,
    importWallets
  }, dispatch)
  
  const mapStateToProps = (state) => ({
    wallet: state.wallet,
  })
  



export default connect(mapStateToProps, mapDispatchToProps)(ImportWallets);