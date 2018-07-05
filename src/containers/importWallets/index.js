import React from 'react';
import { connect } from 'react-redux';

const ImportWallets = () => {

    return (
        <div>
            <h4>Cold Wallet Import</h4>
            <div>Select one or more Cold Wallet files</div>
            <input
                id="file"
                multiple
                type="file"
                name="file"
            ></input>
        </div>
    )
}

const mapStateToProps = state => {
    console.log('currentState', state);
    return { importedWallets : state.importedWallets };
}

export default connect(mapStateToProps)(ImportWallets);