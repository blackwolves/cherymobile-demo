import React from 'react';
import { View, Text, Platform, ScrollView, Alert, AlertIOS, ActivityIndicator, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { TableView, Section, CellItem } from './components/tableview';
import RightArrow from './components/RightArrow';
import Timeline from './components/Timeline';

class ClueDetailScreen extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true
    };
    constructor(props) {
        super(props);

        this.onEndReached = this.onEndReached.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onRefresh = this.onRefresh.bind(this);

        this.data = [
            {
                time: '2017-09-09 12:09',
                title: '由[销售顾问张三] 变更状态',
                description: '点此更新...'
            },
            {
                time: '2017-09-07 14:09',
                title: '由[销售经理王二]变更状态',
                description: '更换销售顾问'
            },
            {
                time: '2017-09-07 12:09',
                title: '由[销售顾问李四]变更状态',
                description: '客户进店看车'
            },
            {
                time: '2017-09-05 12:09',
                title: '由[销售顾问李四]变更状态',
                description: '客户进店看车'
            },
            {
                time: '2017-09-04 09:00',
                title: '由[销售顾问李四]变更状态',
                description: '已电话访问顾客'
            }
        ];

        this.state = {
            isRefreshing: false,
            waiting: false,
            data: this.data
        };
    }

    onRefresh() {
        this.setState({
            isRefreshing: true
        });
        //refresh to initial data
        setTimeout(() => {
            //refresh to initial data
            this.setState({
                data: this.data,
                isRefreshing: false
            });
        }, 2000);
    }

    onEndReached() {
        if (!this.state.waiting) {
            this.setState({
                waiting: true
            });

            //fetch and concat data
            setTimeout(() => {
                //refresh to initial data
                const data = this.state.data.concat(
                    [
                        {
                            time: '18:00',
                            title: '更多数据',
                            description: '更多数据'
                        },
                        {
                            time: '18:00',
                            title: '更多数据',
                            description: '更多数据'
                        },
                        {
                            time: '18:00',
                            title: '更多数据',
                            description: '更多数据'
                        },
                        {
                            time: '18:00',
                            title: '更多数据',
                            description: '更多数据'
                        },
                        {
                            time: '18:00',
                            title: '更多数据',
                            description: '更多数据'
                        }
                    ]
                );

                this.setState({
                    waiting: false,
                    data: data
                });
            }, 2000);
        }
    }

    renderFooter() {
        if (this.state.waiting) {
            return <ActivityIndicator />;
        } else {
            return <Text />;
        }
    }
    onEventPress(data) {
        Platform.OS === 'android' ? Alert.alert(data.title) : AlertIOS.alert(data.title);
    }

    openSelectPanel(type) {
        this.props.navigator.showModal({
            screen: 'application.SelectModal',
            animationType: 'slide-up',
            navigatorStyle: {
                navBarComponentAlignment: 'center',
                navBarTranslucent: false,
                navBarTransparent: false,
                navBarNoBorder: true,
                navBarTitleTextCentered: true,
                navBarHidden: true
            },
            title: type
        });
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
                      <Timeline
                                style={ styles.list }
                                data={ this.state.data }
                                circleSize={ 16 }
                                circleColor="gray"
                                lineColor="gray"
                                descriptionStyle={ { color: 'gray' } }
                                options={ { style: { paddingTop: 5 }, refreshControl: ( <RefreshControl refreshing={ this.state.isRefreshing } onRefresh={ this.onRefresh } /> ), renderFooter: this.renderFooter, onEndReached: this.onEndReached } }
                                onEventPress={ this.onEventPress } />
                    </View>
                  </ScrollView>
                  <ScrollView
                              tabLabel="线索相关"
                              style={ styles.tabView }>
                    <View>
                      <TableView style={ { backgroundColor: 'gray', paddingBottom: 20 } }>
                        <CellItem>
                          <Text style={ { flex: 1, fontSize: 16 } }>
                            客户姓名
                          </Text>
                          <Text style={ { textAlign: 'right' } }>
                            王女士
                          </Text>
                        </CellItem>
                        <CellItem>
                          <Text style={ { flex: 1, fontSize: 16 } }>
                            联系电话
                          </Text>
                          <Text style={ { textAlign: 'right' } }>
                            19823455432
                          </Text>
                        </CellItem>
                      </TableView>
                      <TableView style={ { backgroundColor: 'gray', paddingBottom: 20 } }>
                        <CellItem>
                          <Text style={ { flex: 1, fontSize: 16 } }>
                            线索等级
                          </Text>
                          <RightArrow
                                      text="c(可能)"
                                      onPressEvent={ () => this.openSelectPanel('线索等级') } />
                        </CellItem>
                        <CellItem>
                          <Text
                                text="等级"
                                style={ { flex: 1, fontSize: 16 } }>
                            线索来源
                          </Text>
                          <RightArrow
                                      text="官网"
                                      onPressEvent={ () => this.openSelectPanel('线索来源') } />
                        </CellItem>
                        <CellItem>
                          <Text style={ { flex: 1, fontSize: 16 } }>
                            意向车型
                          </Text>
                          <RightArrow
                                      text="奇瑞Q12017款"
                                      onPressEvent={ () => this.openSelectPanel('意向车型') } />
                        </CellItem>
                        <CellItem>
                          <Text style={ { flex: 1, fontSize: 16 } }>
                            付款方式
                          </Text>
                          <RightArrow
                                      text="全款"
                                      onPressEvent={ () => this.openSelectPanel('付款方式') } />
                        </CellItem>
                        <CellItem>
                          <Text style={ { flex: 1, fontSize: 16 } }>
                            购车用途
                          </Text>
                          <RightArrow
                                      text="家用"
                                      onPressEvent={ () => this.openSelectPanel('购车用途') } />
                        </CellItem>
                        <CellItem>
                          <Text style={ { flex: 1, fontSize: 16 } }>
                            购买类型
                          </Text>
                          <RightArrow
                                      text="首次购车"
                                      onPressEvent={ () => this.openSelectPanel('购买类型') } />
                        </CellItem>
                      </TableView>
                      <Text text="备注" />
                    </View>
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
    },
    list: {
        flex: 1
    }
});

export default ClueDetailScreen;
