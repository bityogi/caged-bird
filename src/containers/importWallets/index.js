import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardText, CardTitle } from 'material-ui';
import Divider from 'material-ui/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ImportForm from './form';

import {
    getSeed,
    importWallets
} from 'actions';

const styles = {
    seedInfo: {
        margin: 5,
        padding: 10,
    },
    importButton: {
        margin: 5,
    }
}

class ImportWallets extends Component {

    componentDidMount() {
        this.props.getSeed();
    }

    handleImportWallet(args) {
        console.log('Handling file imports: ', args);
    }
     
    render() {
        const { seed, wallets } = this.props.wallet;
        const validSeed = (seed.loading === false) && (seed.seed) ? true : false;
        return (
            <Card>
                <CardTitle title={'Import Cold Wallets'} />

                <CardText>
                    <div>
                
                        <div>Select one or more Cold Wallet files</div>
                        <br />
                        <Divider />
                        <br />
                        { validSeed && (
                            <Paper elevation={1} style={styles.seedInfo}>
                                <Typography variant="headline" component="h3">
                                    Seed
                                </Typography>
                                <Typography component="p">
                                    {seed.seed}
                                </Typography>
                            </Paper>
                        )}
                        
                        <ImportForm 
                            onSubmit={this.handleImportWallet.bind(this)}
                            wallets={wallets}
                        />
                        
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