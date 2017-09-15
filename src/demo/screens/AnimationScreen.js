import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, NativeModules, LayoutAnimation, Dimensions, Image, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/Entypo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const POS_HALF_SCREEN_X = SCREEN_WIDTH / 2 - 50;
const POS_HALF_SCREEN_Y = 200 / 2 - 50;

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class AnimationScreen extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true
    };
    constructor(props) {
        super(props);
        this.state = {
            top: 200,
            left: 0,
            btnName: 'menu',
            leftAnim: new Animated.Value(0),
            topAnim: new Animated.Value(200),
            borderRadius: 50,
            bounceValue: new Animated.Value(0),
            boxWidth: 50,
            boxHeight: 50,
            scaleX: new Animated.Value(1),
            scaleY: new Animated.Value(1),
            rotateValue: new Animated.Value(0),
            showMenuIcon: new Animated.Value(1),
            showDeleteIcon: new Animated.Value(0)
        };
    }
    componentDidMount() {}
    clickOnBtn = () => {
        Animated.sequence([
            Animated.stagger(100, [
                Animated.parallel([
                    Animated.timing(this.state.rotateValue, {
                        toValue: 1
                    }),
                    Animated.timing(
                        this.state.showMenuIcon, {
                            toValue: 0
                        }),
                    Animated.timing(
                        this.state.showDeleteIcon, {
                            toValue: 1,
                            easing: Easing.linear,
                            delay: 0
                        }),
                    Animated.timing(
                        this.state.leftAnim, {
                            toValue: POS_HALF_SCREEN_X,
                            duration: 100
                        }),
                    Animated.timing(
                        this.state.topAnim, {
                            toValue: POS_HALF_SCREEN_Y,
                            duration: 100,
                            delay: 0
                        })
                ]),
                Animated.parallel([
                    Animated.timing(
                        this.state.scaleX, {
                            toValue: 4,
                            duration: 400,
                            delay: 0
                        }
                    ),
                    Animated.timing(
                        this.state.scaleY, {
                            toValue: 2,
                            duration: 400
                        }
                    )])])
                    //Animated.delay(0),

        ]).start();
        setTimeout(() => {
            this.setState({
                borderRadius: 0
            });
        }, 200);
    }
    clickOnDeleteBtn = () => {
        requestAnimationFrame(() => {
            this.setState({
                borderRadius: 50
            });
        });
        Animated.sequence([
            Animated.parallel([
                Animated.spring(
                    this.state.rotateValue, {
                        toValue: 0
                    }),
                Animated.timing(
                    this.state.scaleX, {
                        toValue: 1
                    }
                ),
                Animated.timing(
                    this.state.scaleY, {
                        toValue: 1
                    }
                ),
                Animated.timing(
                    this.state.leftAnim, {
                        toValue: 0
                    }),
                Animated.timing(
                    this.state.topAnim, {
                        toValue: 200
                    }),
                Animated.timing(
                    this.state.showMenuIcon, {
                        toValue: 1
                    }),
                Animated.timing(
                    this.state.showDeleteIcon, {
                        toValue: 0
                    })])
                    //Animated.delay(200),

        ]).start();
    }
    render() {
        return (<View style={ styles.container }>
                  <Animated.View style={ [{ top: this.state.topAnim, left: this.state.leftAnim, transform: [{ scaleX: this.state.scaleX }, { scaleY: this.state.scaleY }] }, { position: 'absolute' }] }>
                    <TouchableOpacity
                                      onPress={ () => this.clickOnBtn() }
                                      style={ { width: 100, height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#449d44', borderRadius: this.state.borderRadius } }>
                    </TouchableOpacity>
                  </Animated.View>
                  <TouchableOpacity style={ { position: 'absolute', width: 100, height: 100, alignItems: 'center', top: POS_HALF_SCREEN_Y, left: POS_HALF_SCREEN_X, justifyContent: 'center', borderRadius: 50 } }>
                    <Animated.Image
                                    ref='image'
                                    source={ require('../../../img/navicon_menu@2x.png') }
                                    size={ 100 }
                                    style={ { width: 100, height: 100, opacity: this.state.showMenuIcon, transform: [{ rotate: this.state.rotateValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '720deg'] }) }] } }
                                    color="#900" />
                  </TouchableOpacity>
                  <TouchableOpacity
                                    onPress={ () => this.clickOnDeleteBtn() }
                                    style={ { position: 'absolute', width: 100, height: 100, alignItems: 'center', top: POS_HALF_SCREEN_Y, left: POS_HALF_SCREEN_X, justifyContent: 'center', borderRadius: 50 } }>
                    <Animated.Image
                                    ref='image'
                                    source={ require('../../../img/deletex.png') }
                                    style={ { opacity: this.state.showDeleteIcon, width: 100, height: 100 } }
                                    size={ 100 }
                                    color="#900" />
                  </TouchableOpacity>
                </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: '#449d44',
        borderRadius: 50
    }
});
export default AnimationScreen;
