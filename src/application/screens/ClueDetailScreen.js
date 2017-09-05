import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

class ClueDetailScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<View
                      style={ styles.container }
                      keyboardShouldPersistTaps="always">
                  <Text>
                    线索详情
                  </Text>
                </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ClueDetailScreen;