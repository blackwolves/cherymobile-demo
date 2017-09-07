import { StyleSheet } from 'react-native';

const ListScreenStyle = StyleSheet.create({
    container: {
        flex: 5,
        backgroundColor: '#ffffff'
    },
    thumbnail: {
        padding: 6,
        flexDirection: 'row',
        overflow: 'hidden',
        backgroundColor: '#EEEEEE'
    },
    textContainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});

export default ListScreenStyle;
