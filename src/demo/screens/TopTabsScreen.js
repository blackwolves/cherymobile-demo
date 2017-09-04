import React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';

import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import TabOne from './components/tabs/TabOne';
import TabTwo from './components/tabs/TabTwo';

class TopTabsScreen extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true
    };

    render() {
        return (<ScrollableTabView
                                   style={ { marginTop: 20 } }
                                   initialPage={ 0 }
                                   renderTabBar={ () => <DefaultTabBar textStyle={ styles.tabText } /> }>
                  <ScrollView
                              tabLabel="新增意向客户"
                              style={ styles.tabView }>
                    { TabOne }
                  </ScrollView>
                  <ScrollView
                              tabLabel="新增线索"
                              style={ styles.tabView }>
                    { TabTwo }
                  </ScrollView>
                  <ScrollView
                              tabLabel="新增下订"
                              style={ styles.tabView }>
                    { TabOne }
                  </ScrollView>
                  <ScrollView
                              tabLabel="新增试驾"
                              style={ styles.tabView }>
                    { TabTwo }
                  </ScrollView>
                </ScrollableTabView>);
    }
}

const styles = StyleSheet.create({
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)'
    },
    tabText: {
        fontSize: 12
    }
});
export default TopTabsScreen;
