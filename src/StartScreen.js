import React, { Component, PropTypes } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Alert, AlertIOS, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as appActions from './reducers/app/actions';
import Button from 'apsl-react-native-button';

const {width} = Dimensions.get('window');
const btnMarginSpacing = parseInt((width - 300) / 2);

// this is a traditional React component connected to the redux store
class StartScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);
    }

    startDemoApp() {
        //alert(this.state.username+","+ this.state.password);
        this.props.dispatch(appActions.changeLoginStatus("demo-login"));
    //this.props.logIn(this.state.username, this.state.password);
    }
    startApp() {
        this.props.dispatch(appActions.changeLoginStatus("application-home"));
    }
    render() {
        return (
            <View style={ styles.container }>
              <Button
                      isLoading={ false }
                      style={ styles.buttonContainer }
                      textStyle={ styles.textStyle6 }
                      onPress={ this.startDemoApp.bind(this) }>
                Demo系统
              </Button>
              <Button
                      isLoading={ false }
                      style={ styles.buttonContainer }
                      textStyle={ styles.textStyle6 }
                      onPress={ this.startApp.bind(this) }>
                开发系统
              </Button>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 20,
        //height: 40,
        width: 300,
        marginLeft: btnMarginSpacing,
        backgroundColor: '#227622',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#227622',
        borderRadius: 5,
        borderWidth: 1
    },
    textStyle6: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
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

export default connect(mapStateToProps)(StartScreen);
