import React, { Component } from 'react';
import { Text, Image, Dimensions, View, ScrollView, TouchableOpacity, StyleSheet, ListView, ActivityIndicator, ActivityIndicatorIOS, Platform, TouchableHighlight, Linking } from 'react-native';
import { connect } from 'react-redux';
import Row from '../components/Row';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as leadActions from '../../reducers/C4C/lead/actions';
import Communications from 'react-native-communications';

const DEVICE_WIDTH_HALF_POS = Dimensions.get(`window`).width / 2;
const LI_INFO_WIDTH = Dimensions.get(`window`).width - 136;
const ACTION_CONTAINER_WIDTH = DEVICE_WIDTH_HALF_POS - 17;

// this is a traditional React component connected to the redux store
class LeadScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            sectionID: null,
            rowID: null
        };
    }

    componentDidMount() {
        this.props.dispatch(leadActions.fetchData());
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
    handlePhoneCall = (sPhoneNumber) => {
        //Linking.openURL('tel:' + sPhoneNumber).catch(e => console.log(e));
        Communications.phonecall(sPhoneNumber, true);
    }
    handleMessageSend = (sPhoneNumber) => {
        //Linking.openURL('smsto:' + sPhoneNumber).catch(e => console.log(e));
        Communications.text(sPhoneNumber);
    }
    _renderRow(rowData: string, sectionID: number, rowID: number) {
        return (
            <View style={ styles.li }>
              <View style={ styles.detail }>
                <View style={ styles.liInfo }>
                  <Text style={ styles.liName }>
                    { rowData.name }
                  </Text>
                  <Text style={ styles.liSex }>
                    { rowData.sex }
                  </Text>
                  <Text style={ styles.liStatus }>
                    { rowData.status }
                  </Text>
                </View>
                <Text style={ styles.liDate }>
                  { rowData.date }
                </Text>
              </View>
              <View style={ styles.model }>
                <Text style={ { marginRight: 6 } }>
                  [
                  { rowData.type }]
                </Text>
                <Text>
                  { rowData.model }
                </Text>
              </View>
              <View style={ styles.actionbar }>
                <TouchableHighlight onPress={ () => this.handlePhoneCall(rowData.tel) }>
                  <View style={ styles.telContainer }>
                    <Icon
                          name="phone"
                          style={ { fontSize: 16, marginRight: 6 } } />
                    <Text>
                      打电话
                    </Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={ () => this.handleMessageSend(rowData.tel) }>
                  <View style={ styles.actionContainer }>
                    <Icon
                          name="envelope"
                          style={ { fontSize: 16, marginRight: 6 } } />
                    <Text>
                      发消息
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
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
        flex: 1,
        backgroundColor: '#eee'
    },
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 14,
        marginBottom: 16
    },
    detail: {
        flexDirection: 'row'
    },
    model: {
        flexDirection: 'row',
        paddingTop: 14,
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 2,
        paddingBottom: 14
    },
    liName: {
        color: '#333',
        fontSize: 16,
        marginRight: 16
    },
    liInfo: {
        flexDirection: 'row',
        width: LI_INFO_WIDTH
    },
    liStatus: {
        fontSize: 14,
        alignItems: 'flex-end'
    },
    liSex: {
        marginRight: 16
    },
    liDate: {
        width: 100,
        fontSize: 16,
        justifyContent: 'flex-end'
    },
    actionbar: {
        flexDirection: 'row',
        paddingTop: 6,
        height: 32
    },
    telContainer: {
        flexDirection: 'row',
        width: ACTION_CONTAINER_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 2
    },
    actionContainer: {
        flexDirection: 'row',
        width: ACTION_CONTAINER_WIDTH,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        data: state.lead.data,
        loading: state.lead.loading
    };
}

export default connect(mapStateToProps)(LeadScreen);
