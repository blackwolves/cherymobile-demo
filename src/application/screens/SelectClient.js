import React from 'react';
import {connect} from 'react-redux';
import {View,ListView,Image,Text,TouchableHighlight,StyleSheet, ScrollView} from 'react-native';
import SelectedIndicator from './components/SelectedIndicator';
import UserList from './components/UserList';

class SelectClient extends React.Component{

	static navigatorButtons = {
        rightButtons: [
            {
                title: '下一步',
                id: 'next',
                buttonFontSize: 14,
                buttonFontWeight: '800'
            }
        ]
	}

	constructor(props){
		super(props);
		this.state = {
			selectedClient:0
		};
		this.handlePress = this.handlePress.bind(this);
		this.props.navigator.setOnNavigatorEvent(this.onNavigation.bind(this));
	}

	onNavigation(event){
		switch(event.id){
			case 'next' : this.props.navigator.push({
				screen: 'application.SendMessageToClient',
				title: '发短信给客户',
				animated: true,
				animationType: 'fade',
				navigatorStyle:{
					tabBarHidden: true,
					navBarBackgroundColor: 'white'
				}
			})
		}
	}

	handlePress(isActive){
		if(isActive){
			this.setState((preState, props)=>({selectedClient:++preState.selectedClient}));
		}else{
			this.setState((preState, props)=>({selectedClient:--preState.selectedClient}));
		}		
	}

	render(){
		return(
			<View style={{flex:1,flexDirection:'column'}}>
				<SelectedIndicator selectedClient={this.state.selectedClient} />
				<UserList userList={[{name:'王先生'},{name:'李先生'},{name:'欧阳先生'},{name:'王先生'},{name:'李先生'},{name:'欧阳先生'},{name:'王先生'},{name:'李先生'},{name:'欧阳先生'}]} onClick={this.handlePress}/>				
			</View>
			);
	}
}

export default connect()(SelectClient);