import React from 'react';
import {View, Text, ScrollView, Dimensions, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Row from './components/Row';

const width = Dimensions.get(`window`).width;

class UserProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.name = "张三";
        this.role = "销售顾问";
        this.photo = '../../../img/beach.jpg';
        this.fullCalculation = this.fullCalculation.bind(this);
        this.loanCalculation = this.loanCalculation.bind(this);
        this.sendGroupMessage = this.sendGroupMessage.bind(this);
        this.setUpRegistration = this.setUpRegistration.bind(this);
        this.userInfo = this.userInfo.bind(this);
        this.setUp = this.setUp.bind(this);
    }

    fullCalculation() {
        alert("全款计算");
    }

    loanCalculation() {
        alert("贷款计算");
    }

    sendGroupMessage() {
        this.props.navigator.push({
            screen: 'application.SelectClient',
            title: '选择客户',
            navigatorStyle: {
                tabBarHidden: true,
                navBarBackgroundColor: 'white',
                tabBarBackgroundColor: 'white',
                navBarTitleTextCentered: true
            }
        });
    }

    setUpRegistration() {
        alert("集客报名");
    }

    userInfo() {
        alert("用户信息");
    }

    setUp() {
        alert("设置");
    }

    _renderHeader() {
        return (
            <View>
                <Image
                    source={require('../../../img/beach.jpg')}
                    style={styles.backgroundImage}>
                    <Image source={require('../../../img/beach.jpg')}
                           style={styles.photo}
                    />
                    <View
                        style={{marginLeft: 5}}>
                        <Text style={styles.nameText}>{this.name}</Text>
                        <Text style={styles.roleText}>{this.role}</Text>
                    </View>
                </Image>
            </View>
        );
    }

    _renderFunctionBar() {
        return (
            <View
                style={styles.functionBar}>
                <TouchableOpacity
                    onPress={this.fullCalculation.bind(this)}
                    style={styles.TouchableOpacity}>
                    <Image source={require('../../../img/edit@1x.png')}/>
                    <Text style={style = styles.barText}>全款计算</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.loanCalculation.bind(this)}
                    style={styles.TouchableOpacity}>
                    <Image source={require('../../../img/edit@1x.png')}/>
                    <Text style={style = styles.barText}>贷款计算</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.sendGroupMessage.bind(this)}
                    style={styles.TouchableOpacity}>
                    <Image source={require('../../../img/edit@1x.png')}/>
                    <Text style={styles.barText}>群发短信</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.setUpRegistration.bind(this)}
                    style={styles.TouchableOpacity}>
                    <Image source={require('../../../img/edit@1x.png')}/>
                    <Text style={styles.barText}>集客报名</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <ScrollView>
                {this._renderHeader()}
                {this._renderFunctionBar()}
                <View
                    style={{
                        marginTop: 10,
                        backgroundColor: 'white'
                    }}>
                    <Row
                        onPress={this.userInfo.bind(this)}
                        title={'个人信息'}/>
                    <Row
                        onPress={this.setUp.bind(this)}
                        title={'设置'}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    TouchableOpacity: {
        flex: 0.25,
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        height: 70,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    barText: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow : 'hidden',
        fontSize: 15
    },
    roleText: {
        marginLeft: 5,
        fontSize: 15,
        color: 'white'
    },
    nameText: {
        marginLeft: 5,
        fontSize: 20,
        color: 'white'
    },
    photo: {
        marginLeft: 20,
        height: 55,
        width: 55
    },
    backgroundImage: {
        flexDirection: 'row',
        height: 160,
        width: width,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    functionBar: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 70
    }
});
export default connect()(UserProfileScreen);
