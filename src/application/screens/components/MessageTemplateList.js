import React from 'react';
import {Text, View, ListView, StyleSheet} from 'react-native';
import {convertNumberToChinese} from '../../Utils/utils';
import MessageTemplate from './MessageTemplate';
import Immutable from 'seamless-immutable';

class MessageTemplateList extends React.Component{
	constructor(props){
		super(props);
		let isActiveArray = [];
		for(let i = 0;i<this.props.templateList.length;i++){
			isActiveArray.push(false);
		};
		this.state = {
			isActive: isActiveArray,
			activeMessageContent:''
		};
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.handlePress = this.handlePress.bind(this);
		this.modifyMessageContent = this.modifyMessageContent.bind(this);
		this.getActiveMessageTemplate = this.getActiveMessageTemplate.bind(this);
	}

	handlePress(rowId){
		this.setState((preState, props)=>{
			const oState = Immutable(preState);
			let aStateData = oState.isActive.asMutable();
			if(!preState.isActive[rowId]){
				oState.isActive.every(function(bItem,iIndex){
					if(iIndex !== rowId){
						aStateData[iIndex] = false;
					}
					aStateData[rowId] = true;
					return true;
				});
			}else{
				aStateData[rowId] = false;
			}
			return{isActive:aStateData};
		});
	}

	modifyMessageContent(sContent){
		this.setState({activeMessageContent:sContent});
	}

	getActiveMessageTemplate(){
		return this.state.activeMessageContent;
	}

	_renderRow(rowData, rowId){
		return(
				<MessageTemplate 
					rowId={parseInt(rowId)} 
					rowData={rowData} 
					isActive={this.state.isActive[rowId]} 
					handlePress={this.handlePress} 
					key={rowId}
					modifyMessageContent={this.modifyMessageContent}
				/>
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

export default MessageTemplateList;