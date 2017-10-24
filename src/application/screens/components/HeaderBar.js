import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<View style={ styles.container }>
                  <View style={ styles.headerBarContainer }>
                    <Icon
                          name={ this.props.iconName ? this.props.iconName : "search" }
                          size={ 20 }
                          style={ styles.icon }
                          onPress={ this.props.onSearch } />
                    <Text style={ styles.headerText }>
                      { this.props.headerTitle }
                    </Text>
                    <Text
                          style={ styles.headerButton }
                          onPress={ this.props.onPressEvent }>
                      { this.props.buttonName }
                    </Text>
                  </View>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 52,
        backgroundColor: '#E1E1E1'
    },
    headerBarContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    headerButton: {
        padding: 14,
        color: 'black',
        fontSize: 14
    },
    headerText: {
        padding: 12,
        color: 'black',
        fontSize: 20
    },
    icon: {
        backgroundColor: 'white',
        padding: 14,
        color: 'black',
        borderRadius: 50
    }
});

export default HeaderBar;
