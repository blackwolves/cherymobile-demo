import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet, Modal, Switch } from 'react-native';
import { connect } from 'react-redux';
import * as appActions from '../../reducers/app/actions';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import TabBar from 'react-native-xtabbar';
import Button from 'apsl-react-native-button';

class DemoCustomizeTabsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            animationType: 'none',
            modalVisible: false,
            transparent: false
        };
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
        this.setState({
            animationType: 'slide',
            modalVisible: true
        });
    /*this.props.navigator.showModal({
        title: 'Timeline Page',
        screen: 'demo.TimelineScreen',
        animationType: 'slide-up',
        navigatorStyle: {}
    });*/
    }
    _setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    _setAnimationType(type, visible) {
        this.setState({
            animationType: type,
            modalVisible: visible
        });
    }

    _toggleTransparent() {
        this.setState({
            transparent: !this.state.transparent
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
                             title="首页">
                  <View>
                    <Text style={ { fontSize: 18 } }>
                      首页
                    </Text>
                  </View>
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/two.png') }
                             selectedIcon={ require('../../../img/two.png') }
                             title="线索">
                  <View style={ styles.text }>
                    <Text style={ { fontSize: 18 } }>
                      线索
                    </Text>
                  </View>
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/navicon_add.png') }
                             selectedIcon={ require('../../../img/navicon_add.png') }
                             title="">
                  <View style={ styles.text } />
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/three.png') }
                             selectedIcon={ require('../../../img/three.png') }
                             title="客户">
                  <View style={ styles.text }>
                    <Text style={ { fontSize: 18 } }>
                      客户
                    </Text>
                  </View>
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/one.png') }
                             selectedIcon={ require('../../../img/one.png') }
                             title="我的">
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
              <Modal
                     animationType={ this.state.animationType }
                     transparent={ this.state.transparent }
                     visible={ this.state.modalVisible }
                     onRequestClose={ () => {
                                          this._setModalVisible(false);
                                      } }>
                <View style={ [styles.container] }>
                  <View style={ [styles.innerContainer] }>
                    <Button
                            style={ styles.buttonContainer }
                            textStyle={ styles.textStyle6 }
                            onPress={ this._setModalVisible.bind(this, false) }>
                      返回
                    </Button>
                  </View>
                </View>
              </Modal>
            </View>
            );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 20,
        height: 40,
        width: 300,
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

export default connect(mapStateToProps)(DemoCustomizeTabsScreen);
