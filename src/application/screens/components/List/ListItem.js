import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableHighlight} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';


class ListItem extends React.Component{
	constructor(props){
		super(props);
		this.generateUI = this.generateUI.bind(this);
		this.renderIcon = this.renderIcon.bind(this);
	}

	renderIcon(){
		if(this.props.icon !== undefined){
			return(
					<View style={styles.icon}>
						<Icon name={this.props.icon} size={25} color="grey" style={{marginRight:10,marginLeft:10}}/>
					</View>
				)
		}
	}

	generateUI(){
		if(this.props.type === 'Input'){
			return(
					<View style={styles.listItemContainer}>
						<View style={styles.left}>
							<View style={{height:50,flexDirection:'row',alignItems:'center'}}>
								<Text style={styles.text}>{this.props.label}</Text>
							</View>
						</View>
						<View style={styles.right}>
							<View style={{flex:1, height:50,flexDirection:'row',alignItems:'center'}}>
								<KeyboardAwareScrollView>
									<TextInput placeholder={this.props.placeholder} style={{textAlign:'right', fontSize:18}} underlineColorAndroid='transparent'/>
								</KeyboardAwareScrollView>
							</View>
						</View>
						{this.renderIcon()}
					</View>
				);
		}else if(this.props.type === 'Select'){
			return(
					<TouchableHighlight style={styles.listItemContainer} onPress={this.props.onPress.bind(this)} underlayColor="white">
						<View style={{flexDirection:'row'}}>
							<View style={styles.left}>
								<View style={{height:50,flexDirection:'row',alignItems:'center'}}>
									<Text style={styles.text}>{this.props.label}</Text>
								</View>
							</View>
							<View style={styles.right}>
								<View style={{flex:1, height:50,flexDirection:'row',alignItems:'center'}}>
									<Text style={{flex:1, textAlign:'right', fontSize:18}} >{this.props.placeholder}</Text>
								</View>
							</View>
							{this.renderIcon()}
						</View>						
					</TouchableHighlight>
				);			
		}else if(this.props.type === 'DataPicker'){

		}else{
			return(<Text>No Such ListItem Type!!!</Text>);
		}
	}

	render(){
		return this.generateUI();
	}
}

ListItem.PropTypes = {
	icon: PropTypes.string,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onPress: PropTypes.func
};

const styles = StyleSheet.create({
	listItemContainer:{
		flexDirection:'row',
		alignItems: 'center',
		justifyContent:'center',
		//boxSizing:'content-box',
		borderBottomWidth: 1,
		borderBottomColor: '#E2D9D9',
		marginLeft:10
	},
	left:{
		flexDirection:'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	right:{
		flex:1,
		flexDirection:'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	icon:{
		flexDirection:'row',
		justifyContent: 'flex-start',
		alignItems: 'center'	
	},
	text:{
		fontSize:18,
		color:'black'
	}
});

export default ListItem;