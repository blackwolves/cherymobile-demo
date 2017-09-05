import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ClueListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={ { padding: 20, flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 10 } }>
                  <View style={ { width: '80%' } }>
                    <Text>
                      { this.props.text }
                    </Text>
                    <Text>
                      测试
                    </Text>
                  </View>
                  <View style={ { width: '20%', flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' } }>
                    <View>
                      <Text>
                        C级
                      </Text>
                      <Text>
                        待跟进
                      </Text>
                    </View>
                    <Icon.Button
                                 name="chevron-right"
                                 backgroundColor="transparent"
                                 color="gray"
                                 onPress={ this.props.onPressEvent } />
                  </View>
                </View>);
    }
}
export default ClueListItem;
