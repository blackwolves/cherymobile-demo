import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import thunk from "redux-thunk";
import * as reducers from "./reducers";
import * as appActions from "./reducers/app/actions";
import * as settingActions from "./reducers/setting/actions";
import { registerScreens } from "./screens";
import { Platform, Alert, AlertIOS, PushNotificationIOS } from "react-native";
//import NotificationsIOS from 'react-native-notifications';
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
        //NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
        //NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
        //NotificationsIOS.requestPermissions();

        const receiveRemoteNotificationSub = NativeAppEventEmitter.addListener(
            'receiveRemoteNotification',
            (notification) => {
                //Android的消息类型为payload 透传消息 或者 cmd消息
                switch (notification.type) {
                    case "cid":
                        //  console.log("receiveRemoteNotification cid = " + notification.cid)
                        Platform.OS === "android" ? Alert.alert('初始化获取到cid', JSON.stringify(notification)) : AlertIOS.alert('初始化获取到cid', JSON.stringify(notification));
                        break;
                    case 'payload':
                        Platform.OS === "android" ? Alert.alert('payload 消息通知', JSON.stringify(notification)) : AlertIOS.alert('payload 消息通知', JSON.stringify(notification));
                        break;
                    case 'cmd':
                        Platform.OS === "android" ? Alert.alert('cmd 消息通知', 'cmd action = ' + notification.cmd) : AlertIOS.alert('cmd 消息通知', 'cmd action = ' + notification.cmd);
                        break;
                    default:
                        break;
                }
            }
        );

        const clickRemoteNotificationSub = NativeAppEventEmitter.addListener(
            'clickRemoteNotification',
            (notification) => {
                Platform.OS === "android" ? Alert.alert('点击通知', JSON.stringify(notification)) : AlertIOS.alert('点击通知', JSON.stringify(notification));
            }
        );
    }
    //onPushRegistered(deviceToken) {
    //  alert("Device Token Received: " + deviceToken);
    //}

    //onPushRegistrationFailed(error) {
    // For example:
    //
    // error={
    //   domain: 'NSCocoaErroDomain',
    //   code: 3010,
    //   localizedDescription: 'remote notifications are not supported in the simulator'
    // }
    //alert(error);
    //}
    componentWillMount() {
        const {NativeAppEventEmitter} = require('react-native');
        const resigsteClientIdSub = NativeAppEventEmitter.addListener(
            'registeClientId',
            (clientId) => {
                Alert.alert(clientId);
            }
        );
        const receiveRemoteNotificationSub = NativeAppEventEmitter.addListener(
            'receiveRemoteNotification',
            (notification) => {
                //消息类型分为 APNs 和 payload 透传消息，具体的消息体格式会有差异
                switch (notification.type) {
                    case "apns":
                        Alert.alert('APNs 消息通知', JSON.stringify(notification));
                        break;
                    case "payload":
                        Alert.alert('payload 消息通知', JSON.stringify(notification));
                        break;
                    default:
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
    componentWillUnmount() {
        receiveRemoteNotificationSub.remove();
        clickRemoteNotificationSub.remove();
        resigsteClientIdSub.remove();
    // prevent memory leaks!
    //NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    //NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
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
            case 'login':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'demo.LoginScreen',
                        title: 'Login',
                        navigatorStyle: {}
                    }
                });
                return;
            case 'after-login':
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
                    animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
                    tabsStyle: theme,
                    appStyle: theme
                });
                return;
            default:
                AlertIOS.alert('Unknown app root');
        }
    }
}
