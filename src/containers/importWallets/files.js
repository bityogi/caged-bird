import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
// import { change as changeFieldValue } from 'redux-form';

import { 
    importWallets
} from 'actions';

const styles = {
    
    importButton: {
        marginBottom: 5,
    }
}

class WalletFiles extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        console.log('onChange called: ', e.target.files);

        //TODO: Get these values as part of props
        this.props.importWallets(e.target.files);
        // onChange(e.target.files);
    }

    render() {
        // const { input: { value } } = this.props;

        return (
            <RaisedButton 
                containerElement='label'
                label='Select Files'
                primary={true}
                style={styles.importButton}
            >
                <input 
                    type="file"
                    onChange={this.onChange}
                    multiple
                    style={{ display: 'none' }}
                    
                />
            </RaisedButton>
            
        )
        
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    importWallets
}, dispatch)
  

export default connect(null, mapDispatchToProps)(WalletFiles);