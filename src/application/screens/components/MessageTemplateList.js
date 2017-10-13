import React from 'react';
import CheckBox from 'react-native-check-box';
import {Text, View, ListView, StyleSheet} from 'react-native';
import {convertNumberToChinese} from '../../Utils/utils';

class MessageTemplateList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isActive: false
		};
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.handlePress = this.handlePress.bind(this);
	}

	handlePress(){
		this.setState((preState, props)=>({isActive:!preState.isActive}));
	}

	_renderRow(rowData, rowId){
		const sLeftText = `短信模版${convertNumberToChinese.numberToChinese(++rowId)}`;
		return(
				<View style={styles.container}>
					<CheckBox
					 style={styles.checkbox}
					 onClick={()=>this.handlePress()}
					 isChecked={this.state.isActive}
					 leftText={sLeftText}
					 checkBoxColor={'red'}
					/>
					<View style={styles.contentContainer}>
						<Text style={styles.content}>{`短信内容: ${rowData.content}`}</Text>
					</View>	
				</View>
			);
	}

	render(){
		return(
				<ListView 
				dataSource = {this.ds.cloneWithRows(this.props.templateList)}
				renderRow = {(rowData, sectionId, rowId)=>this._renderRow(rowData, rowId)}
				/>
			);
	}
}

const styles = StyleSheet.create({
	checkbox:{
		flex: 1,
		padding: 10
	},
	container:{
		flexDirection: 'column',
		marginBottom: 15,
		backgroundColor:'white'
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

export default MessageTemplateList;