import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class CheckBox extends React.PureComponent{
	static defaultProps = {
		checked:false
	}

	constructor(props){
		super(props);
		this.state = {
			isChecked: this.props.checked
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.checked !== this.state.isChecked){
			this.setState({isChecked:nextProps.checked});
		}
	}

	_renderIcon(){
		if(this.state.isChecked){
			const source = 'check-circle';
			return(
				<Icon name={source} size={24} color="red"/>
				);			
		}else{
			const source = 'circle-thin';
			return(
				<Icon name={source} size={24}/>
				);	
		}

	}

	render(){
		return(
			<TouchableHighlight onPress={()=>this.props.onValueChange()} activeOpacity={0.5} underlayColor={'transparent'}>
				{this._renderIcon()}
			</TouchableHighlight>
			);
	}
}

export default CheckBox;