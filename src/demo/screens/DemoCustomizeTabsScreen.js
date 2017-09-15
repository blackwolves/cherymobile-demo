import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as appActions from '../../reducers/app/actions';

import Icon from 'react-native-vector-icons/FontAwesome'
import { Dimensions } from 'react-native'
import ActionButton from 'react-native-action-button';
import TabBar from 'react-native-xtabbar';

class DemoCustomizeTabsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    componentDidMount() {
        //this.props.dispatch(appActions.getLoginUser());
    }
    onNavigatorEvent(event) {
        switch (event.id) {
            case 'avatar':
                this.toggleDrawer();
                break;
            case 'add':
                this.props.navigator.push({
                    title: 'Timeline Page',
                    screen: 'demo.TimelineScreen'
                });
                break;
            default:
                break;
        }
    }
    toggleDrawer = () => {
        this.props.navigator.showModal({
            screen: 'demo.AccountSetting',
            title: 'Account'
        });
    };
    navigateToAddPage = () => {
        this.props.navigator.showModal({
            title: 'Timeline Page',
            screen: 'demo.TimelineScreen',
            animationType: 'slide-up',
            navigatorStyle: {}
        });
    }
    render() {
        return (
            <View style={ styles.container }>
              <TabBar
                      style={ styles.content }
                      onItemSelected={ (index) => {
                                           console.log(`current item's index is ${index}`);
                                       } }>
                <TabBar.Item
                             icon={ require('../../../img/one.png') }
                             selectedIcon={ require('../../../img/one.png') }
                             onPress={ () => {
                                           // do sth
                                       } }
                             badge={ 7 }
                             title='首页'>
                  <View style={ styles.text }>
                    <Text style={ { fontSize: 18 } }>
                      首页
                    </Text>
                  </View>
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/two.png') }
                             selectedIcon={ require('../../../img/two.png') }
                             title='线索'>
                  <View style={ styles.text }>
                    <Text style={ { fontSize: 18 } }>
                      线索
                    </Text>
                  </View>
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/navicon_add.png') }
                             selectedIcon={ require('../../../img/navicon_add.png') }
                             title=''>
                  <View style={ styles.text }>
                  </View>
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/three.png') }
                             selectedIcon={ require('../../../img/three.png') }
                             title='客户'>
                  <View style={ styles.text }>
                    <Text style={ { fontSize: 18 } }>
                      客户
                    </Text>
                  </View>
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/one.png') }
                             selectedIcon={ require('../../../img/one.png') }
                             title='我的'>
                  <View style={ styles.text }>
                    <Text style={ { fontSize: 18 } }>
                      我的
                    </Text>
                  </View>
                </TabBar.Item>
              </TabBar>
              <ActionButton
                            buttonColor="rgba(231,76,60,1)"
                            position="center"
                            offsetY={ 20 }
                            onPress={ this.navigateToAddPage } />
            </View>
            );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    content: {
        flex: 1,
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

export default connect(mapStateToProps)(DemoCustomizeTabsScreen);
