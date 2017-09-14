import React from 'react';
import { StyleSheet, Text } from 'react-native';

class Label extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Text style={ [this.props.style, styles.container, { backgroundColor: this.props.color }] }>
                  { this.props.text }
                </Text>);
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        borderRadius: 12,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 3,
        paddingBottom: 3
    }
});

export default Label;
