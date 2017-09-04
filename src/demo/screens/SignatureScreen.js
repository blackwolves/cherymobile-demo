import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { View, Text, StyleSheet, ScrollView, TouchableHighlight, Alert, AlertIOS, Platform } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

class SignatureScreen extends Component {
    static navigatorStyle = {
        tabBarHidden: true
    };

    constructor(props) {
        super(props);
    }

    saveSign() {
        this.refs.sign.saveImage();
    }

    resetSign() {
        this.refs.sign.resetImage();
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        //console.log(result);
        if (Platform.OS === 'android') {
            Alert.alert(result.encoded + ", " + result.pathName);
        } else {
            AlertIOS.alert(result.encoded + ", " + result.pathName);
        }
    }
    render() {
        return (
            <View style={ { flex: 1, flexDirection: "column" } }>
              <SignatureCapture
                                style={ [{ flex: 1 }, styles.signature] }
                                ref="sign"
                                onSaveEvent={ this._onSaveEvent }
                                saveImageFileInExtStorage={ false }
                                showNativeButtons={ false }
                                showTitleLabel={ false }
                                viewMode={ "portrait" } />
              <View style={ { flex: 1, flexDirection: "row" } }>
                <TouchableHighlight
                                    style={ styles.buttonStyle }
                                    onPress={ this.saveSign.bind(this) }>
                  <Text>
                    Save
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                                    style={ styles.buttonStyle }
                                    onPress={ this.resetSign.bind(this) }>
                  <Text>
                    Reset
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            );
    }
}
const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1
    },
    buttonStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});
export default connect()(SignatureScreen);
