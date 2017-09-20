import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ListView,
    TextInput
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Communications from 'react-native-communications';

class SendMessageScreen extends React.Component {
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
                title: '发送',
                id: 'send',
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
            data: [{
                message: '尊敬的王先生，我是奇瑞xx店销售顾问张三，根据您的需求，我店欢迎您前来店里进一步体验咨询。',
                isChecked: false
            }, {
                message: "尊敬的王先生，我是奇瑞xx店销售顾问张三，根据您的需求，我店欢迎您前来店里进一步体验咨询。请问你有时间吗，我这里只是写一个测试，让他比三行代码多一些",
                isChecked: false
            }],
            text: ''
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        switch (event.id) {
            case 'send':
                this.sendMessage();
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

    sendMessage = () => {
        let message;
        this.state.data.forEach((e) => {
                if (e.isChecked === true) {
                    message = e.message;
                }
            }
        );
        Communications.text(this.props.phone.toString(), message);
    };
    onClick = (rowId) => {
        const data = this.state.data;
        const flag = data[rowId].isChecked;
        let temp = 0;
        while (temp < data.length) {
            data[temp].isChecked = false;
            temp++;
        }
        if (flag === false) {
            data[rowId].isChecked = true;
        }
        this.setState({
            data: data
        });
    };

    addMessageModel() {
        const data = this.state.data;
        data.push({
            message: this.state.text,
            isChecked: false
        });
        this.setState({
            data: data
        });
        this.setState({
            text: ''
        });
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                        renderRow={(rowData, sectionId, rowId) => this._renderRow(rowData, sectionId, rowId)}/>
                </View>

                <View>
                    <View style={styles.textInput}>
                        <TextInput
                            multiline={true}
                            underlineColorAndroid={'white'}
                            placeholder="新短息模板"
                            onEndEditing={() => this.addMessageModel()}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }

    _renderRow(rowData, sectionId, rowId) {
        const message = "短息内容：" + rowData.message;
        const template = "短息模板" + (Number(rowId) + 1).toString();
        return (
            <View style={{
                borderBottomWidth: 10,
                borderBottomColor: 'whitesmoke'
            }}>
                <View style={styles.template}>
                    <Text style={{fontSize: 15}}>{template}</Text>
                    <CheckBox
                        onClick={() => this.onClick(rowId)}
                        style={styles.checkbox}
                        isChecked={this.state.data[rowId].isChecked}
                    />
                </View>
                <View style={styles.message}>
                    <Text
                        numberOfLines={3}
                        style={{fontSize: 15}}>{message}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    checkbox: {
        marginTop: 5
    },
    template: {
        backgroundColor: 'white',
        height: 50,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)'
    },
    message: {
        backgroundColor: 'white',
        height: 70,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)'
    },
    textInput: {
        backgroundColor: 'white',
        height: 50,
        paddingHorizontal: 16
    }
});
export default SendMessageScreen;
