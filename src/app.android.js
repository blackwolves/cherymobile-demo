import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import thunk from "redux-thunk";
import * as reducers from "./reducers";
import * as appActions from "./reducers/app/actions";
import { registerScreens } from "./screens";
import { Alert, NativeAppEventEmitter } from "react-native";
import Getui from 'react-native-getui';

// redux related book keeping
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// screen related book keeping
registerScreens(store, Provider);

// notice that this is just a simple class, it's not a React component
export default class App {
    constructor() {
        // since react-redux only works on components, we need to subscribe this class manually
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appActions.appInitialized());

        const receiveRemoteNotificationSub = NativeAppEventEmitter.addListener(
            'receiveRemoteNotification',
            (notification) => {
                //Android的消息类型为payload 透传消息 或者 cmd消息
                switch (notification.type) {
                case "cid":
                    //  console.log("receiveRemoteNotification cid = " + notification.cid)
                    Alert.alert('初始化获取到cid', JSON.stringify(notification));
                    break;
                case 'payload':
                    Alert.alert('payload 消息通知', JSON.stringify(notification));
                    break;
                case 'cmd':
                    Alert.alert('cmd 消息通知', 'cmd action = ' + notification.cmd);
                    break;
                default:
                    break;
                }
            }
        );

        const clickRemoteNotificationSub = NativeAppEventEmitter.addListener(
            'clickRemoteNotification',
            (notification) => {
                Alert.alert('点击通知', JSON.stringify(notification));
            }
        );
    }

    onStoreUpdate() {
        const {root} = store.getState().app;
        const {theme} = store.getState().setting;
        // handle a root change
        // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
        if (this.currentRoot !== root || this.currentTheme !== theme) {
            this.currentRoot = root;
            this.currentTheme = theme;
            this.startApp(root, theme);
        }
    }

    startApp(root, theme) {
        switch (root) {
        case 'start':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'start.StartScreen',
                    title: '请选择启动APP方式',
                    navigatorStyle: {}
                }
            });
            return;
        case 'demo-login':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'demo.LoginScreen',
                    title: 'Login',
                    navigatorStyle: {}
                }
            });
            return;
        case 'demo-after-login':
            // this will start our app
            Navigation.startTabBasedApp({
                tabs: [
                    {
                        label: '首页',
                        screen: 'demo.HomeScreen',
                        icon: require('../img/one.png'),
                        selectedIcon: require('../img/one_selected.png'),
                        title: '首页',
                        overrideBackPress: true,
                        navigatorStyle: {}
                    },
                    {
                        label: 'C4C模块',
                        screen: 'demo.C4CModuleListScreen',
                        icon: require('../img/two.png'),
                        selectedIcon: require('../img/two_selected.png'),
                        title: 'C4C 模块',
                        navigatorStyle: {}
                    },
                    {
                        label: '图片相关',
                        screen: 'demo.AlbumScreen',
                        icon: require('../img/three.png'),
                        selectedIcon: require('../img/three_selected.png'),
                        title: '图片相关',
                        overrideBackPress: true,
                        navigatorStyle: {}
                    },
                    {
                        label: '控件库',
                        screen: 'demo.ComponentsScreen',
                        icon: require('../img/one.png'),
                        selectedIcon: require('../img/one_selected.png'),
                        title: '控件库',
                        overrideBackPress: true,
                        navigatorStyle: {}
                    }
                ],
                animationType: 'fade',
                tabsStyle: theme,
                appStyle: theme
            });
            return;
        case 'application-home':
            // this will start our app
            Navigation.startTabBasedApp({
                tabs: [
                    {
                        label: '首页',
                        screen: 'application.HomeScreen',
                        icon: require('../img/one.png'),
                        selectedIcon: require('../img/one_selected.png'),
                        title: '首页',
                        overrideBackPress: true,
                        navigatorStyle: {}
                    },
                    {
                        label: '线索',
                        screen: 'application.CluesScreen',
                        icon: require('../img/one.png'),
                        selectedIcon: require('../img/one_selected.png'),
                        title: '线索',
                        overrideBackPress: true,
                        navigatorStyle: {
                            navBarTitleTextCentered: true
                        },
                        navigatorButtons: {
                            leftButtons: [
                                {
                                    title: '搜索',
                                    id: 'search',
                                    disableIconTint: true,
                                    buttonColor: 'blue',
                                    buttonFontSize: 14,
                                    buttonFontWeight: '600'
                                }
                            ],
                            rightButtons: [
                                {
                                    title: '创建',
                                    id: 'create',
                                    testID: 'e2e_rules',
                                    disableIconTint: true,
                                    showAsAction: 'ifRoom',
                                    buttonColor: 'blue',
                                    buttonFontSize: 14,
                                    buttonFontWeight: '600'
                                }
                            ]
                        }
                    },
                    {
                        label: '',
                        screen: 'application.CreateClueScreen',
                        icon: require('../img/navicon_add.png'),
                        selectedIcon: require('../img/navicon_add.png'),
                        title: '创建线索',
                        overrideBackPress: true,
                        navigatorStyle: {},
                        navigatorButtons: {
                            rightButtons: [
                                {
                                    title: '确定',
                                    id: 'save_create',
                                    testID: 'e2e_rules',
                                    disableIconTint: true,
                                    showAsAction: 'ifRoom',
                                    buttonColor: 'blue',
                                    buttonFontSize: 14,
                                    buttonFontWeight: '600'
                                }
                            ]
                        }
                    },
                    {
                        label: '客户',
                        screen: 'application.CustomerListScreen',
                        icon: require('../img/one.png'),
                        selectedIcon: require('../img/one_selected.png'),
                        title: '客户',
                        overrideBackPress: true,
                        navigatorStyle: {}
                    },
                    {
                        label: '我的',
                        screen: 'application.UserProfileScreen',
                        icon: require('../img/one.png'),
                        selectedIcon: require('../img/one_selected.png'),
                        title: '我的',
                        overrideBackPress: true,
                        navigatorStyle: {}
                    }
                ],
                animationType: 'slide-down',
                tabsStyle: theme,
                appStyle: theme
            });
            return;
        default:
            Alert.alert('Unknown app root');
        }
    }
}
