import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {convertNumberToChinese} from '../../Utils/utils';
import {CheckBox} from './CheckBox';

class MessageTemplate extends React.PureComponent{
	constructor(props){
		super(props);
		this.handlePress = this.handlePress.bind(this);
	}

	handlePress(){
		!this.props.isActive && this.props.modifyMessageContent(this.props.rowData.content);
		this.props.isActive && this.props.modifyMessageContent('');
		this.props.handlePress(this.props.rowId);
	}

	render(){
		const sLeftText = `短信模版${convertNumberToChinese.numberToChinese(this.props.rowId+1)}`;
		return (
			<TouchableHighlight onPress={this.handlePress} activeOpacity={0.7} underlayColor={'transparent'}>
				<View style={styles.container}>
					<View style={styles.checkBoxContainer}>
						<Text>{sLeftText}</Text>
						<CheckBox checked={this.props.isActive} />
					</View>
					<View style={styles.contentContainer}>
						<Text style={styles.content}>{`短信内容: ${this.props.rowData.content}`}</Text>
					</View>	
				</View>				
			</TouchableHighlight>
			);
	}
}

const styles = StyleSheet.create({
	container:{
		flexDirection: 'column',
		marginBottom: 15,
		backgroundColor:'white'
	},
	checkBoxContainer:{
		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding:10
	},
	contentContainer:{
		marginLeft:10,
		marginBottom:10,
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		borderTopColor:'grey',
		borderTopWidth:1
	},
	content:{
		paddingTop:5,
		paddingRight:5
	}
});

export default MessageTemplate;