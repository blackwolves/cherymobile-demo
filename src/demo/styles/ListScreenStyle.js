import {StyleSheet} from 'react-native';

const ListScreenStyle = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  thumbnail: {
      padding: 6,
      flexDirection: 'row',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#ccc',
      overflow: 'hidden'
  },
  textContainer: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default ListScreenStyle;
