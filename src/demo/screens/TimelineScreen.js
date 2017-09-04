import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, AlertIOS, ScrollView, ListView, Image, ActivityIndicator, ActivityIndicatorIOS, Platform, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import Timeline from './components/Timeline';

class TimelineScreen extends Component {
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
                description: '汽车询价中...'
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
    render() {
        return (
            <View style={ styles.container }>
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
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white'
    },
    list: {
        flex: 1
    }
});

export default connect()(TimelineScreen);
