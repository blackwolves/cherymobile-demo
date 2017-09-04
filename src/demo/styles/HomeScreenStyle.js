import { StyleSheet, Dimensions } from 'react-native';

const nPicWidth = Dimensions.get('window').width;
const nPicHeight = Dimensions.get('window').height / 2 - 100;

const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: nPicWidth,
        height: nPicHeight
    }
});

export default HomeScreenStyle;
