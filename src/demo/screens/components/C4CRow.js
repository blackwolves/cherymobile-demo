import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableHighlight, Platform, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

function C4CRow({title, onPress}) {
    return (
        <TouchableHighlight
                            onPress={ onPress }
                            underlayColor={ 'rgba(0, 0, 0, 0.054)' }>
          <View style={ styles.row }>
            <Text style={ styles.text }>
              { title }
            </Text>
          </View>
        </TouchableHighlight>
        );
}

C4CRow.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    type: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    row: {
        height: 68,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)'
    },
    text: {
        fontSize: 16
    }
});

export default C4CRow;
