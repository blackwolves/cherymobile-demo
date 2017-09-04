import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Constants from '../../lib/Constants';
import * as settingActions from '../reducers/setting/actions';
import * as appActions from '../../reducers/app/actions';

import THEME from '../theme/index.json';

class AccountSetting extends React.Component {
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../../../img/ic_back.png'),
                id: 'back'
            }
        ]
    };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    closeModal = () => {
        this.props.navigator.dismissModal();
    };
    onNavigatorEvent(event) {
        switch (event.id) {
            case 'back':
                this.closeModal();
                break;
            default:
                break;
        }
    }
    _defaultTheme = () => {
        this.props.dispatch(settingActions.applyTheme(THEME.DEFAULT_THEME));
    //this.props.navigator.setStyle(THEME.DEFAULT_THEME);
    };
    _darkBlueTheme = () => {
        this.props.dispatch(settingActions.applyTheme(THEME.DARK_THEME));
    //this.props.navigator.setStyle(THEME.DARK_THEME);
    };
    onLogoutPress() {
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
    //this.props.dispatch(appActions.logout());
    }

    render() {
        return (
            <View style={ styles.container }>
              <TouchableOpacity onPress={ this._defaultTheme }>
                <View class="button">
                  <Text class="label">
                    DEFAULT THEME
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={ this._darkBlueTheme }>
                <View class="button">
                  <Text class="label">
                    Dark Blue THEME
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={ this.onLogoutPress.bind(this) }>
                <Text style={ styles.button }>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 4
    },
    button: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        color: 'blue'
    }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        theme: state.setting.theme
    };
}

export default connect(mapStateToProps)(AccountSetting);
