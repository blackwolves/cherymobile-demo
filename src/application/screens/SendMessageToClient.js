import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {requestMessageTemplate, addMessageTemplate} from '../../reducers/app/actions';
import AddNewMessageTemplate from './components/AddNewMessageTemplate';
import MessageTemplateList from './components/MessageTemplateList';

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
	}

	componentWillMount(){
		this.props.requestTemplate();
	}

	render(){
		return(
			<KeyboardAvoidingView behavior='position'>
				<ScrollView>
					<View style={styles.container}>
						<MessageTemplateList templateList={this.props.messageTemplate}/>
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