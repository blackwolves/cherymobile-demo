import React from 'react';
import {connect} from 'react-redux';
import {
	View,
	ScrollView,
	StyleSheet,
	Alert
} from 'react-native';
import {FormList, FormListItem} from './components/FormList';
import {ScanBusinessCard} from './components/ScanBusinessCard';

class CreateNewClient extends React.Component {

    static navigatorStyle = {
        tabBarHidden: true
    };

	static navigatorButtons = {
        rightButtons: [
            {
                title: '确定',
                id: 'confirm',
                buttonFontSize: 14,
                buttonFontWeight: '800'
            }
        ]
	}

	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	onNavigatorEvent(event){
		switch(event.id){
			case 'confirm' : 
							this.props.navigator.pop({
								animated: true,
								animationType: 'fade'
							});
							break;
		}
	}

	handlePress(){
		let _this = this;
		Alert.alert('you have just press the '+ _this.props.label);
	}

	scanBusniessCard(){
		Alert.alert('scan the business card !')
	}

	render() {
		return ( 
			<ScrollView>
				<View style={styles.container}>
					<ScanBusinessCard text="快速扫描名片自动添加以下部分信息" iconLeft="camera" iconRight="angle-right" onPress={this.scanBusniessCard} />
					<FormList>
						<FormListItem type="input" label="客户姓名*" placeholder="请填写" />
						<FormListItem type="input" label="联系电话*" placeholder="请填写" />
						<FormListItem type="select" label="性别*" placeholder="请选择" icon="angle-right" onPress={this.handlePress}/>
						<FormListItem type="select" label="出生日期" placeholder="请选择" icon="angle-right" onPress={this.handlePress}/>
						<FormListItem type="input" label="居住地址" placeholder="请填写" />
						<FormListItem type="select" label="客户来源" placeholder="请选择" icon="angle-right" onPress={this.handlePress}/>
						<FormListItem type="select" label="身份证号码" placeholder="暂无" icon="angle-right" onPress={this.handlePress}/>
						<FormListItem type="select" label="保有车型" placeholder="暂无" icon="angle-right" onPress={this.handlePress}/>
					</FormList>					
				</View>				
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flexDirection:'column',
		alignItems: 'flex-start'
	}
});

export default connect()(CreateNewClient);