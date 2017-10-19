import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView, Linking, Alert} from 'react-native';
import {requestMessageTemplate, addMessageTemplate} from '../../reducers/app/actions';
import AddNewMessageTemplate from './components/AddNewMessageTemplate';
import MessageTemplateList from './components/MessageTemplateList';
import SendSMS from 'react-native-sms';

class SendMessageToClient extends React.Component{
	static navigatorButtons = {
        rightButtons: [
            {
                title: '发送',
                id: 'send',
                buttonFontSize: 14,
                buttonFontWeight: '800'
            }
        ]
	}

	constructor(props){
		super(props);
		this.state = {

		};
		this.getActiveMessageTemplate = this.getActiveMessageTemplate.bind(this);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	componentWillMount(){
		this.props.requestTemplate();
	}

	onNavigatorEvent(event){
		switch(event.id){
			case 'send' : 
				SendSMS.send({
					body: this.getActiveMessageTemplate(),
					recipients: ['0123456789', '9876543210'],
					successTypes: ['all']
				}, (completed, cancelled, error) => {
					//it seems that the completed and cancelled is not correct here which place in the oppsite site.
					//but the official document write like this actually.
					setTimeout(()=>{
						this.props.navigator.pop({
							  animated: true,
							  animationType: 'fade',
						});
					},1000);
				});
				break;
		}
	}

	getActiveMessageTemplate(){
		return this.MessageTemplateList.getActiveMessageTemplate();
	}

	render(){
		return(
			<KeyboardAvoidingView behavior='position'>
				<ScrollView>
					<View style={styles.container}>
						<MessageTemplateList templateList={this.props.messageTemplate} ref={(MessageTemplateList)=>this.MessageTemplateList=MessageTemplateList}/>
						<AddNewMessageTemplate addNewTemplate={this.props.addTemplate}/>	
					</View>						
				</ScrollView>			
			</KeyboardAvoidingView>
			);
	}
}

const styles = StyleSheet.create({
	container:{
		flexDirection:'column'
	}
});

const mapStateToProps = (state)=>{
	return{
		messageTemplate : state.app.messageTemplate
	};
};

const mapDispatchToProps = (dispatch)=>{
	return{
		addTemplate : (sMessage)=>dispatch(addMessageTemplate(sMessage)),
		requestTemplate : ()=>dispatch(requestMessageTemplate())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageToClient);