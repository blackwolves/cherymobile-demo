import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

class CustomerListScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<View
                      style={ styles.container }
                      keyboardShouldPersistTaps="always">
                  <Text>
                    客户页面
                  </Text>
                </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default CustomerListScreen;
