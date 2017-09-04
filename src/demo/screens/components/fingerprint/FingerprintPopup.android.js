import React, { Component, PropTypes } from 'react';
import { Alert, Image, Text, TouchableOpacity, View, ViewPropTypes, StyleSheet } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import * as appActions from '../../../../reducers/app/actions';
import { connect } from 'react-redux';

import ShakingText from './ShakingText';

class FingerprintPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: undefined
        };
    }

    componentDidMount() {
        FingerprintScanner
            .authenticate({
                onAttempt: this.handleAuthenticationAttempted
            })
            .then(() => {
                this.props.handlePopupDismissed();
                Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
                this.props.dispatch(appActions.passLogin());
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error.message
                });
                this.description.shake();
            });
    }

    componentWillUnmount() {
        FingerprintScanner.release();
    }

    handleAuthenticationAttempted = (error) => {
        this.setState({
            errorMessage: error.message
        });
        this.description.shake();
    };

    render() {
        const {errorMessage} = this.state;
        const {style, handlePopupDismissed} = this.props;

        return (
            <View style={ styles.container }>
              <View style={ [styles.contentContainer, style] }>
                <Image
                       style={ styles.logo }
                       source={ require('../../../../../img/finger_print.png') } />
                <Text style={ styles.heading }>
                  Fingerprint
                  { '\n' }Authentication
                </Text>
                <ShakingText
                             ref={ (instance) => {
                                       this.description = instance;
                                   } }
                             style={ errorMessage ? styles.descriptionError : styles.description }>
                  { errorMessage || 'Scan your fingerprint on the\ndevice scanner to continue' }
                </ShakingText>
                <TouchableOpacity
                                  style={ styles.buttonContainer }
                                  onPress={ handlePopupDismissed }>
                  <Text style={ styles.buttonText }>
                    BACK TO MAIN
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            );
    }
}

FingerprintPopup.propTypes = {
    style: ViewPropTypes.style,
    handlePopupDismissed: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isLoggedIn: state.app.root,
        loading: state.app.loading
    };
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -200,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    logo: {
        marginVertical: 45
    },
    heading: {
        textAlign: 'center',
        color: '#00a4de',
        fontSize: 21
    },
    description: {
        textAlign: 'center',
        color: '#a5a5a5',
        height: 65,
        fontSize: 18,
        marginVertical: 10,
        marginHorizontal: 20
    },
    descriptionError: {
        textAlign: 'center',
        color: '#ea3d13',
        height: 65,
        fontSize: 18,
        marginVertical: 10,
        marginHorizontal: 20
    },
    buttonContainer: {
        padding: 20
    },
    buttonText: {
        color: '#8fbc5a',
        fontSize: 15,
        fontWeight: 'bold'
    }
});
export default connect(mapStateToProps)(FingerprintPopup);
