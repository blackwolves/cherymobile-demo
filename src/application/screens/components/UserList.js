import React from 'react';
import {View, Image, Text, ListView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyCheckBox from './MyCheckBox'

class UserList extends React.Component{
	constructor(props){
		super(props);
		this.ds =new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	}

	_renderRow(rowData, rowId){
		return(
			<View style={styles.container}>
				<Icon name="user-circle" size={50} color="firebrick" style={styles.photo}/>
				<MyCheckBox leftText={rowData.name} checkBoxColor={'red'} onClick={this.props.onClick}/>
			</View>
			);
	}

	render(){
		return(
				<ListView 
				dataSource={this.ds.cloneWithRows(this.props.userList)}
				renderRow={(rowData, sectionId, rowId)=>this._renderRow(rowData, rowId)}/>
			);
	}
} 

const styles = StyleSheet.create({
	container:{
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		marginTop:10
	},
    photo: {
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5
    }
});

export default UserList;