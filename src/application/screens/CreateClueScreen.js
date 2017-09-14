import React from 'react';
import moment from 'moment';
import styles from '../styles/FormScreenStyle';

import { View, Text, TextInput, ScrollView, Switch } from 'react-native';
import { TableView, Section, CellItem } from './components/tableview';
import Button from 'apsl-react-native-button';
import ValidationComponent from '../FormValidator';
import RightArrow from './components/RightArrow';

class CreateClueScreen extends React.Component {
    /*static navigatorStyle = {
        tabBarHidden: true
    };*/
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            description: ''
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.props.navigator.setDrawerEnabled({
            side: 'right',
            enabled: true
        });
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

    openSelectPanel(type) {
        this.props.navigator.showModal({
            screen: 'application.SelectModal',
            animationType: 'slide-up',
            navigatorStyle: {
                navBarComponentAlignment: 'center',
                navBarTranslucent: false,
                navBarTransparent: false,
                navBarNoBorder: true,
                navBarTitleTextCentered: true,
                navBarHidden: true
            },
            title: type
        });
    }

    render() {
        return (<ScrollView
                            style={ styles.container }
                            keyboardShouldPersistTaps="always">
                  <TableView style={ { backgroundColor: 'gray', paddingBottom: 20 } }>
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
                  <TableView style={ { backgroundColor: 'gray', paddingBottom: 20 } }>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        线索等级
                      </Text>
                      <RightArrow onPressEvent={ () => this.openSelectPanel('线索等级') } />
                    </CellItem>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        线索来源
                      </Text>
                      <RightArrow onPressEvent={ () => this.openSelectPanel('线索来源') } />
                    </CellItem>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        意向车型
                      </Text>
                      <RightArrow onPressEvent={ () => this.openSelectPanel('意向车型') } />
                    </CellItem>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        付款方式
                      </Text>
                      <RightArrow onPressEvent={ () => this.openSelectPanel('付款方式') } />
                    </CellItem>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        购车用途
                      </Text>
                      <RightArrow onPressEvent={ () => this.openSelectPanel('购车用途') } />
                    </CellItem>
                    <CellItem>
                      <Text style={ { flex: 1, fontSize: 16 } }>
                        购买类型
                      </Text>
                      <RightArrow onPressEvent={ () => this.openSelectPanel('购买类型') } />
                    </CellItem>
                  </TableView>
                  <TextInput
                             ref="description"
                             underlineColorAndroid="transparent"
                             placeholder="备注"
                             multiline={ true }
                             numberOfLines={ 4 }
                             onChangeText={ (description) => this.setState({
                                                description
                                            }) }
                             value={ this.state.description }
                             style={ { marginLeft: 10 } } />
                </ScrollView>);
    }
}

export default CreateClueScreen;
