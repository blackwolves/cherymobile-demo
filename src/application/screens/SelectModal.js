import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

class SelectModal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<View
                      style={ styles.container }
                      keyboardShouldPersistTaps="always">
                  <Text>
                    选择界面
                  </Text>
                </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white'
    }
});

export default SelectModal;
