import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from '../styles/FormScreenStyle';

import { View, Text, TextInput, ScrollView, Switch, ActivityIndicator, DatePickerAndroid, DatePickerIOS, Picker, Platform, Dimensions, TouchableOpacity, Alert, AlertIOS } from 'react-native';
import { TableView, Section, CellItem } from './components/tableview';
import Button from 'apsl-react-native-button';
import ValidationComponent from '../FormValidator';

class FormScreen extends ValidationComponent {
    static navigatorStyle = {
        tabBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            presetDate: new Date(2016, 3, 5),
            allDate: new Date(2020, 4, 5),
            simpleText: '选择日期',
            presetText: '选择日期',
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
            gender: '',
            formData: {
                status: false
            },
            showDatePicker: false,
            name: '',
            email: ''
        };
    }
    onDatePress = () => {
        let presetDate = this.state.presetDate;

        if (!presetDate || presetDate === null) {
            presetDate = new Date();
            this.setState({
                presetDate: presetDate
            });
        }
        if (Platform.OS === 'android') {
            //To open the dialog
            this.showPicker('simple', {
                date: presetDate
            });
        } else {
            if (!this.state.showDatePicker) {
                this.setState({
                    showDatePicker: true
                });
            } else {
                this.setState({
                    showDatePicker: false
                });
            }
        }
    }
    performSubmit = () => {
        this.validate({
            name: {
                minlength: 3,
                maxlength: 7,
                required: true
            },
            email: {
                email: true
            },
            number: {
                numbers: true
            },
            presetDate: {
                date: 'YYYY-MM-DD'
            }
        });
        if (!this.isFormValid()) {
            Platform.OS === 'android' ? Alert.alert(this.getErrorMessages()) : AlertIOS.alert(this.getErrorMessages());
        }
    }
    onDatePicked = (date) => {
        this.setState({
            presetDate: date,
            presetText: moment(date).format('DD MMM, YYYY')
        });
    }
    onDateChange = (date) => {
        this.setState({
            presetText: moment(date).format('DD MMM, YYYY'),
            presetDate: date
        });
    };
    async showPicker(stateKey, options) {
        try {
            const newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            } else {
                const date = new Date(year, month, day);
                newState[stateKey + 'Text'] = date.toLocaleDateString();
                newState[stateKey + 'Date'] = date;
            }
            this.setState(newState);
        } catch ( {code, message} ) {
            Platform.OS === 'android' ? Alert.alert(`Error in example '${stateKey}': `, message) : AlertIOS.alert(`Error in example '${stateKey}': `, message);
        }
    }
    renderDatePickerIos() {
        if (this.state.showDatePicker) {
            return (<DatePickerIOS
                                   date={ new Date() }
                                   mode="date"
                                   ref="datePickerIos"
                                   onDateChange={ this.onDateChange.bind(this) } />);
        } else {
            return null;
        }
    }
    renderAlert = () => {
        Platform.OS === 'android' ? Alert.alert('Heyho!') : AlertIOS.alert('Heyho!');
    }
    render() {
        const {handleSubmit, submitting} = this.props;
        return (
            <ScrollView
                        style={ styles.container }
                        keyboardShouldPersistTaps="always">
              <TableView>
                <CellItem>
                  <Text style={ { flex: 1, fontSize: 16 } }>
                    姓名
                  </Text>
                  <TextInput
                             ref="name"
                             underlineColorAndroid="transparent"
                             placeholder="请填写"
                             onChangeText={ (name) => this.setState({
                                                name
                                            }) }
                             value={ this.state.name }
                             style={ styles.input } />
                </CellItem>
                <CellItem>
                  <Text style={ { flex: 1, fontSize: 16 } }>
                    邮箱地址
                  </Text>
                  <TextInput
                             ref="email"
                             underlineColorAndroid="transparent"
                             placeholder="请填写"
                             onChangeText={ (email) => this.setState({
                                                email
                                            }) }
                             value={ this.state.email }
                             style={ styles.input } />
                </CellItem>
                <CellItem>
                  <Text style={ { flex: 1, fontSize: 16 } }>
                    出生年月
                  </Text>
                  <TouchableOpacity onPress={ this.onDatePress.bind(this) }>
                    <View style={ styles.datePickerBox }>
                      <Text style={ styles.datePickerText }>
                        { this.state.presetText }
                      </Text>
                    </View>
                  </TouchableOpacity>
                </CellItem>
              </TableView>
              { this.renderDatePickerIos() }
              <CellItem>
                <Text style={ { flex: 1, fontSize: 16 } }>
                  Loading
                </Text>
                <ActivityIndicator size="small" />
              </CellItem>
              <TableView>
                <Section header="CUSTOMCELLS">
                  <CellItem>
                    <Text style={ { flex: 1, fontSize: 16 } }>
                      Switch
                    </Text>
                    <Switch
                            onValueChange={ (value) => this.setState({
                                                formData: {
                                                    status: value
                                                }
                                            }) }
                            value={ this.state.formData.status } />
                  </CellItem>
                  <CellItem>
                    <Text style={ { flex: 1, fontSize: 16 } }>
                      性别
                    </Text>
                    <Picker
                            style={ { width: 100 } }
                            selectedValue={ this.state.gender }
                            onValueChange={ (value) => this.setState({
                                                gender: value
                                            }) }>
                      <Picker.Item
                                   label="男性"
                                   value="male" />
                      <Picker.Item
                                   label="女性"
                                   value="female" />
                    </Picker>
                  </CellItem>
                </Section>
              </TableView>
              <Button
                      onPress={ this.performSubmit.bind(this) }
                      style={ styles.buttonContainer }
                      textStyle={ styles.textStyle6 }>
                保存
              </Button>
            </ScrollView>
            );
    }
}

export default connect()(FormScreen);
