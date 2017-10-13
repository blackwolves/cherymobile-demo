import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight, TextInput, Button} from 'react-native';

class AddNewMessageTemplate extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			templateContent: '',
			isAddingTemplate: false
		};
		this._renderInput = this._renderInput.bind(this);
		this._renderAddToolKit = this._renderAddToolKit.bind(this);
	}

	_renderInput(){
		if(this.state.isAddingTemplate){
			return(
				<View style={styles.inputContainer}>
					<TextInput 
					style={style.textInput}
					placeholder={'请输入模版内容'}
					onChangeText={(text)=>this.setState({templateContent:text})}
					underlineColorAndroid='transparent'
					value={this.state.templateContent}
					/>
					<Button 
					title={'确定'}
					onPress={()=>{
						this.setState({isAddingTemplate:false});
						this.props.addNewTemplate(this.state.templateContent);
						this.setState({templateContent:''});
					}}
					disabled={!Boolean(this.state.templateContent)}
					/>					
				</View>
				);
		}
	}

	_renderAddToolKit(){
		if(!this.state.isAddingTemplate){
			return(
					<TouchableHighlight 
					onPress={()=>this.setState({isAddingTemplate:true})}  
					style={styles.toolKitContainer}
					underlayColor={'white'}
					activeOpacity={0.5}
					>
						<View style={styles.container}>
							<Text>{'新增短信模版'}</Text>
							<Text>{'添加'}</Text>
						</View>				
					</TouchableHighlight>
				);
		}
	}

	render(){
		return(
			<View>
				{this._renderAddToolKit()}
				{this._renderInput()}			
			</View>
			);
	}
}

const styles = StyleSheet.create({
	container:{
		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems:'center',
		padding:10
	},
	textInput:{
		backgroundColor:'white',
		height:50
	},
	inputContainer:{
		flexDirection:'column',
		padding:10,
		backgroundColor:'white'
	},
	toolKitContainer:{
		backgroundColor:'white'
	},
});

export default AddNewMessageTemplate;