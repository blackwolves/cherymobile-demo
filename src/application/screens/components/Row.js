import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform, Image} from 'react-native';

function Row({title, onPress, platform, testID}) {
    if (platform && platform !== Platform.OS) {
        return <View />;
    }

    return (
        <TouchableHighlight
            onPress={onPress}
            testID={testID}
            underlayColor={'rgba(0, 0, 0, 0.054)'}
        >
            <View style={styles.row}>
                <Text style={styles.text}>{title}</Text>
                <Image source={require('../../../../img/icon-back.png')}
                       style={{height: 16, width: 16, transform: [{rotate: '180deg'}]}}/>
            </View>
        </TouchableHighlight>
    );
}

Row.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func
};

const styles = StyleSheet.create({
    row: {
        height: 50,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)'
    },
    text: {
        fontSize: 16
    }
});

export default Row;
