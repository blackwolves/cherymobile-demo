import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableHighlight} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';


class FormListItem extends React.Component{
	constructor(props){
		super(props);
		this.generateUI = this.generateUI.bind(this);
	}

	generateUI(){
		if(this.props.icon !== undefined && this.props.type === 'input'){
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
						<View style={styles.icon}><Icon name={this.props.icon} size={25} color="grey" style={{marginRight:10,marginLeft:10}}/></View>
					</View>
				);
		}else if(this.props.icon !== undefined && this.props.type === 'select'){
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
							<View style={styles.icon}><Icon name={this.props.icon} size={25} color="grey" style={{marginRight:10,marginLeft:10}}/></View>
						</View>						
					</TouchableHighlight>
				);			
		}else if(this.props.icon == undefined && this.props.type === 'input'){
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
				</View>	
				);	
		}else if(this.props.icon == undefined && this.props.type === 'select'){
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
						</View>						
					</TouchableHighlight>
				);		
		}else{
			return(<Text>No Such ListItem Type!!!</Text>);
		}
	}

	render(){
		return this.generateUI();
	}
}

FormListItem.PropTypes = {
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
		borderBottomColor: 'grey',
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

export default FormListItem;