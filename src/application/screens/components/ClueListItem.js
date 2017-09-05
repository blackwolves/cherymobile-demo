import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

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
                    <Button
                            onPress={ this.props.onPressEvent }
                            title="More" />
                  </View>
                </View>);
    }
}
export default ClueListItem;
