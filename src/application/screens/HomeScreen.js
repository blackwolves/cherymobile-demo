import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, Platform, StyleSheet } from 'react-native';
import Button from 'apsl-react-native-button';
import { connect } from 'react-redux';
import * as appActions from '../../reducers/app/actions';

import HomeItem from './components/HomeItem';

class HomeScreen extends React.Component {
    static navigatorStyle = {
        navBarHidden: true
    };
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
              <View style={ [styles.base, { backgroundColor: 'lightgray', marginBottom: 20 }] }>
                <View style={ [styles.base, { height: '70%', bottom: -30, overflow: 'visible' }] }>
                  <TouchableHighlight
                                      style={ styles.touchable }
                                      onPress={ this.navigateTo.bind(this, "month") }>
                    <View style={ [styles.base, { flexDirection: 'column' }] }>
                      <Text style={ styles.textNumber }>
                        5
                      </Text>
                      <Text style={ styles.textStyle }>
                        本月线索
                      </Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                                      style={ styles.touchable }
                                      onPress={ this.navigateTo.bind(this, "month") }>
                    <View style={ [styles.base, { flexDirection: 'column' }] }>
                      <Text style={ styles.textNumber }>
                        4
                      </Text>
                      <Text style={ styles.textStyle }>
                        本月下订
                      </Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                                      style={ styles.touchable }
                                      onPress={ this.navigateTo.bind(this, "month") }>
                    <View style={ [styles.base, { flexDirection: 'column' }] }>
                      <Text style={ styles.textNumber }>
                        8
                      </Text>
                      <Text style={ styles.textStyle }>
                        本月交车
                      </Text>
                    </View>
                  </TouchableHighlight>
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
                        onPressEvent={ this.performBack.bind(this) } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1'
    },
    touchable: {
        flex: 1
    },
    base: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10
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
