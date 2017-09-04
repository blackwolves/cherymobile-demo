import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button, ListView, Dimensions, Linking } from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
let callDetector = null;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

class ContactScreen extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataList: [],
            dataSource: ds,
            dialTime: 0,
            startDialTime: 0
        };
    }
    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <Text>
              { rowData.history }
            </Text>
            );
    }
    callFriendTapped = () => {
        const that = this;
        const aDataList = this.state.dataList;
        const dialTime = new Date().toLocaleString();
        callDetector = new CallDetectorManager((event) => {
            if (event === 'Disconnected') {
                alert(event);
                callDetector && callDetector.dispose();
                const dialConnectedTime = (new Date().getTime() - that.state.startDialTime) / 1000;
                //const startDialTimeString = new Date(that.state.startDialTime).toLocaleString();
                let message = "";
                if (that.state.startDialTime === 0)
                    message = "拨号时间:" + dialTime + ", 客户未接";
                else
                    message = "通话时间:" + dialTime + ", 共" + dialConnectedTime + "秒";

                aDataList.push({
                    history: message
                });
                that.setState({
                    dataList: aDataList,
                    startDialTime: 0
                });
            // Do something call got disconnected
            } else if (event === 'Connected') {
                alert(event);
                that.setState({
                    startDialTime: new Date().getTime()
                });
            // Do something call got connected
            // This clause will only be executed for iOS
            } else if (event === 'Incoming') {
                alert(event);

            // Do something call got incoming
            } else if (event === 'Dialing') {
                alert(event);
            // Do something call got dialing
            // This clause will only be executed for iOS
            } else if (event === 'Offhook') {
                alert(event);
            //Device call state: Off-hook. 
            // At least one call exists that is dialing,
            // active, or on hold, 
            // and no calls are ringing or waiting.
            // This clause will only be executed for Android
            }
        });
        Linking.openURL('tel:18280014326')
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        if (this.state.dataList && this.state.dataList.length > 0) {
            return (<View
                          style={ styles.container }
                          keyboardShouldPersistTaps="always">
                      <View style={ styles.headerContainer }>
                        <Button
                                onPress={ this.callFriendTapped.bind(this) }
                                title="18280014326"
                                color="#341584" />
                      </View>
                      <ListView
                                dataSource={ this.state.dataSource.cloneWithRows(this.state.dataList) }
                                renderRow={ this._renderRow.bind(this) } />
                    </View>
                );
        } else {
            return (<View
                          style={ styles.container }
                          keyboardShouldPersistTaps="always">
                      <View style={ styles.headerContainer }>
                        <Button
                                onPress={ this.callFriendTapped.bind(this) }
                                title="18280014326"
                                color="#341584" />
                      </View>
                    </View>);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        width: DEVICE_WIDTH,
        height: 100
    }
});

export default ContactScreen;
