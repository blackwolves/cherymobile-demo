import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class RightArrow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Icon.Button
                             name="chevron-right"
                             backgroundColor="transparent"
                             color="gray"
                             onPress={ this.props.onPressEvent }>
                  请选择
                </Icon.Button>);
    }
}
export default RightArrow;
