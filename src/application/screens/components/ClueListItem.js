import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Label from './Label';
import _ from 'lodash';

class ClueListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    _createLabelList() {
        const data = this.props.data;
        let labelComponents = [];
        if (data.labels) {
            labelComponents = _.map(data.labels, function(rowData) {
                return (<Label
                               key={ rowData.key }
                               style={ { marginLeft: 10 } }
                               text={ rowData.text }
                               color={ _.isEqual(rowData.text, '新增') ? "#d50000" : "#64dd17" } />);
            });
        }
        return (<View style={ [styles.base, styles.labelsContainer] }>
                  { labelComponents }
                </View>);
    }

    render() {
        const lableList = this._createLabelList();
        return (<TouchableHighlight
                                    style={ styles.touchable }
                                    onPress={ this.props.onPressEvent }>
                  <View style={ [styles.base, styles.container] }>
                    <View style={ styles.leftContainer }>
                      <Text style={ styles.title }>
                        { this.props.data.text }
                      </Text>
                      { lableList }
                    </View>
                    <View style={ [styles.base, styles.rightContainer] }>
                      <View>
                        <Text style={ styles.title }>
                          { this.props.data.level }
                        </Text>
                        <Text style={ styles.statusStyle }>
                          { this.props.data.status }
                        </Text>
                      </View>
                      <Icon.Button
                                   name="angle-right"
                                   backgroundColor="transparent"
                                   color="#9E9E9E" />
                    </View>
                  </View>
                </TouchableHighlight>);
    }
}

const styles = StyleSheet.create({
    touchable: {
        width: '100%'
    },
    base: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    container: {
        padding: 10,
        backgroundColor: 'white'
    },
    labelsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 5
    },
    leftContainer: {
        width: '80%'
    },
    rightContainer: {
        width: '20%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14
    },
    statusStyle: {
        fontSize: 14,
        color: '#9E9E9E'
    }
});

export default ClueListItem;
