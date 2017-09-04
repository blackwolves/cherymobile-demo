import React, { Component } from 'react';
import { Text, Image, Dimensions, View, ScrollView, TouchableOpacity, StyleSheet, ListView, ActivityIndicator, ActivityIndicatorIOS, Platform, TouchableWithoutFeedback, Alert, AlertIOS } from 'react-native';
import { connect } from 'react-redux';
import Row from '../components/Row';
import * as contactActions from '../../reducers/C4C/contact/actions';
import Swipeout from 'react-native-swipeout';
const DEVICE_WIDTH_HALF_POS = Dimensions.get(`window`).width / 2;
// this is a traditional React component connected to the redux store
class ContactScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            sectionID: null,
            rowID: null
        };
    }

    componentDidMount() {
        this.props.dispatch(contactActions.fetchData());
    }

    _renderActivityIndicator(bLoading) {
        if (bLoading) {
            return ActivityIndicator
                ? (
                <ActivityIndicator
                                   style={ { marginRight: 10, marginTop: 100 } }
                                   animating={ true }
                                   color={ '#ff0000' }
                                   size={ 'small' } />)
                : Platform.OS === 'android'
                    ? (
                    <ActivityIndicator
                                       style={ { marginRight: 10, marginTop: 100 } }
                                       color={ '#ff0000' }
                                       styleAttr={ 'Small' } />

                    )
                    : (
                    <ActivityIndicatorIOS
                                          style={ { marginRight: 10, marginTop: 100 } }
                                          animating={ true }
                                          color={ '#ff0000' }
                                          size={ 'small' } />
                    );
        } else {
            return null;
        }
    }
    _renderRow(rowData: string, sectionID: number, rowID: number) {
        const swipeoutBtns = [
            {
                text: '删除',
                type: 'delete',
                onPress: function() {
                    Platform.OS === 'android' ? Alert.alert('clicked') : AlertIOS.alert('clicked');
                }
            }
        ];
        return (
            <Swipeout
                      close={ !(this.state.sectionID === sectionID && this.state.rowID === rowID) }
                      right={ swipeoutBtns }
                      rowID={ rowID }
                      sectionID={ sectionID }
                      autoClose={ true }
                      backgroundColor="#ffffff">
              <TouchableWithoutFeedback>
                <View style={ styles.li }>
                  <Text style={ styles.liText }>
                    { rowData.ContactName }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Swipeout>
            );
    }
    render() {
        const {data, loading} = this.props;

        if (data.length > 0) {
            const ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => true
            });
            const dataSource = ds.cloneWithRows(data);
            return (
                <View style={ styles.container }>
                  <View style={ styles.activityIndicatorContainer }>
                    { this._renderActivityIndicator(loading) }
                  </View>
                  <ListView
                            scrollEnabled={ true }
                            dataSource={ dataSource }
                            renderRow={ this._renderRow.bind(this) }
                            style={ styles.listview } />
                </View>
                );
        } else {
            return (
                <View style={ styles.activityIndicatorContainer }>
                  { this._renderActivityIndicator(loading) }
                </View>
                );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    activityIndicatorContainer: {
        flex: 1,
        position: 'absolute',
        top: 100,
        left: DEVICE_WIDTH_HALF_POS
    },
    listview: {
        flex: 1
    },
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16
    },
    liText: {
        color: '#333',
        fontSize: 16
    }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        data: state.contact.data,
        loading: state.contact.loading
    };
}

export default connect(mapStateToProps)(ContactScreen);
