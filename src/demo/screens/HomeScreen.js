import React from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import styles from '../styles/HomeScreenStyle';
import Row from './components/Row';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import * as appActions from '../../reducers/app/actions';

class HomeScreen extends React.Component {
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../../../img/ic_account_box_.png'),
                title: 'Account',
                id: 'avatar'
            }
        ]
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    componentDidMount() {
        this.props.dispatch(appActions.getLoginUser());
    }
    onNavigatorEvent(event) {
        switch (event.id) {
            case 'avatar':
                this.toggleDrawer();
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

    render() {
        return (
            <ScrollView style={ styles.container }>
              <View style={ { flex: 1 } }>
                <Carousel
                          delay={ 2000 }
                          style={ styles.image }
                          autoplay={ true }
                          pageInfo={ true }>
                  <View>
                    <Image
                           source={ require('../../../img/bg06.jpg') }
                           style={ styles.image } />
                  </View>
                  <View>
                    <Image
                           source={ require('../../../img/bg07.jpg') }
                           style={ styles.image } />
                  </View>
                  <View>
                    <Image
                           source={ require('../../../img/bg08.jpg') }
                           style={ styles.image } />
                  </View>
                  <View>
                    <Image
                           source={ require('../../../img/bg09.jpg') }
                           style={ styles.image } />
                  </View>
                </Carousel>
              </View>
              <View style={ { flex: 1 } }>
                <Row title={ 'Toggle Drawer' } />
                <Row title={ 'Push Screen' } />
                <Row title={ 'Top Tabs Screen' } />
                <Row title={ 'Show Modal' } />
                <Row title={ 'Show Lightbox' } />
                <Row title={ 'Show In-App Notification' } />
                <Row title={ 'Toggle Drawer' } />
                <Row title={ 'Push Screen' } />
                <Row title={ 'Top Tabs Screen' } />
                <Row title={ 'Show Modal' } />
                <Row title={ 'Show Lightbox' } />
                <Row title={ 'Show In-App Notification' } />
              </View>
            </ScrollView>
            );
    }
}
// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        isLoggedIn: state.app.root,
        loading: state.app.loading,
        errorMessage: state.app.errorMessage,
        loginStatus: state.app.loginStatus
    };
}

export default connect(mapStateToProps)(HomeScreen);
