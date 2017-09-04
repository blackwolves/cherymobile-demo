import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

class CollapsingHeader extends React.Component {
    static navigatorStyle = {
        drawUnderTabBar: true,
        collapsingToolBarImage: require('../../../img/bmw.jpg'), //Android only
        collapsingToolBarCollapsedColor: '#0f2362' //Android only
    };

    render() {
        return (
            <ScrollView style={ styles.container }>
              <View>
                { [...new Array(40)].map((a, index) => (
                      <Text
                            key={ `row_${index}` }
                            style={ styles.button }>
                        Row
                        { index }
                      </Text>
                  )) }
              </View>
            </ScrollView>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    button: {
        fontSize: 16
    }
});

export default CollapsingHeader;
