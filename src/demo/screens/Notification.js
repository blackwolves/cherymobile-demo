import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button} from 'react-native';

class Notification extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>In-App Notification</Text>
        <Text style={styles.content}>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#ff505c',
    padding: 16,
    margin: 10
  },
  title: {
    fontSize: 18,
    textAlign: 'center'
  },
  content: {
    textAlign: 'center',
    marginTop: 10
  }
});

export default Notification;
