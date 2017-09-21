import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

class ScanBusinessCard extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<TouchableHighlight style={styles.container} underlayColor="white" onPress={this.props.onPress.bind(this)}>
				<View style={{flexDirection:'row',flex:1}}>
					<View style={styles.iconLeft}>
						<Icon name={this.props.iconLeft} size={20} color="red" style={{marginRight:10,marginLeft:10}}/>
					</View>
					<View style={styles.text}>
						<Text style={{fontSize:14,color:'red'}}>{this.props.text}</Text>
					</View>
					<View style={styles.iconRight}>
						<Icon name={this.props.iconRight} size={20} color="red" style={{marginRight:10,marginLeft:10}}/>
					</View>
				</View>				
			</TouchableHighlight>
			);
	}
}

const styles = StyleSheet.create({
	container:{
		flexDirection:'row',
		backgroundColor: '#F3ABAB'
	},
	iconLeft:{
		flexDirection:'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height:50
	},
	text:{
		flex:1,
		flexDirection:'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height:50
	},
	iconRight:{
		flexDirection:'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height:50
	}
});

ScanBusinessCard.PropTypes = {
	text: PropTypes.string,
	iconLeft: PropTypes.string,
	iconRight: PropTypes.string,
	onPress: PropTypes.func
};

export default ScanBusinessCard;