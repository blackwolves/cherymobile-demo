import React, { Component, PropTypes } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, TouchableHighlight, Alert, AlertIOS, Platform, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { TextInputLayout } from 'rn-textinputlayout';
import styles from '../styles/LoginScreenStyle';
import * as appActions from '../../reducers/app/actions';
import Button from 'apsl-react-native-button';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FingerprintPopup from './components/fingerprint/FingerprintPopup';
import * as Constants from '../../lib/Constants';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// this is a traditional React component connected to the redux store
class LoginScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            username: 'herbert.zhao@sap.com',
            password: 'Herbertpwd123',
            errorMessage: undefined,
            popupShowed: false,
            isMock: true
        };
    }
    componentDidMount() {
        FingerprintScanner
            .isSensorAvailable()
            .catch(error => this.setState({
                errorMessage: error.message
            }));
    }

    handleFingerprintShowed = () => {
        this.setState({
            popupShowed: true
        });
    }

    handleFingerprintDismissed = () => {
        this.setState({
            popupShowed: false
        });
    }

    performLogin() {
        //alert(this.state.username+","+ this.state.password);
        this.props.dispatch(appActions.login(this.state.username, this.state.password));
    //this.props.logIn(this.state.username, this.state.password);
    }
    performMockLogin() {
        this.props.navigator.showModal({
            screen: 'demo.SCIScreen',
            title: '',
            passProps: {
                username: this.state.username,
                password: this.state.password,
                loginURL: Constants.SCP_HOST_URL,
                action: "login",
                loading: true
            }
        });
    }
    performMockLogout() {
        this.props.navigator.showModal({
            screen: 'demo.SCIScreen',
            title: '',
            animationType: 'none',
            passProps: {
                loginURL: Constants.SCPLOGOUT,
                action: "logout",
                loading: true
            }
        });
    }
    performMockWithoutLogin = () => {
        this.props.dispatch(appActions.changeLoginStatus('demo-after-login', 'success'));
    }
    performGetLoginUser() {
        this.props.dispatch(appActions.getLoginUser());
    }
    performBack() {
        this.props.dispatch(appActions.changeLoginStatus('start', 'initial'));
    }
    renderFingerprintPopup() {
        if (this.state.popupShowed) {
            return (<FingerprintPopup
                                      style={ styles.popup }
                                      handlePopupDismissed={ this.handleFingerprintDismissed } />);
        } else {
            return (<View />);
        }
    }
    renderButton() {
        //const {loading} = this.props;
        const loading = this.state.loading;
        if (this.state.isMock) {
            return ( <View style={ styles.alignCenter }>
                       <Button
                               isLoading={ loading }
                               style={ styles.buttonContainer }
                               textStyle={ styles.textStyle6 }
                               onPress={ this.performMockLogin.bind(this) }>
                         登录
                       </Button>
                       <Button
                               isLoading={ loading }
                               style={ styles.buttonContainer }
                               textStyle={ styles.textStyle6 }
                               onPress={ this.performMockLogout.bind(this) }>
                         注销账户
                       </Button>
                       <Button
                               isLoading={ loading }
                               style={ styles.buttonContainer }
                               textStyle={ styles.textStyle6 }
                               onPress={ this.performMockWithoutLogin.bind(this) }>
                         直接进入
                       </Button>
                       <Button
                               isLoading={ loading }
                               style={ styles.buttonContainer }
                               textStyle={ styles.textStyle6 }
                               onPress={ this.performGetLoginUser.bind(this) }>
                         Get User
                       </Button>
                       <Button
                               isLoading={ loading }
                               style={ styles.buttonContainer }
                               textStyle={ styles.textStyle6 }
                               onPress={ this.performBack.bind(this) }>
                         返回
                       </Button>
                     </View>);
        } else {
            return (<View style={ styles.alignCenter }>
                      <Button
                              isLoading={ loading }
                              isDisabled={ Boolean(!this.state.password) }
                              style={ styles.buttonContainer }
                              textStyle={ styles.textStyle6 }
                              onPress={ this.performLogin.bind(this) }>
                        登录
                      </Button>
                      <TouchableOpacity
                                        style={ styles.fingerprint }
                                        onPress={ this.handleFingerprintShowed.bind(this) }
                                        disabled={ Boolean(this.state.errorMessage) }>
                        <Image source={ require('../../../img/finger_print.png') } />
                      </TouchableOpacity>
                    </View>);
        }
    }

    render() {
        const {loading, loginStatus, errorMessage} = this.props;
        if (loginStatus === "error") {
            if (Platform.OS === 'android') {
                Alert.alert('登录失败', errorMessage,
                    [
                        {
                            text: '关闭',
                            onPress: () => this.props.dispatch(appActions.dismissErrorDialog())
                        }
                    ]);
            } else {
                AlertIOS.alert(
                    '登录失败',
                    errorMessage,
                    [
                        {
                            text: '关闭',
                            onPress: () => this.props.dispatch(appActions.dismissErrorDialog())
                        }
                    ]
                );
            }
        }

        return (
            <View style={ styles.loginView }>
              <Image
                     source={ require('../../../img/bg01.jpg') }
                     style={ styles.backgroundImage }>
                <View>
                  <Text style={ styles.text }>
                    Login
                  </Text>
                  <TextInputLayout
                                   style={ styles.inputLayout }
                                   checkValid={ t => EMAIL_REGEX.test(t) }>
                    <TextInput
                               style={ styles.textInput }
                               placeholder={ '用户名' }
                               onChangeText={ (username) => this.setState({
                                                  username
                                              }) }
                               value={ this.state.username } />
                  </TextInputLayout>
                  <TextInputLayout style={ styles.inputLayout }>
                    <TextInput
                               style={ styles.textInput }
                               placeholder={ '密码' }
                               secureTextEntry={ true }
                               onChangeText={ (password) => this.setState({
                                                  password
                                              }) }
                               value={ this.state.password }
                               ref="password" />
                  </TextInputLayout>
                </View>
                { this.renderButton() }
                <Text>
                  { this.state.loginMessage }
                </Text>
                <View style={ styles.alignCenter }>
                  { this.state.errorMessage && (
                    <Text style={ styles.errorMessage }>
                      { this.state.errorMessage }
                    </Text>
                    ) }
                  { this.renderFingerprintPopup() }
                </View>
              </Image>
            </View>
            );
    }
}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        isLoggedIn: state.app.root,
        loading: state.app.loading,
        errorMessage: state.app.errorMessage,
        loginStatus: state.app.loginStatus
    };
}

export default connect(mapStateToProps)(LoginScreen);
