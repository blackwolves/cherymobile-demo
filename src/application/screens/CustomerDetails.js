import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    StyleSheet,
    Linking,
    ListView,
    Alert
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ClueListItem from './components/ClueListItem';
import {TableView, CellItem} from './components/tableview';
import RightArrow from './components/RightArrow';
import styles from '../styles/ListScreenStyle';
import {connect} from 'react-redux';
import {List, ListItem} from './components/List';

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
        const _dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        const dataList = [];
        const addNum = 10;
        for (let i = 0; i < addNum; i++) {
            dataList.push({
                key: `${i}`,
                text: `购车询价-${i}`,
                labels: [{text: "新增"}, {text: "多次到店"}],
                level: "C级",
                status: "待跟进"
            });
        }
        this.state = {
            dataList: dataList,
            dataSource: _dataSource.cloneWithRows(dataList)
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.name = this.props.rowData;
        this._renderRow = this._renderRow.bind(this);
        this._renderCusProfile = this._renderCusProfile.bind(this);
        this.navigateToDetail = this.navigateToDetail.bind(this);
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

    callCustomer(){
        Linking.openURL('tel:18280014326')
            .catch(err => {
                console.log(err);
            });
    };

    sendMessage(){
        Linking.openURL('sms:+19725551212?body=hello%20there')
            .catch(err => {
                console.log(err);
            });
    }

    navigateToDetail(event, rowData) {
        this.props.navigator.push({
            screen: 'application.ClueDetailScreen',
            title: rowData.text,
            passProps: {}
        });
    };

    handlePress(){
        Alert.alert('you have just press the '+ this.props.label);
    }

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
                      onPress={this.sendMessage}
                      style={{marginLeft: 50, marginTop: 5}}/>
                <Icon name="phone" size={30} color="darkorchid" backgroundColor="floralwhite"
                      onPress={this.callCustomer}
                      style={{marginLeft: 50, marginTop: 5}}/>
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <ClueListItem style={styles.textContainer} data={rowData} key={rowData.key}
                          onPressEvent={event => this.navigateToDetail(event, rowData)}/>
        );
    };

    _renderCusProfile() {
        return (
            <List>
                <ListItem type="Select" label="客户姓名" placeholder="王先生" icon="angle-right" onPress={this.handlePress}/>
                <ListItem type="Select" label="联系电话" placeholder="123456789" icon="angle-right" onPress={this.handlePress}/>
                <ListItem type="Select" label="性别" placeholder="男" icon="angle-right" onPress={this.handlePress}/>
                <ListItem type="Select" label="出生日期" placeholder="1993-2-3" icon="angle-right" onPress={this.handlePress}/>
                <ListItem type="Select" label="居住地址" placeholder="四川省成都市武侯区新华南路一号" icon="angle-right" onPress={this.handlePress}/>
                <ListItem type="Select" label="客户来源" placeholder="车站" icon="angle-right" onPress={this.handlePress}/>
                <ListItem type="Select" label="身份证号码" placeholder="暂无" icon="angle-right" onPress={this.handlePress}/>
                <ListItem type="Select" label="保有车型" placeholder="暂无" icon="angle-right" onPress={this.handlePress}/>
            </List>
        );
    }

    render() {
        return (
            <View style={{flexDirection:'column',flex:1}}>
                {this._renderUser()}
                <View style={{flex:1}}>
                    <ScrollableTabView
                        tabBarActiveTextColor="red"
                        tabBarUnderlineStyle={{backgroundColor: 'red'}}
                        initialPage={0}
                        renderTabBar={() => <DefaultTabBar textStyle={Styles.tabText}/>}>
                        <ScrollView
                            tabLabel="线索"
                            style={Styles.tabView}>
                            <ListView dataSource={this.state.dataSource}
                                      renderRow={this._renderRow}/>
                        </ScrollView>
                        <ScrollView
                            tabLabel="客户档案">
                            {this._renderCusProfile()}
                        </ScrollView>
                    </ScrollableTabView>                    
                </View>
            </View>
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

export default connect()(CustomerDetails);
