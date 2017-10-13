import React from 'react';
import CheckBox from 'react-native-check-box';
import {StyleSheet, Alert} from 'react-native';

class MyCheckBox extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isActive: false
		};
		this.handlePress = this.handlePress.bind(this);
	}

	handlePress(){	
		this.setState((preState, props)=>{
			this.props.onClick(!preState.isActive);
			return {isActive:!preState.isActive};
		});
	}

	render(){
		return(
			<CheckBox
			 style={styles.checkbox}
			 onClick={()=>this.handlePress()}
			 isChecked={this.state.isActive}
			 leftText={this.props.leftText}
			 checkBoxColor={this.props.checkBoxColor}
			/>
			);
	}
}

const styles = StyleSheet.create({
	checkbox:{
		flex: 1,
		padding: 10
	}
});

export default MyCheckBox;