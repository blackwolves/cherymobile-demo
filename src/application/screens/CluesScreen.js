import React from 'react';
import TimerEnhance from 'react-native-smart-timer-enhance';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import { View, Text, ListView, ScrollView, ActivityIndicator, ActivityIndicatorIOS, StyleSheet, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import styles from '../../demo/styles/ListScreenStyle';
import ClueListItem from './components/ClueListItem';
import DropdownMenu from '../../demo/screens/components/DropdownMenu';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

class CluesScreen extends React.Component {
    constructor(props) {
        super(props);

         this._dataSource = new ListView.DataSource({
           rowHasChanged: (r1, r2) => r1 !== r2
         });

        const dataList = [];

        this.state = {
            first: true,
            dataList: dataList,
            dataSource: this._dataSource.cloneWithRows(dataList)
        };

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        switch (event.id) {
          case 'create':
          this.props.navigator.push({
              screen: 'application.CreateClueScreen',
              title: '创建线索'
            });
           break;
          case 'search':
            break;
        default:
            this.props.navigator.push({
              screen: 'application.CreateClueScreen',
              title: '创建线索'
            });
        }
    }

    navigateToDetail = (event, rowData) => {
        this.props.navigator.push({
            screen: 'application.ClueDetailScreen',
            title: rowData.text,
            passProps: {}
        });
    }

    componentDidMount() {
     this._pullToRefreshListView.beginRefresh();
    }

   _renderRow = (rowData, sectionID, rowID) => {
        return (
            <View style={styles.thumbnail}>
                <ClueListItem style={styles.textContainer} text={rowData.text} onPressEvent={event => this.navigateToDetail(event, rowData)}/>
            </View>
        );
    }

    _renderHeader = (viewState) => {
        const {pullState} = viewState;
        let {pullDistancePercent} = viewState;
        const {refreshNone, refreshIdle, willRefresh, refreshing} = PullToRefreshListView.constants.viewState;
        pullDistancePercent = Math.round(pullDistancePercent * 100);
        switch (pullState) {
            case refreshNone:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink'}}>
                        <Text>pull down to refresh</Text>
                    </View>
                );
            case refreshIdle:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink'}}>
                        <Text>pull down to refresh{pullDistancePercent}%</Text>
                    </View>
                );
            case willRefresh:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink'}}>
                        <Text>release to refresh{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
                    </View>
                );
            case refreshing:
                return (
                    <View style={{flexDirection: 'row', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink'}}>
                        {this._renderActivityIndicator()}<Text>refreshing</Text>
                    </View>
                );
            default:
                return (<View />);
        }
    }

    _renderFooter = (viewState) => {
        const {pullState} = viewState;
        let {pullDistancePercent} = viewState;
        const {loadMoreNone, loadMoreIdle, willLoadMore, loadingMore, loadedAll} = PullToRefreshListView.constants.viewState;
        pullDistancePercent = Math.round(pullDistancePercent * 100);
        switch (pullState) {
            case loadMoreNone:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink'}}>
                        <Text>pull up to load more</Text>
                    </View>
                );
            case loadMoreIdle:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink'}}>
                        <Text>pull up to load more{pullDistancePercent}%</Text>
                    </View>
                );
            case willLoadMore:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink'}}>
                        <Text>release to load more{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
                    </View>
                );
            case loadingMore:
                return (
                    <View style={{flexDirection: 'row', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink'}}>
                        {this._renderActivityIndicator()}<Text>loading</Text>
                    </View>
                );
            case loadedAll:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink'}}>
                        <Text>no more</Text>
                    </View>
                );
            default:
                return (<View />);
        }
    }

    _onRefresh = () => {
        //console.log('outside _onRefresh start...')

        //simulate request data
        setTimeout(() => {
            //console.log('outside _onRefresh end...')
            const addNum = 20;
            const refreshedDataList = [];
            for (let i = 0; i < addNum; i++) {
                refreshedDataList.push({
                    text: `购车询价-${i}`
                });
            }

            this.setState({
                dataList: refreshedDataList,
                dataSource: this._dataSource.cloneWithRows(refreshedDataList)
            });
            this._pullToRefreshListView.endRefresh();
        }, 3000);
    }

    _onLoadMore = () => {
        //console.log('outside _onLoadMore start...')

        setTimeout(() => {
            const length = this.state.dataList.length;
            let addNum = 20;
            const addedDataList = [];
            if (length >= 100) {
                addNum = 3;
            }
            for (let i = length; i < length + addNum; i++) {
                addedDataList.push({
                    text: `购车询价-${i}`
                });
            }
            const newDataList = this.state.dataList.concat(addedDataList);
            this.setState({
                dataList: newDataList,
                dataSource: this._dataSource.cloneWithRows(newDataList)
            });

            let loadedAll;
            if (length >= 100) {
                loadedAll = true;
                this._pullToRefreshListView.endLoadMore(loadedAll);
            } else {
                loadedAll = false;
                this._pullToRefreshListView.endLoadMore(loadedAll);
            }
        }, 3000);
    }

    _renderActivityIndicator() {
        return ActivityIndicator
        ? (
            <ActivityIndicator
                style={{marginRight: 10}}
                animating={true}
                color={'#ff0000'}
                size={'small'}/>
        )
        : Platform.OS === 'android'
        ? (
            <ActivityIndicator
                style={{marginRight: 10}}
                color={'#ff0000'}
                styleAttr={'Small'}/>

        )
        : (
            <ActivityIndicatorIOS
                style={{marginRight: 10}}
                animating={true}
                color={'#ff0000'}
                size={'small'}/>
        );
    }

    render() {
         const data = [["线索来源", "微信", "网络"], ["创建时间", "2017", "2016", "2015"], ["线索等级", "A级", "B级", "C级", "D级"]];
       
        return (<View
                      style={ styles.container }
                      keyboardShouldPersistTaps="always">
                   <DropdownMenu
                            style={ { flex: 1 } }
                            arrowImg={ require('../../../img/dropdown_arrow.png') }
                            checkImage={ require('../../../img/menu_check.png') }
                            bgColor={ "white" }
                            tintColor={ "gray" }
                            selectItemColor={ "gray" }
                            data={ data }
                            maxHeight={ 410 }
                            handler={ (selection, row) => alert(data[selection][row]) }>
                     <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } } />
                   </DropdownMenu>

                   <PullToRefreshListView
                      ref={(component) => this._pullToRefreshListView = component}
                      viewType={PullToRefreshListView.constants.viewType.listView}
                      style={styles.container}
                      initialListSize={20}
                      enableEmptySections={true}
                      dataSource={this.state.dataSource}
                      pageSize={20}
                      renderRow={this._renderRow}
                      renderHeader={this._renderHeader}
                      renderFooter={this._renderFooter}
                      //renderSeparator={(sectionID, rowID) => <View style={styles.separator} />}
                      onRefresh={this._onRefresh}
                      onLoadMore={this._onLoadMore}
                      pullUpDistance={35}
                      pullUpStayDistance={50}
                      pullDownDistance={35}
                      pullDownStayDistance={50}
                  />
                </View>);
    }
}

export default connect()(CluesScreen);
