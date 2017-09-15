import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    StyleSheet,
    Linking,
    ListView
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ClueListItem from './components/ClueListItem';
import {TableView, CellItem} from './components/tableview';
import RightArrow from './components/RightArrow';
import styles from '../styles/ListScreenStyle';

const {width} = Dimensions.get('window');

class CustomerDetails extends React.Component {
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../../../img/icon-back.png'),
                title: 'back',
                id: 'back'

            }
        ]
    };

    constructor(props) {
        super(props);
        this._dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        const dataList = [];
        const addNum = 10;
        for (let i = 0; i < addNum; i++) {
            dataList.push({
                key: "${i}",
                text: `购车询价-${i}`,
                labels: [{text: "新增"}, {text: "多次到店"}],
                level: "C级",
                status: "待跟进"
            });
        }
        this.state = {
            dataList: dataList,
            dataSource: this._dataSource.cloneWithRows(dataList)
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.name = this.props.rowData;
    }

    onNavigatorEvent(event) {
        switch (event.id) {
            case 'back':
                this.popScreen();
                break;
            default:
                break;
        }
    }

    callCustomer = () => {
        Linking.openURL('tel:18280014326')
            .catch(err => {
                console.log(err);
            });
    };
    navigateToDetail = (event, rowData) => {
        this.props.navigator.push({
            screen: 'application.ClueDetailScreen',
            title: rowData.text,
            passProps: {}
        });
    };

    _renderUser() {
        return (
            <View
                style={Styles.userContainer}>
                <Icon name="user-circle" size={80} color="firebrick"/>
                <View
                    style={Styles.userInfo}>
                    <View>
                        <Text style={Styles.userName}>{this.name}</Text>
                    </View>
                    {this._renderIcon()}
                </View>
            </View>
        );
    }

    _renderIcon() {
        return (
            <View
                style={{
                    flexDirection: 'row'
                }}>
                <Icon name="wechat" size={30} color="green" backgroundColor="floralwhite"
                      onPress={this.callCustomer}
                      style={{marginTop: 5}}/>
                <Icon name="envelope" size={30} color="blue" backgroundColor="floralwhite"
                      onPress={this.callCustomer}
                      style={{marginLeft: 50, marginTop: 5}}/>
                <Icon name="phone" size={30} color="darkorchid" backgroundColor="floralwhite"
                      onPress={this.callCustomer}
                      style={{marginLeft: 50, marginTop: 5}}/>
            </View>
        );
    }

    render() {
        return (
            <ScrollView>
                {this._renderUser()}
                <ScrollableTabView
                    tabBarActiveTextColor="red"
                    tabBarUnderlineStyle={{backgroundColor: 'red'}}
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar textStyle={Styles.tabText}/>}>
                    <ScrollView
                        tabLabel="线索"
                        style={Styles.tabView}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}>
                        <ListView dataSource={this.state.dataSource}
                                  renderRow={this._renderRow}/>
                    </ScrollView>
                    <ScrollView
                        tabLabel="客户档案">
                        {this._renderCusProfile()}
                    </ScrollView>
                </ScrollableTabView>
            </ScrollView>
        );
    }

    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <View style={styles.thumbnail}>
                <ClueListItem style={styles.textContainer} data={rowData}
                              onPressEvent={event => this.navigateToDetail(event, rowData)}/>
            </View>
        );
    };

    _renderCusProfile() {
        return (
            <TableView>
                <CellItem>
                    <Text style={{flex: 1, fontSize: 16}}>
                        客户姓名
                    </Text>
                    <RightArrow onPressEvent={() => this.openSelectPanel('线索等级')}/>
                </CellItem>
                <CellItem>
                    <Text style={{flex: 1, fontSize: 16}}>
                        联系电话
                    </Text>
                    <RightArrow onPressEvent={() => this.openSelectPanel('线索来源')}/>
                </CellItem>
                <CellItem>
                    <Text style={{flex: 1, fontSize: 16}}>
                        性别
                    </Text>
                    <RightArrow onPressEvent={() => this.openSelectPanel('意向车型')}/>
                </CellItem>
                <CellItem>
                    <Text style={{flex: 1, fontSize: 16}}>
                        出生日期
                    </Text>
                    <RightArrow onPressEvent={() => this.openSelectPanel('付款方式')}/>
                </CellItem>
                <CellItem>
                    <Text style={{flex: 1, fontSize: 16}}>
                        居住地址
                    </Text>
                    <RightArrow onPressEvent={() => this.openSelectPanel('购车用途')}/>
                </CellItem>
                <CellItem>
                    <Text style={{flex: 1, fontSize: 16}}>
                        客户来源
                    </Text>
                    <RightArrow onPressEvent={() => this.openSelectPanel('购买类型')}/>
                </CellItem>
                <CellItem>
                    <Text style={{flex: 1, fontSize: 16}}>
                        身份证号码
                    </Text>
                    <RightArrow onPressEvent={() => this.openSelectPanel('购买类型')}/>
                </CellItem>
                <CellItem>
                    <Text style={{flex: 1, fontSize: 16}}>
                        保有车型
                    </Text>
                    <RightArrow onPressEvent={() => this.openSelectPanel('购买类型')}/>
                </CellItem>
            </TableView>
        );
    }
}

const Styles = StyleSheet.create({
    tabView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.01)'
    },
    tabText: {
        fontSize: 15
    },
    userContainer: {
        backgroundColor: 'blanchedalmond',
        flexDirection: 'row',
        height: 150,
        width: width,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    userInfo: {
        marginLeft: 15,
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    userName: {
        flexDirection: 'column',
        fontSize: 20
    }
});

export default CustomerDetails;
