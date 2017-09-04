import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Button, AppRegistry, ScrollView, TouchableOpacity, Alert, AlertIOS, Platform } from 'react-native';
import MenuList from './components/MenuList';

const data = {
    Language: {
        "All": ["All"],
        'Web Front End': [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        "Server": [
            "Node.js",
            "PHP",
            "Python",
            "Ruby"
        ]
    },
    Tool: {
        All: ["All"],
        Apple: ["Xcode"],
        Other: ["Sublime Text", "WebStrom"]
    }
};

class TabMenuScreen extends Component {
    onPress = (val) => {
        Platform.OS === "android" ? Alert.alert(val) : AlertIOS.alert(val);
    }
    render() {
        return (
            <View style={ styles.container }>
              <MenuList
                        data={ data }
                        nSelected={ 1 }
                        tabSelected={ 0 }
                        click={ this.onPress } />
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default TabMenuScreen;
