import { StyleSheet, Dimensions } from 'react-native';
const BUTTON_WIDTH = Dimensions.get('window').width - 32;

const FormScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        width: '50%',
        textAlign: 'right'
    },
    datePickerBox: {
        marginTop: 9,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        justifyContent: 'center'
    },
    datePickerText: {
        fontSize: 16,
        marginLeft: 5,
        borderWidth: 0,
        color: '#121212'
    },
    buttonContainer: {
        marginTop: 20,
        height: 40,
        width: BUTTON_WIDTH,
        marginLeft: 16,
        backgroundColor: '#227622',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#227622',
        borderRadius: 5,
        borderWidth: 1
    },
    textStyle6: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default FormScreenStyle;
