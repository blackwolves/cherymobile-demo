import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableHighlight, Platform, Dimensions, Button, Linking } from 'react-native';
import Row from './components/Row';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

class ComponentsScreen extends React.Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type === 'DeepLink') {
            this.handleDeepLink(event);
        } else {
            switch (event.id) {
                case 'avatar':
                    this.toggleDrawer();
                    //Alert.alert('NavBar', 'Edit button pressed');
                    break;

                /*case 'add':
                  Alert.alert('NavBar', 'Add button pressed');
                  break;

                case 'tabSelected':
                  this.onTabSelected();
                  break;
*/
                default:
                    break;
            }
        }
    }

    showDetailPage = () => {
        this.props.navigator.push({
            title: 'Detail Page',
            screen: 'demo.CollapsingHeader'
        });
    }

    showFormPage = () => {
        this.props.navigator.push({
            title: 'Form Page',
            screen: 'demo.FormScreen'
        });
    }
    showListPage = () => {
        this.props.navigator.push({
            title: 'List Page',
            screen: 'demo.ListScreen'
        });
    }
    onShowSnackbarPress() {
        this.props.navigator.showSnackbar({
            text: 'Snack bar',
            actionText: 'Undo',
            actionColor: '#ff0000',
            actionId: 'undo',
            duration: 'indefinite'
        });
    }
    showInAppNotification = () => {
        this.props.navigator.showInAppNotification({
            screen: 'demo.Notification'
        });
    };
    showTopTabsScreen = () => {
        this.props.navigator.push({
            screen: 'demo.TopTabsScreen',
            title: 'Top Tabs'
        });
    };
    toggleDrawer = () => {
        this.props.navigator.showModal({
            screen: 'demo.AccountSetting',
            title: 'Account'
        });
    };
    showSignaturePage = () => {
        this.props.navigator.push({
            title: 'Signature Page',
            screen: 'demo.SignatureScreen'
        });
    }
    showSearchPage = () => {
        if (Platform.OS === 'android') {
            this.props.navigator.showModal({
                title: 'Search Page',
                screen: 'demo.SearchScreen',
                navigatorStyle: {
                    navBarHidden: true
                }
            });
        } else {
            this.props.navigator.push({
                title: 'Search Page',
                screen: 'demo.SearchScreen',
                navigatorStyle: {
                    navBarHidden: false
                }
            });
        }
    }
    showTabMenuPage = () => {
        this.props.navigator.push({
            title: 'Tab Menu Page',
            screen: 'demo.TabMenuScreen'
        });
    }
    showTimelinePage = () => {
        this.props.navigator.push({
            title: 'Timeline Page',
            screen: 'demo.TimelineScreen'
        });
    }
    showChartPage = () => {
        this.props.navigator.push({
            title: 'Chart Page',
            screen: 'demo.ChartScreen'
        });
    }
    showDropdownMenuPage = () => {
        this.props.navigator.push({
            title: 'Dropdown Menu Page',
            screen: 'demo.DropdownMenuScreen'
        });
    }
    showContactPage = () => {
        this.props.navigator.push({
            title: 'Contact Page',
            screen: 'demo.ContactScreen'
        });
    }
    showAnimationPage = () => {
        this.props.navigator.push({
            title: 'Animation Page',
            screen: 'demo.DemoAnimationScreen'
        });
    }
    render() {
        return (
            <ScrollView style={ styles.container }>
              <Row
                   title={ 'Toggle Drawer' }
                   onPress={ this.toggleDrawer } />
              <Row
                   title={ 'Top Tabs Screen' }
                   onPress={ this.showTopTabsScreen } />
              <Row
                   title={ 'Show Detail Page' }
                   onPress={ this.showDetailPage } />
              <Row
                   title={ 'Show In-App Notification' }
                   onPress={ this.showInAppNotification } />
              <Row
                   title={ 'Show Form Page' }
                   onPress={ this.showFormPage } />
              <Row
                   title={ 'Show Signature Page' }
                   onPress={ this.showSignaturePage } />
              <Row
                   title={ 'Show Search Page' }
                   onPress={ this.showSearchPage } />
              <Row
                   title={ 'Show Tab Menu Page' }
                   onPress={ this.showTabMenuPage } />
              <Row
                   title={ 'Show Dropdown Menu Page' }
                   onPress={ this.showDropdownMenuPage } />
              <Row
                   title={ 'Show List Page' }
                   onPress={ this.showListPage } />
              <Row
                   title={ 'Show Chart Page' }
                   onPress={ this.showChartPage } />
              <Row
                   title={ 'Show Timeline Page' }
                   onPress={ this.showTimelinePage } />
              <Row
                   title={ 'Try Dial Page' }
                   onPress={ this.showContactPage } />
              <Row
                   title={ 'Animation Page' }
                   onPress={ this.showAnimationPage } />
              { Platform.OS === 'android' ? <Row
                                                 title={ 'Show Snackbar' }
                                                 onPress={ this.onShowSnackbarPress.bind(this) } /> : false }
            </ScrollView>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ComponentsScreen;
