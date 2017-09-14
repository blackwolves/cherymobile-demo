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
        const Checked = [];
        const i = 3;
        let j = 0;
        while (j < i) {
            Checked.push(false);
            j++;
        }
        this.state = {
            dataSource: ds,
            data: ['王先生', '张小姐', '欧阳女士'],
            isChecked: Checked,
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
        alert("next");
    };
    onClick = (rowId) => {
        const Checked = this.state.isChecked;
        Checked[rowId] = !Checked[rowId];
        this.setState({
            isChecked: Checked
        });
        this.updateNum();
    };

    updateNum = () => {
        const Checked = this.state.isChecked;
        let num = 0;
        Checked.forEach(function(e) {
            if (e === true) {
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
                        dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
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
                isChecked={this.state.isChecked[rowId]}
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
                {this._renderCustomer(rowData)}
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
