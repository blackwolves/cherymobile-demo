import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class SelectedIndicator extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<View style={styles.container}>
				<Text>{`已选择${this.props.selectedClient}人`}</Text>
			</View>
			);
	}
}

SelectedIndicator.PropTypes = {
	selectedClient:PropTypes.number.isRequired
};

const styles = StyleSheet.create({
	container:{
		flexDirection:'row', 
		justifyContent: 'flex-start', 
		alignItems:'center', 
		height:50, 
		backgroundColor:'white',
		paddingLeft: 15
	}
});
export default SelectedIndicator;
