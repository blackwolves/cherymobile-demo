import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';


class ClueDetailScreen extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (<ScrollableTabView
                                   style={ { marginTop: 20 } }
                                   initialPage={ 0 }
                                   renderTabBar={ () => <DefaultTabBar textStyle={ styles.tabText } /> }>
                  <ScrollView
                              tabLabel="跟进情况"
                              style={ styles.tabView }>
                    <View>
                      <Text>
                        Tab Two
                      </Text>
                    </View>
                  </ScrollView>
                  <ScrollView
                              tabLabel="线索相关"
                              style={ styles.tabView }>
                    <View>
                      <Text>
                        Tab Two
                      </Text>
                    </View>
                  </ScrollView>
                </ScrollableTabView>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
        color: 'pink';
    },
    tabText: {
        fontSize: 12
    }
});

export default ClueDetailScreen;
