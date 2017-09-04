import React from 'react';
import { StyleSheet, View, Text, Dimensions, Button, WebView, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as appActions from '../../reducers/app/actions';
import CookieManager from 'react-native-cookies';
import * as Constants from '../../lib/Constants';
import _ from "lodash";

class SCIScreen extends React.Component {
    constructor(props) {
        super(props);
        this.isSubmit = true;
        this.state = {
            errorMessage: undefined,
            popupShowed: false,
            js: '',
            loginURL: "",
            loading: false,
            action: '',
            loginMessage: ""
        };
        this.errorCount = 0;
        this.isDispatch = false;
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this.onLoadEnd = this.onLoadEnd.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }
    componentDidMount() {
        //this.webview.postMessage(this.data);
    }

    onError() {
        /*this.setState({
            errorMessage: "The target login page is not available"
        });*/
        //alert("The target login page is not available");
        // this.setState({
        //     errmsg: 'Loading error...'
        // });
    }
    async onNavigationStateChange(navState) {
        const that = this;

        // Get cookies as a request header string
        if (this.props.action === "login" && !this.isDispatch) {
            CookieManager.get(Constants.SCP_HOST_URL)
                .then((res) => {
                    _.forEach(res, function(value, key) {
                        console.log(key);
                        if (key.indexOf("JTENANTSESSIONID") > -1) {
                            that.setState({
                                loginMessage: "Login Success"
                            });
                            if (Platform.OS === "android")
                                that.props.navigator.dismissModal();
                            that.props.dispatch(appActions.changeLoginStatus('demo-after-login', 'success'));
                            that.isDispatch = true;
                        }
                    });
                });
        } else if (this.props.action === "logout" && !this.isDispatch) {
            let findSession = false;
            CookieManager.get(Constants.SCP_HOST_URL)
                .then((res) => {
                    _.forEach(res, function(value, key) {
                        console.log(key);
                        if (key.indexOf("JTENANTSESSIONID") > -1)
                            findSession = true;
                    });
                    if (!findSession) {
                        that.setState({
                            loginMessage: "Logout Success"
                        });
                        if (Platform.OS === "android")
                            that.props.navigator.dismissAllModals();
                        that.props.dispatch(appActions.logout());
                        that.isDispatch = true;
                    }
                });
        }
    }
    onLoadEnd(e) {
        const targetUrl = e.nativeEvent.url;

        if (targetUrl === Constants.SCIURL && this.errorCount === 0 && this.isSubmit) {
            if (this.props.action === "login") {
                //const setUsername = 'document.getElementById("j_username").value ="' + this.props.username + '";';
                //const setPassword = 'document.getElementById("j_password").value ="' + this.props.password + '";';
                //const alertTest = 'alert(document.getElementById("j_username").value.length);';
                //const submitLogin = 'document.getElementById("logOnFormSubmit").click();';


                //const injectScript = 'function executeAction(){document.getElementById("j_username").value ="' + this.props.username + '";document.getElementById("j_password").value ="' + this.props.password + '";document.getElementById("logOnFormSubmit").click();}';
                //const injectScript = 'function executeAction(){document.getElementById("logOnFormSubmit").click();}';
                //const execute = 'executeAction();';

                const injectScript = `
                        function executeAction(){
                            document.getElementById("j_username").value ="${this.props.username}";
                            document.getElementById("j_password").value ="${this.props.password}";
                            document.getElementById("logOnFormSubmit").click();
                        }
                        executeAction();
                    `;
                if (this.webview) {
                    this.webview.injectJavaScript(injectScript);
                    //this.webview.injectJavaScript(execute);
                    //this.webview.injectJavaScript(setUsername);
                    //this.webview.injectJavaScript(submitLogin);
                    this.isSubmit = false;
                }
            }
        } else if (targetUrl === Constants.SCIURL && this.errorCount === 0 && !this.isSubmit) {
            const checkErrorMessage = 'window.postMessage(document.getElementsByClassName("ids-message--error").length)';
            if (this.webview) {
                this.webview.injectJavaScript(checkErrorMessage);
            }
        }
    }
    handleMessage(e) {
        //alert(e.nativeEvent.data);
        this.errorCount = parseInt(e.nativeEvent.data);
        if (this.errorCount > 0) {
            this.props.dispatch(appActions.changeLoginStatus('demo-login', 'error', "用户名或密码错误"));
            this.props.navigator.dismissAllModals();
        }
    }
    renderWebView() {
        if (this.props.loginURL) {
            return (<WebView
                             ref={ webview => {
                                       this.webview = webview;
                                   } }
                             automaticallyAdjustContentInsets={ true }
                             source={ { uri: this.props.loginURL } }
                             javaScriptEnabled={ true }
                             domStorageEnabled={ true }
                             decelerationRate="normal"
                             onError={ this.onError() }
                             onLoadEnd={ this.onLoadEnd }
                             onNavigationStateChange={ this.onNavigationStateChange }
                             onShouldStartLoadWithRequest={ this.onShouldStartLoadWithRequest }
                             startInLoadingState={ true }
                             onMessage={ this.handleMessage } />);
        } else {
            return (<WebView
                             ref={ webview => {
                                       this.webview = webview;
                                   } }
                             automaticallyAdjustContentInsets={ true }
                             source={ require('../nologin.html') }
                             javaScriptEnabled={ true }
                             domStorageEnabled={ true }
                             decelerationRate="normal"
                             onError={ this.onError() }
                             onLoadEnd={ this.onLoadEnd }
                             onNavigationStateChange={ this.onNavigationStateChange }
                             onShouldStartLoadWithRequest={ this.onShouldStartLoadWithRequest }
                             startInLoadingState={ true }
                             onMessage={ this.handleMessage } />);
        }
    }
    render() {
        return (
            <View style={ styles.container }>
              { this.renderWebView() }
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        isLoggedIn: state.app.root,
        loading: state.app.loading,
        errorMessage: state.app.errorMessage,
        loginStatus: state.app.loginStatus
    };
}

export default connect(mapStateToProps)(SCIScreen);
