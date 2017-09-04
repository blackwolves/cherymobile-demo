import React from 'react';
import { Text, Image, View, ScrollView, TouchableOpacity, StyleSheet, Alert, AlertIOS, Platform } from 'react-native';
import { connect } from 'react-redux';
import C4CRow from './components/C4CRow';

// this is a traditional React component connected to the redux store
class C4CModuleListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    navToContactPage = () => {
        this.props.navigator.push({
            title: "Contact Page",
            screen: 'demo.C4C.ContactScreen',
            passProps: {}
        });
    }
    render() {
        return (
            <ScrollView style={ styles.container }>
              <C4CRow
                      title="报表"
                      onPress={ this.navToReportPage }
                      type="report" />
              <C4CRow
                      title="线索"
                      onPress={ this.navToLeadPage }
                      type="lead" />
              <C4CRow
                      title="机会"
                      onPress={ this.navToOpportunityPage }
                      type="oppotunity" />
              <C4CRow
                      title="客户"
                      onPress={ this.navToCustomerPage }
                      type="customer" />
              <C4CRow
                      title="活动"
                      onPress={ this.navToEventPage }
                      type="activity" />
              <C4CRow
                      title="联系人"
                      onPress={ this.navToContactPage }
                      type="contact" />
            </ScrollView>
            );
    }

    navToReportPage() {
        /*this.props.navigator.push({
          title: "Report Page",
          screen: 'demo.C4C.ReportScreen',
          passProps: {}
        });*/
        Platform.OS === 'android' ? Alert.alert("not ready") : AlertIOS.alert('not ready');
    }

    navToLeadPage = () => {
        this.props.navigator.push({
            title: "线索",
            screen: 'demo.C4C.LeadScreen',
            passProps: {}
        });
    }
    navToOpportunityPage() {
        /*
        this.props.navigator.push({
          title: "Report Page",
          screen: 'demo.C4C.OpportunityScreen',
          passProps: {}
        });*/
        Platform.OS === 'android' ? Alert.alert("not ready") : AlertIOS.alert('not ready');
    }
    navToCustomerPage() {
        /*
        this.props.navigator.push({
          title: "Report Page",
          screen: 'demo.C4C.CustomerScreen',
          passProps: {}
        });*/
        Platform.OS === 'android' ? Alert.alert("not ready") : AlertIOS.alert('not ready');
    }
    navToEventPage() {
        /*
        this.props.navigator.push({
          title: "Report Page",
          screen: 'demo.C4C.EventScreen',
          passProps: {}
        });*/
        Platform.OS === 'android' ? Alert.alert("not ready") : AlertIOS.alert('not ready');
    }

    onSetTabBadgePress() {
        this.props.navigator.setTabBadge({
            badge: this.props.isLoggedIn,
            tabIndex: 1
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        isLoggedIn: state.root
    };
}

export default connect(mapStateToProps)(C4CModuleListScreen);
