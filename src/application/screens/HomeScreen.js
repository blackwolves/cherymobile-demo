import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import Button from 'apsl-react-native-button';
import { connect } from 'react-redux';
import * as appActions from '../../reducers/app/actions';

import HomeItem from './components/HomeItem';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    performBack() {
        this.props.dispatch(appActions.changeLoginStatus('start', 'initial'));
    }
    navigateTo(type) {
        this.props.navigator.push({
            screen: 'application.CluesScreen',
            title: type === "month" ? '本月线索' : '新增线索',
            navigatorStyle: {
                navBarTitleTextCentered: true
            },
            passProps: {
                type: type
            }
        });
    }
    render() {
        return (
            <View style={ styles.container }>
              <Button
                      isLoading={ false }
                      style={ [styles.buttonContainer, { height: 40 }] }
                      textStyle={ styles.textStyle6 }
                      onPress={ this.performBack.bind(this) }>
                返回
              </Button>
              <View style={ styles.base }>
                <View style={ [styles.base, { flexDirection: 'column' }] }>
                  <Text style={ styles.textNumber }>
                    5
                  </Text>
                  <Text style={ styles.textStyle }>
                    本月线索
                  </Text>
                </View>
                <View style={ [styles.base, { flexDirection: 'column' }] }>
                  <Text style={ styles.textNumber }>
                    4
                  </Text>
                  <Text style={ styles.textStyle }>
                    本月下订
                  </Text>
                </View>
                <View style={ [styles.base, { flexDirection: 'column' }] }>
                  <Text style={ styles.textNumber }>
                    8
                  </Text>
                  <Text style={ styles.textStyle }>
                    本月交车
                  </Text>
                </View>
              </View>
              <HomeItem
                        text="新增线索"
                        level="12"
                        iconName="glass"
                        onPressEvent={ this.navigateTo.bind(this, "new") } />
              <HomeItem
                        text="跟进中线索"
                        level="5"
                        iconName="heart"
                        onPressEvent={ this.navigateTo.bind(this, "month") } />
              <HomeItem
                        text="试乘试驾"
                        level="5"
                        iconName="car"
                        onPressEvent={ this.navigateTo.bind(this, "month") } />
              <HomeItem
                        text="下订线索"
                        level="5"
                        iconName="signal"
                        onPressEvent={ this.navigateTo.bind(this, "month") } />
              <HomeItem
                        text="待交车"
                        level="1"
                        iconName="key"
                        onPressEvent={ this.navigateTo.bind(this, "month") } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1'
    },
    base: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10
    },
    buttonContainer: {
        height: 100,
        width: "33%",
        backgroundColor: '#227622',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#227622',

        borderWidth: 1
    },
    textStyle6: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textNumber: {
        color: '#c0392b',
        fontSize: 50,
        fontWeight: 'bold'
    }
});

export default connect()(HomeScreen);
