import React, { Component, PropTypes } from 'react';
import { AlertIOS, Platform } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import * as appActions from '../../../../reducers/app/actions';
import { connect } from 'react-redux';

class FingerprintPopup extends Component {
    componentDidMount() {
        FingerprintScanner
            .authenticate({
                description: 'Scan your fingerprint on the device scanner to continue'
            })
            .then(() => {
                this.props.handlePopupDismissed();
                AlertIOS.alert('Authenticated successfully');
                this.props.dispatch(appActions.passLogin());
            })
            .catch((error) => {
                this.props.handlePopupDismissed();
                AlertIOS.alert(error.message);
            });
    }

    render() {
        return false;
    }
}

FingerprintPopup.propTypes = {
    handlePopupDismissed: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isLoggedIn: state.app.root,
        loading: state.app.loading
    };
}

export default connect(mapStateToProps)(FingerprintPopup);
