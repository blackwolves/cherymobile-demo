import React from 'react';
import {View, Text, TouchableOpacity, ListView, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class CustomerListScreen extends React.Component {
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../../../img/icon-search.png'),
                title: 'Search',
                id: 'search'
            }
        ],
        rightButtons: [
            {
                title: '创建',
                id: 'create',
                buttonFontSize: 18,
                buttonFontWeight: '800'
            }
        ]
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            data: ['王先生', '欧阳先生', '李先生', '欧小姐', '王先生', '王先生', '王先生', '王先生']
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        switch (event.id) {
            case 'search':
                this.searchCustomer();
                break;
            case 'create':
                this.createCustomer();
                break;
            default:
                break;
        }
    }

    CustomerDetails = (rowData) => {
        this.props.navigator.push({
            screen: 'application.CustomerDetails',
            title: rowData,
            passProps: {rowData},
            navigatorStyle: {
                tabBarHidden: true,
                navBarBackgroundColor: 'white',
                tabBarBackgroundColor: 'white',
                navBarTitleTextCentered: true
            }
        });
    };

    searchCustomer = () => {
        alert("search");
    };
    createCustomer = () => {
        alert("create");
    };

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                    renderRow={(rowData, sectionId, rowId) => this._renderRow(rowData, rowId)}/>
            </View>
        );
    }

    _renderRow(rowData, rowId) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.CustomerDetails(rowData)}>
                <View
                    style={Styles.row}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name="user-circle" size={50} color="firebrick" style={Styles.photo}/>
                        <Text style={Styles.nameText}>{rowData}</Text>
                    </View>
                    <Icon name="phone" size={30} color="black" style={Styles.phoneIcon}/>
                </View>
            </TouchableOpacity>
        );
    }
}

const Styles = StyleSheet.create({
    row: {
        borderBottomWidth: 10,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80
    },
    photo: {
        marginLeft: 10,
        marginTop: 5
    },
    nameText: {
        marginLeft: 10,
        fontSize: 16
    },
    phoneIcon: {
        marginRight: 10,
        marginTop: 5
    }
});

export default CustomerListScreen;
