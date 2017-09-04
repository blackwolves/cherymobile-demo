import { View, Text, ListView, PixelRatio, Platform, Dimensions, Animated, TextInput, UIManager } from 'react-native';
import React, { Component } from 'react';
import ReactNative from 'react-native';
import SearchList from './components/search/SearchList';
import SearchBar from 'react-native-searchbar';

const cellheight = 40;

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
        this._handleResults = this._handleResults.bind(this);
    }
    _handleResults(results) {
        this.setState({
            results
        });
    }
    onHideNavTabBar = () => {
        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: true
        });
        this.props.navigator.toggleTabs({
            to: 'hidden',
            animated: true
        });
    }
    onShowNavTabBar = () => {
        this.props.navigator.toggleNavBar({
            to: 'shown',
            animated: true
        });
        this.props.navigator.toggleTabs({
            to: 'shown',
            animated: true
        });
    }
    emptyContent(searchStr) {
        return (
            <View style={ { flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start', marginTop: 50 } }>
              <Text style={ { color: '#979797', fontSize: 18, paddingTop: 20 } }>
                No Result For
                <Text style={ { color: '#171a23', fontSize: 18 } }>
                  { searchStr }
                </Text>
              </Text>
              <Text style={ { color: '#979797', fontSize: 18, alignItems: 'center', paddingTop: 10 } }>
                Please search again
              </Text>
            </View>
            );
    }
    renderRow(item,
        sectionID,
        rowID,
        highlightRowFunc,
        isSearching) {
        return (
            <View
                  key={ rowID }
                  style={ { flex: 1, marginLeft: 40, height: cellheight, justifyContent: 'center' } }>
              <Text>
                { item.searchStr }
              </Text>
            </View>
            );
    }
    handleBackBtn = () => {
        this.props.navigator.dismissAllModals({
            animationType: 'slide-down'
        });
    }
    renderSearchbar = () => {
        const dataSource = [
            {
                searchStr: "Alpha_one"
            },
            {
                searchStr: 'Beta_one'
            },
            {
                searchStr: 'Alpha_second'
            },
            {
                searchStr: 'Charles_one'
            },
            {
                searchStr: 'Bob_second'
            },
            {
                searchStr: 'Charles_second'
            },
            {
                searchStr: 'Dog_one'
            },
            {
                searchStr: 'Dog_second'
            },
            {
                searchStr: '查理'
            },
            {
                searchStr: '皮特'
            },
            {
                searchStr: '道格拉斯'
            }];
        if (Platform.OS === 'android') {
            return (<SearchBar
                               ref={ (ref) => this.searchBar = ref }
                               data={ dataSource }
                               handleResults={ this._handleResults }
                               onBack={ this.handleBackBtn }
                               showOnLoad={ true } />);
        } else {
            return (<SearchList
                                data={ dataSource }
                                emptyContent={ this.emptyContent.bind(this) }
                                renderRow={ this.renderRow.bind(this) }
                                cellHeight={ cellheight }
                                showActiveSearchIcon={ true }
                                searchBarActiveColor="#a09a9a"
                                searchPlaceHolder="搜索"
                                onHideNavTabBar={ this.onHideNavTabBar }
                                onShowNavTabBar={ this.onShowNavTabBar }
                                hideSectionList={ true }
                                cancelTitle="取消" />);
        }
    }
    render() {
        //const dataSource = [];
        return (
            <View style={ { flex: 1, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'flex-start' } }>
              { this.renderSearchbar() }
            </View>
            );
    }
}
