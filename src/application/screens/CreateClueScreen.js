import React from 'react';
import moment from 'moment';
import styles from '../../demo/styles/FormScreenStyle';

import { View, Text, TextInput, ScrollView, Switch } from 'react-native';
import { TableView, Section, CellItem } from '../../demo/screens/components/tableview';
import Button from 'apsl-react-native-button';
import ValidationComponent from '../FormValidator';

class CreateClueScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: ''
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        switch (event.id) {
        case 'save_create':
            this.props.navigator.push({
                screen: 'application.CreateClueScreen',
                title: '创建线索'
            });
            break;
        default:
        }
    }

    render() {
        return (<ScrollView
                            style={ styles.container }
                            keyboardShouldPersistTaps="always">
                  <TableView>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        客户姓名
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
                        联系电话
                      </Text>
                      <TextInput
                                 ref="phone"
                                 underlineColorAndroid="transparent"
                                 placeholder="请填写"
                                 onChangeText={ (phone) => this.setState({
                                                    phone
                                                }) }
                                 value={ this.state.phone }
                                 style={ styles.input } />
                    </CellItem>
                  </TableView>
                  <TableView>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        线索等级
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
                        线索来源
                      </Text>
                      <TextInput
                                 ref="phone"
                                 underlineColorAndroid="transparent"
                                 placeholder="请填写"
                                 onChangeText={ (phone) => this.setState({
                                                    phone
                                                }) }
                                 value={ this.state.phone }
                                 style={ styles.input } />
                    </CellItem>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        意向车型
                      </Text>
                      <TextInput
                                 ref="phone"
                                 underlineColorAndroid="transparent"
                                 placeholder="请填写"
                                 onChangeText={ (phone) => this.setState({
                                                    phone
                                                }) }
                                 value={ this.state.phone }
                                 style={ styles.input } />
                    </CellItem>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        付款方式
                      </Text>
                      <TextInput
                                 ref="phone"
                                 underlineColorAndroid="transparent"
                                 placeholder="请填写"
                                 onChangeText={ (phone) => this.setState({
                                                    phone
                                                }) }
                                 value={ this.state.phone }
                                 style={ styles.input } />
                    </CellItem>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        购车用途
                      </Text>
                      <TextInput
                                 ref="phone"
                                 underlineColorAndroid="transparent"
                                 placeholder="请填写"
                                 onChangeText={ (phone) => this.setState({
                                                    phone
                                                }) }
                                 value={ this.state.phone }
                                 style={ styles.input } />
                    </CellItem>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        购买类型
                      </Text>
                      <TextInput
                                 ref="phone"
                                 underlineColorAndroid="transparent"
                                 placeholder="请填写"
                                 onChangeText={ (phone) => this.setState({
                                                    phone
                                                }) }
                                 value={ this.state.phone }
                                 style={ styles.input } />
                    </CellItem>
                  </TableView>
                  <TableView>
                    <CellItem>
                      <TextInput
                                 ref="phone"
                                 underlineColorAndroid="transparent"
                                 placeholder="备注"
                                 onChangeText={ (phone) => this.setState({
                                                    phone
                                                }) }
                                 value={ this.state.phone }
                                 style={ styles.input } />
                    </CellItem>
                  </TableView>
                </ScrollView>);
    }
}

export default CreateClueScreen;
