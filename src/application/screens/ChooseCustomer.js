import React from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, ListView} from 'react-native';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';

class ChooseCustomer extends React.Component {
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../../../img/icon-back.png'),
                title: 'back',
                id: 'back'

            }
        ],
        rightButtons: [
            {
                title: '下一步',
                id: 'next',
                buttonFontSize: 18,
                buttonFontWeight: '800'
            }
        ]
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds,
            customer: [{
                name: "李红",
                sex: '女士',
                tel: "12345678901",
                model: '瑞虎7 1.5T 手动耀尊版',
                type: '询价',
                date: '2017.03.22',
                status: '未联系',
                isChecked: false
            }, {
                name: "李佳",
                sex: '先生',
                tel: "18280014326",
                model: '瑞虎5 1.5T CVT尊贵版',
                type: '询价',
                date: '2017.03.19',
                status: '未联系',
                isChecked: false
            }],
            num: 0
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        switch (event.id) {
            case 'next':
                this.nextStep();
                break;
            case 'back':
                this.popScreen();
                break;
            default:
                break;
        }
    }

    popScreen = () => {
        this.props.navigator.pop();
    };
    CustomerDetails = () => {
        alert("Succeed");
    };

    nextStep = () => {
        const phone = [];
        for (let i = 0; i < this.state.customer.length; i++) {
            if (this.state.customer[i].isChecked === true) {
                phone.push(this.state.customer[i].tel);
            }
        }
        this.props.navigator.push({
            screen: 'application.SendMessageScreen',
            title: '发短信给客户',
            passProps: {phone},
            navigatorStyle: {
                tabBarHidden: true,
                navBarBackgroundColor: 'white',
                tabBarBackgroundColor: 'white',
                navBarTitleTextCentered: true
            }
        });
    };

    onClick = (rowId) => {
        const customer = this.state.customer;
        customer[rowId].isChecked = !customer[rowId].isChecked;
        this.setState({
            customer: customer
        });
        this.updateNum();
    };

    updateNum = () => {
        const customer = this.state.customer;
        let num = 0;
        customer.forEach(function(e) {
            if (e.isChecked === true) {
                num++;
            }
        });
        this.setState({
            num: num
        });
    };

    render() {
        return (
            <ScrollView>
                <View
                    style={styles.herder}>
                    <Text
                        style={{marginLeft: 10}}>已选择{this.state.num}人
                    </Text>
                </View>
                <View>
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(this.state.customer)}
                        renderRow={(rowData, sectionId, rowId) => this._renderRow(rowData, sectionId, rowId)}/>
                </View>
            </ScrollView>
        );
    }

    _renderCheckBox(rowId) {
        return (
            <CheckBox
                style={styles.checkbox}
                onClick={() => this.onClick(rowId)}
                isChecked={this.state.customer[rowId].isChecked}
            />);
    }

    _renderCustomer(rowData) {
        return (
            <View style={styles.customer}>
                <Icon name="user-circle" size={50} color="red" style={{marginLeft: 10, marginTop: 5}}/>
                <Text style={styles.nameText}>{rowData}</Text>
            </View>
        );
    }

    _renderRow(rowData, sectionId, rowId) {
        return (
            <TouchableOpacity activeOpacity={0.5} style={styles.row} onPress={() => this.onClick(rowId)}>
                {this._renderCustomer(rowData.name)}
                {this._renderCheckBox(rowId)}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    herder: {
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
        height: 50,
        backgroundColor: 'white'
    },
    checkbox: {
        marginRight: 10,
        marginTop: 5
    },
    customer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        marginLeft: 10,
        fontSize: 16
    },
    row: {
        borderBottomWidth: 10,
        borderBottomColor: 'whitesmoke',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80
    }
});
export default ChooseCustomer;
