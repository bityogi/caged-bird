import React, { Component } from 'react';
import { connect } from 'react-redux';
import { importWallets } from '../../actions/importWallets';

class ImportWallets extends Component {
    render() {
        return (
            <div>
                <h4>Cold Wallet Import</h4>
                <div>Select one or more Cold Wallet files</div>
                <input
                    id="file"
                    multiple
                    type="file"
                    name="file"
                    onChange={() => this.props.importWallets()}
                ></input>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('currentState', state);
    return { importedWallets: state.importedWallets };
}

export default connect(mapStateToProps, { importWallets })(ImportWallets);