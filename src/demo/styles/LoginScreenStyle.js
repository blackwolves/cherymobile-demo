import { StyleSheet, Dimensions } from 'react-native';
const {width} = Dimensions.get('window');

const LoginScreenStyle = StyleSheet.create({
    loginView: {
        flex: 1,
        flexDirection: 'column'
    //justifyContent: 'center'
    },
    alignCenter: {
        justifyContent: 'center',
        width: 300
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    text: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,0,0,0)',
        fontSize: 44,
        color: 'white'
    },
    textInput: {
        height: 40,
        width: 300,
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        //backgroundColor: '#EEE',
        backgroundColor: 'white'
    },
    buttonContainer: {
        marginTop: 20,
        height: 40,
        width: 300,
        backgroundColor: '#227622',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#227622',
        borderRadius: 5,
        borderWidth: 1
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },
    textStyle6: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    fingerprint: {
        marginVertical: 30,
        justifyContent: 'center',
        width: 300,
        alignItems: 'center'
    },
    errorMessage: {
        color: '#ea3d13',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: 30
    },
    popup: {
        width: width * 0.8
    },
    webviewContainer: {
        height: 100,
        position: 'absolute',
        bottom: 0
    //left: -999
    },
    webview: {
        width: 300,
        height: 100
    }
});

export default LoginScreenStyle;
