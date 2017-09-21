import React from 'react';
import {View, StyleSheet} from 'react-native';

class List extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
				<View style={styles.container}>
					{this.props.children}
				</View>
			)
	}
}

const styles = StyleSheet.create({
	container:{
		flexDirection: 'column',
		alignItems: 'flex-start'
	}
});

export default List;