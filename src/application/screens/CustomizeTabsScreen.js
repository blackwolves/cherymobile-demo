import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet, Modal, Switch, Image, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as appActions from '../../reducers/app/actions';
import { updateSelectedTab } from '../../reducers/app/actions';


import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import TabBar from 'react-native-xtabbar';
import Button from 'apsl-react-native-button';

import HomeScreen from './HomeScreen';
import CluesScreen from './CluesScreen';
import CustomerListScreen from './CustomerListScreen';
import UserProfileScreen from './UserProfileScreen';
import HeaderBar from './components/HeaderBar';


class CustomizeTabsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animationType: 'none',
            modalVisible: false,
            transparent: false
        };
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    static navigatorStyle = {
        navBarHidden: true
    }
    componentDidMount() {
        // this.props.dispatch(appActions.getLoginUser());
    }

    componentWillReceiveProps(nextProps) {}
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
    }
    handleSearch() {
        Alert.alert('Search...');
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

    _setSelectedTab(tabName) {
        appActions.updateSelectedTab(tabName);
    }
    performBack() {
        this.props.dispatch(appActions.changeLoginStatus('start', 'initial'));
    }
    componentWillReceiveProps(nextProps) {
        let next = nextProps;
        Alert.alert(nextProps);
    }
    navigateTo(type) {
        if (type === "addClue") {
            this.props.navigator.push({
                screen: 'application.CreateClueScreen',
                title: '创建线索',
                navigatorStyle: {
                    navBarTitleTextCentered: true
                },
                passProps: {
                    type: type
                },
                navigatorButtons: {
                    rightButtons: [
                        {
                            title: '确定',
                            id: 'confirm',
                            buttonFontSize: 14,
                            buttonFontWeight: '800'
                        }
                    ]
                }
            });
        } else if (type === "addCustomer") {
            this.props.navigator.push({
                screen: 'application.CreateNewClient',
                title: '创建客户',
                navigatorStyle: {
                    navBarTitleTextCentered: true
                },
                passProps: {
                    type: type
                }
            });
        }

    }
    render() {
        return (
            <View style={ styles.container }>
              <TabBar
                      defaultPage={ 0 }
                      onItemSelected={ (index) => {
                                           console.log(`current item's index is ${index}`);
                                       } }>
                <TabBar.Item
                             icon={ require('../../../img/one.png') }
                             selectedIcon={ require('../../../img/one.png') }
                             onPress={ () => {
                                           this._setSelectedTab('home');
                                       } }
                             title="首页">
                  <View style={ styles.container }>
                    <HomeScreen navigator={ this.props.navigator } />
                  </View>
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/two.png') }
                             selectedIcon={ require('../../../img/two.png') }
                             title="线索"
                             onPress={ () => {
                                           this._setSelectedTab('clue');
                                       } }>
                  <View style={ styles.container }>
                    <HeaderBar
                               iconName="search"
                               headerTitle="线索"
                               buttonName="创建"
                               onSearch={ this.handleSearch.bind(this) }
                               onPressEvent={ this.navigateTo.bind(this, 'addClue') } />
                    <CluesScreen navigator={ this.props.navigator } />
                  </View>
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/navicon_add.png') }
                             selectedIcon={ require('../../../img/navicon_add.png') }
                             title=""
                             onPress={ () => {
                                           this._setSelectedTab('add');
                                       } }>
                  <View/>
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/three.png') }
                             selectedIcon={ require('../../../img/three.png') }
                             title="客户"
                             onPress={ () => {
                                           this._setSelectedTab('customer');
                                       } }>
                  <View style={ styles.container }>
                    <HeaderBar
                               iconName="search"
                               headerTitle="客户"
                               buttonName="创建"
                               onSearch={ this.handleSearch.bind(this) }
                               onPressEvent={ this.navigateTo.bind(this, 'addCustomer') } />
                    <CustomerListScreen navigator={ this.props.navigator } />
                  </View>
                </TabBar.Item>
                <TabBar.Item
                             icon={ require('../../../img/one.png') }
                             selectedIcon={ require('../../../img/one.png') }
                             title="我的"
                             onPress={ () => {
                                           this._setSelectedTab('myCenter');
                                       } }>
                  <View style={ styles.container }>
                    <UserProfileScreen navigator={ this.props.navigator } />
                  </View>
                </TabBar.Item>
              </TabBar>
              <ActionButton
                            buttonColor="rgba(231,76,60,1)"
                            position="center"
                            offsetY={ 20 }
                            onPress={ this.navigateTo.bind(this, 'addClue') } />
              <Modal
                     animationType={ this.state.animationType }
                     transparent={ this.state.transparent }
                     visible={ this.state.modalVisible }
                     onRequestClose={ () => {
                                          this._setModalVisible(false);
                                      } }>
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
    },
    homeContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5
    },
    createCluebuttonContainer: {
        marginTop: 0,
        height: 20,
        width: 30,
        backgroundColor: 'blue',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        borderColor: 'white'
    },
    headerBar: {
        flex: 1,
        height: 40
    }
});
// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        isLoggedIn: state.app.root,
        loading: state.app.loading,
        errorMessage: state.app.errorMessage,
        loginStatus: state.app.loginStatus,
        selectedTab: state.app.selectedTab // only used for customized tabs screen
    };
}

export default connect(mapStateToProps)(CustomizeTabsScreen);
