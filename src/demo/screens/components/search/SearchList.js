import { View, Text, StyleSheet, ListView, PixelRatio, Platform, Dimensions, Animated, TextInput, UIManager } from 'react-native';

const {State: TextInputState} = TextInput;

import React, { Component } from 'react';

import { sTrim } from '../../validator/Validator';
import ReactNative from 'react-native';
import CustomSearchBar from './CustomSearchBar';
import CustomTouchable from './CustomTouchable';

const statusBarSize = Platform.OS === 'ios' ? 10 : 0;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const searchBarHeight = 0;
const topOffset = 0;
const defaultCellHeight = 0;

export default class SearchList extends Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired,
        renderRow: React.PropTypes.func.isRequired,
        cellHeight: React.PropTypes.number.isRequired,
        topOffset: React.PropTypes.number,
        searchBarBgColor: React.PropTypes.string,
        title: React.PropTypes.string,
        textColor: React.PropTypes.string,
        cancelTitle: React.PropTypes.string,

        sortFunc: React.PropTypes.func,
        resultSortFunc: React.PropTypes.func,
        renderSeparator: React.PropTypes.func,
        onClickBack: React.PropTypes.func,
        showActiveSearchIcon: React.PropTypes.bool,
        onHideNavTabBar: React.PropTypes.func,
        onShowNavTabBar: React.PropTypes.func
    }

    static getRowData(dataBlob, sectionID, rowID) {
        return dataBlob[sectionID + ':' + rowID];
    }

    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
            isEmpty: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => {
                    if (row1 !== row2) {
                        return true;
                    } else if (row1 && row2 && row1.macher && row2.macher) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }),
            _navBarAnimatedValue: new Animated.Value(0),
            _searchBarAnimatedValue: new Animated.Value(searchBarHeight)
        };
        this.navBarYOffset = 2 * statusBarSize;
        this.searchBarHeightPlus = 10;
        this.searchStr = '';
        this.rowIDs = [[]];
        this.tmpSource = [];
    }

    componentDidMount() {
        this.tmpSource = Array.from(this.props.data ? this.props.data : []);
        this.parseList(this.tmpSource);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && this.props.data !== nextProps.data) {
            this.tmpSource = Array.from(nextProps.data);
            this.initList(this.tmpSource);
        }
    }

    orderResultList(searchResultList) {
        if (!searchResultList) {
            this.setState({
                isEmpty: true,
                isSearching: true
            });
            return;
        }

        this.setState({
            isEmpty: false,
            isSearching: true,
            dataSource: this.state.dataSource.cloneWithRows(searchResultList)
        });
    }
    onFocus() {
        if (!this.state.isSearching) {
            this.hideBar();
            this.props.onHideNavTabBar();
        }
    }
    generateMacherInto(source, item, inputLower, transStr, charIndexer) {
        const result = {};
        Object.assign(result, item);
        if (source) {
            const macher = {};
            macher.matches = [];
            if (source.toLowerCase().indexOf(inputLower) >= 0) {
                macher.machStart = source.toLowerCase().indexOf(inputLower);
                macher.machEnd = macher.machStart + inputLower.length;

                macher.matches.push({
                    start: macher.machStart,
                    end: macher.machEnd
                });
                result.macher = macher;
            } else {
                if (transStr && charIndexer) {
                    const inputStartIndex = transStr.indexOf(inputLower);
                    if (inputStartIndex >= 0) {
                        for (let i = 0; i < charIndexer.length; i++) {
                            const startCharIndexer = charIndexer[i];

                            if (startCharIndexer) {
                                if (startCharIndexer.startIndexInTransedStr === inputStartIndex) {
                                    const inputEndIndex = inputStartIndex + inputLower.length - 1;
                                    let find = false;
                                    for (let j = i; j < charIndexer.length; j++) {
                                        const endCharIndexer = charIndexer[j];

                                        if (inputEndIndex <= endCharIndexer.endIndexInTransedStr) {
                                            find = true;
                                            macher.machStart = startCharIndexer.index;
                                            macher.machEnd = endCharIndexer.index + 1;
                                            macher.matches.push({
                                                start: macher.machStart,
                                                end: macher.machEnd
                                            });
                                            result.macher = macher;
                                            break;
                                        }
                                    }

                                    if (find) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return result;
    }

    renderFooter() {
        return <View style={ styles.scrollSpinner } />;
    }

    renderRow(item,
        sectionID,
        rowID,
        highlightRowFunc) {
        if (this.props.renderRow) {
            return this.props.renderRow(item, sectionID, rowID, highlightRowFunc, this.state.isSearching);
        } else {
            return <View style={ { flex: 1, height: this.props.cellHeight || defaultCellHeight } }>
                     <Text>
                       { item && item.searchStr ? item.searchStr : '' }
                     </Text>
                   </View>;
        }
    }

    onBlur() {
        // this.cancelSearch()
    }

    onClickBack() {
        this.props.onClickBack && this.props.onClickBack();
    }

    onClickCancel() {
        this.search('');
        this.showBar();
        this.props.onShowNavTabBar();
    }
    search(input) {
        if (!this.tmpSource) {
            return;
        }
        this.searchStr = input;
        if (input) {
            const sInput = sTrim(input);
            const inputLower = sInput.toLowerCase();
            const tempResult = [];

            this.tmpSource.forEach((item, idx, array) => {
                if (item) {
                    if (item.searchStr) {
                        const searchHandler = item.searchHandler;
                        const result = this.generateMacherInto(item.searchStr, item, inputLower, searchHandler ? searchHandler.translatedStr : '', searchHandler ? searchHandler.charIndexerArr : []);
                        if (result.macher) {
                            tempResult.push(result);
                        }
                    }
                }
            });
            if (tempResult.length === 0) {
                this.setState({
                    isEmpty: true,
                    isSearching: true
                });
            } else {
                this.orderResultList(tempResult);
            }
        } else {
            this.parseList(this.tmpSource);
        }
    }
    parseList(srcList) {
        if (!srcList) {
            return;
        }

        this.setState({
            isSearching: false,
            dataSource: this.state.dataSource.cloneWithRows(srcList)
        //dataSource: this.state.dataSource.cloneWithRowsAndSections(friendWithSection, (this.sectionIDs || this.sectionIDs.length === 0) ? [''] : this.sectionIDs, this.rowIds)
        });
    }
    cancelSearch() {
        this.refs.searchBar && this.refs.searchBar.cancelSearch && this.refs.searchBar.cancelSearch();
    }

    showBar() {
        this.setState({
            isSearching: false,
            isEmpty: false
        });

        TextInputState.blurTextInput(TextInputState.currentlyFocusedField());

        this.state._navBarAnimatedValue.setValue(-1 * this.navBarYOffset);
        //this.state._searchBarAnimatedValue.setValue(this.searchBarHeightPlus + searchBarHeight)
        this.state._searchBarAnimatedValue.setValue(searchBarHeight);
        Animated.parallel([
            Animated.timing(this.state._navBarAnimatedValue, {
                duration: 300,
                toValue: 0
            }),
            Animated.timing(this.state._searchBarAnimatedValue, {
                duration: 300,
                toValue: searchBarHeight
            })
        ]).start();
    }

    hideBar() {
        this.setState({
            isSearching: true
        });
        this.state._navBarAnimatedValue.setValue(0);
        this.state._searchBarAnimatedValue.setValue(searchBarHeight);
        Animated.parallel([
            /*Animated.timing(this.state._navBarAnimatedValue, {
              duration: 300,
              toValue: -1 * this.navBarYOffset
            })*/
            Animated.timing(this.state._searchBarAnimatedValue, {
                duration: 300,
                toValue: this.searchBarHeightPlus + searchBarHeight
            })
        ]).start();
    }
    renderSeparator(sectionID,
        rowID,
        adjacentRowHighlighted) {
        if (this.props.renderSeparator) {
            return this.props.renderSeparator(sectionID, rowID, adjacentRowHighlighted);
        } else {
            let style = styles.rowSeparator;
            if (adjacentRowHighlighted) {
                style = [style, styles.rowSeparatorHide];
            }
            return (
                <View
                      key={ 'SEP_' + sectionID + '_' + rowID }
                      style={ style }>
                  <View style={ { height: 1 / PixelRatio.get(), backgroundColor: '#efefef' } } />
                </View>
                );
        }
    }
    render() {
        let mask = null;
        if (this.state.isSearching && !this.searchStr) {
            mask = <CustomTouchable
                                    onPress={ this.cancelSearch.bind(this) }
                                    underlayColor="rgba(0, 0, 0, 0.0)"
                                    style={ styles.maskStyle }>
                     <View style={ styles.maskStyle } />
                   </CustomTouchable>;
        }

        return (
            <View
                  ref="view"
                  style={ [{ top: this.props.topOffset ? this.props.topOffset : topOffset, height: deviceHeight + 64, width: deviceWidth, backgroundColor: '#efefef' }, this.props.style] }>
              <Animated.View style={ { flex: 1, transform: [{ translateY: this.state._navBarAnimatedValue }] } }>
                <Animated.View style={ { backgroundColor: this.props.searchBarBgColor ? this.props.searchBarBgColor : '#a09a9a', paddingTop: this.state._searchBarAnimatedValue } }>
                  <CustomSearchBar
                                   placeholder={ this.props.searchPlaceHolder ? this.props.searchPlaceHolder : '' }
                                   onChange={ this.search.bind(this) }
                                   onFocus={ this.onFocus.bind(this) }
                                   onBlur={ this.onBlur.bind(this) }
                                   onClickCancel={ this.onClickCancel.bind(this) }
                                   cancelTitle={ this.props.cancelTitle }
                                   textColor={ this.props.textColor }
                                   customSearchBarStyle={ this.props.customSearchBarStyle }
                                   activeSearchBarColor={ this.props.activeSearchBarColor }
                                   showActiveSearchIcon={ this.props.showActiveSearchIcon }
                                   searchBarActiveColor={ this.props.searchBarActiveColor }
                                   ref="searchBar" />
                </Animated.View>
                <View style={ styles.listContainer }>
                  { this.state.isSearching && this.state.isEmpty && this.props.emptyContent ? this.props.emptyContent(this.searchStr)
                    : <ListView
                                ref="searchListView"
                                dataSource={ this.state.dataSource }
                                renderRow={ this.renderRow.bind(this) }
                                keyboardDismissMode="on-drag"
                                keyboardShouldPersistTaps="always"
                                showsVerticalScrollIndicator={ true }
                                renderFooter={ this.props.renderFooter ? this.props.renderFooter : this.renderFooter.bind(this) }
                                enableEmptySections={ true } /> }
                </View>
              </Animated.View>
              { mask }
            </View>
            );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    rowSeparator: {
        backgroundColor: '#fff',
        paddingLeft: 25
    },
    rowSeparatorHide: {
        opacity: 0.0
    },
    maskStyle: {
        position: 'absolute',
        top: -50,
        bottom: 0,
        left: 0,
        right: 0,
        height: deviceHeight + 164,
        width: deviceWidth,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 999
    },
    scrollSpinner: {
        marginVertical: 40
    }
});
