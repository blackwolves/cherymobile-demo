import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Label from './Label';
import _ from 'lodash';

class HomeItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<TouchableHighlight
                                    style={ styles.touchable }
                                    onPress={ this.props.onPressEvent }>
                  <View style={ [styles.base, styles.container] }>
                    <View style={ styles.leftContainer }>
                      <Icon
                            name={ this.props.iconName ? this.props.iconName : "cloud" }
                            size={ 20 }
                            style={ styles.icon } />
                      <Text style={ styles.title }>
                        { this.props.text }
                      </Text>
                    </View>
                    <View style={ [styles.base, styles.rightContainer] }>
                      <Text style={ styles.textNumber }>
                        { this.props.level }
                      </Text>
                      <Icon
                            name="angle-right"
                            size={ 20 }
                            backgroundColor="transparent"
                            color="#9E9E9E" />
                    </View>
                  </View>
                </TouchableHighlight>);
    }
}

const styles = StyleSheet.create({
    touchable: {
        height: 62,
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ecf0f1'
    },
    icon: {
        backgroundColor: '#c0392b',
        padding: 10,
        color: 'white',
        marginLeft: 10,
        borderRadius: 50
    },
    base: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    container: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5
    },
    leftContainer: {
        width: '80%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    rightContainer: {
        width: '20%',
        justifyContent: 'flex-end'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 20
    },
    textNumber: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 20
    }
});

export default HomeItem;
