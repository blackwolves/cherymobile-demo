import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Alert, AlertIOS, Platform } from 'react-native';
import { connect } from 'react-redux';

import * as appActions from '../../reducers/app/actions';
import CardModal from './components/CardModal';

// this is a traditional React component connected to the redux store
class AlbumScreen extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        Platform.OS === 'android' ? Alert.alert('clicked') : AlertIOS.alert('clicked');
    }
    render() {
        return (
            <ScrollView style={ styles.container }>
              <CardModal
                         title={ 'Model 01' }
                         description={ 'Electronics, home, furniture, and more' }
                         image={ require('../../../img/bg06.jpg') }
                         color={ '#0E48BE' }
                         content={ 'What started small, with a single discount store and the simple idea of selling more for less, has grown over the last 50 years into the largest retailer in the world. Today, nearly 260 million customers visit our more than 11,500 stores under 63 banners in 28 countries and e-commerce sites in 11 countries each week. With fiscal year 2016 revenue of $482.1 billion, Walmart employs 2.3 million associates worldwide – 1.5 million in the U.S. alone. It’s all part of our unwavering commitment to creating opportunities and bringing value to customers and communities around the world.' }
                         onClick={ () => this.onClick() }
                         due={ 3 } />
              <CardModal
                         title={ 'Model 02' }
                         description={ 'Tacos, burritos, and more tacos' }
                         image={ require('../../../img/bg07.jpg') }
                         color="#662BAB"
                         content={ 'Taco Bell is an American chain of fast-food restaurants based in Irvine, California. A subsidiary of Yum! Brands, Inc., they serve a variety of Tex-Mex foods, including tacos, burritos, quesadillas, nachos, other specialty items, and a variety of "value menu" items. Taco Bell serves more than 2 billion customers each year in 6,407 restaurants, more than 80 percent of which are owned and operated by independent franchisees and licensees.' }
                         onClick={ () => this.onClick() }
                         due={ 5 } />
              <CardModal
                         title={ 'Model 03' }
                         description={ 'Prescribed medicine, contact lenses, and more' }
                         image={ require('../../../img/bg08.jpg') }
                         color={ '#fc3758' }
                         content={ 'In December 2014, Walgreens completed its strategic combination with Alliance Boots to establish Walgreens Boots Alliance, Inc., forging the first global pharmacy-led, health and wellbeing enterprise. The combination brought together two leading companies with iconic brands, complementary geographic footprints, shared values and a heritage of trusted health care services through community pharmacy care and pharmaceutical wholesaling.  Both companies have more than a century’s worth of experience in customer and patient care. Walgreens is today part of the Retail Pharmacy USA division of Walgreens Boots Alliance.' }
                         onClick={ () => this.onClick() }
                         due={ 4 } />
              <CardModal
                         title={ 'Model 04' }
                         description={ 'iPhone, iPad, Mac, and Apple Watch' }
                         image={ require('../../../img/bg09.jpg') }
                         color="black"
                         content={ 'Apple is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.' }
                         onClick={ () => this.onClick() }
                         due={ 1 } />
            </ScrollView>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        isLoggedIn: state.root
    };
}

export default connect(mapStateToProps)(AlbumScreen);
