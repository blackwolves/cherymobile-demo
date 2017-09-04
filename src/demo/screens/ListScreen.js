import React, {Component} from 'react';
import {
  View,
    Text,
    Alert,
    ScrollView,
    ListView,
    Image,
    ActivityIndicator,
    ActivityIndicatorIOS,
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import styles from '../styles/ListScreenStyle';

import TimerEnhance from 'react-native-smart-timer-enhance';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';

class ListScreen extends Component {
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
  }
   componentDidMount() {
     this._pullToRefreshListView.beginRefresh();
   }
   _renderRow = (rowData, sectionID, rowID) => {
        return (
            <View style={styles.thumbnail}>
                <View style={styles.textContainer}>
                    <Text>{rowData.text}</Text>
                </View>
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
                    text: `item-${i}`
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
                    text: `item-${i}`
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
    return (
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
    );
  }
}

export default connect()(ListScreen);
