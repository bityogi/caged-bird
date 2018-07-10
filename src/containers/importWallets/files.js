import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

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

        const { input : { onChange } } = this.props;
        onChange(e.target.files);
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
                    
                />
            </RaisedButton>
            
        )
        
    }
}

export default WalletFiles;