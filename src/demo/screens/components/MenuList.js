import React, { Component } from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import _ from 'lodash';

const prefixType = '_type_';

const prefixStyle = '_style_';

const defaultBackgroundColor = {
    backgroundColor: '#fff'
};

class MenuList extends Component {
    constructor(props) {
        super(props);

        const data = this.props.data;
        const nSelected = this.props.nSelected;

        const tabSelected = this.props.tabSelected;
        const obj = {};
        let kIndex = 0;
        _.forEach(data, function(oData, k) {
            let cIndex = 0;
            _.forEach(oData, function(childData, c) {
                const type = prefixType + k + '_' + c;
                const style = prefixStyle + k + '_' + c;
                obj[type] = false;
                obj[style] = {};

                if (nSelected === cIndex && tabSelected === kIndex) {
                    obj[type] = true;
                    obj[style] = defaultBackgroundColor;
                }
                cIndex++;
            });
            kIndex++;
        });
        obj.tabSelected = tabSelected;
        obj.nSelected = nSelected;
        this.state = obj;
    }

    render() {
        const header = this.renderlHeader();
        const left = this.renderLeft();
        const right = this.renderRight();
        return (
            <View style={ styles.container }>
              <View style={ [styles.row, styles.header] }>
                { header }
              </View>
              <View style={ [styles.row, styles.flex_1] }>
                <ScrollView style={ [styles.flex_1, styles.left_pannel] }>
                  { left }
                </ScrollView>
                <ScrollView style={ [styles.flex_1, styles.right_pannel] }>
                  { right }
                </ScrollView>
              </View>
            </View>
            );
    }

    renderlHeader() {
        const data = this.props.data;
        const tabSelected = this.state.tabSelected;
        const header = [];
        let tabIndex = 0;
        const that = this;
        _.forEach(data, function(oData, i) {
            let tabStyle = null;
            if (tabIndex === tabSelected) {
                tabStyle = [styles.header_text, styles.active_blue];
            } else {
                tabStyle = [styles.header_text];
            }
            header.push(
                <TouchableOpacity
                                  key={ i }
                                  style={ [styles.flex_1, styles.center] }
                                  onPress={ that.headerPress.bind(that, i) }>
                  <Text style={ tabStyle }>
                    { i }
                  </Text>
                </TouchableOpacity>
            );
            tabIndex++;
        });
        return header;
    }

    renderLeft() {
        const data = this.props.data;
        const tabSelected = this.state.tabSelected;
        const leftPannel = [];
        let index = 0;
        const that = this;
        for (const i in data) {
            if (index === tabSelected) {
                _.forEach(data[i], function(oData, k) {
                    const style = that.state[prefixStyle + i + '_' + k];
                    leftPannel.push(
                        <Text
                              onPress={ that.leftPress.bind(that, i, k) }
                              key={ prefixStyle + i + '_' + k }
                              style={ [styles.left_row, style] }>
                          { k }
                        </Text>);
                });
                break;
            }
            index++;
        }
        return leftPannel;
    }

    renderRight() {
        const data = this.props.data;
        const tabSelected = this.state.tabSelected;
        const nSelected = this.state.nSelected;
        let index = 0;
        const that = this;
        const rightPannel = [];
        _.forEach(data, function(oData, i) {
            if (tabSelected === index) {
                for (const k in oData) {
                    if (that.state[prefixType + i + '_' + k]) {
                        _.forEach(oData[k], function(oDat, j) {
                            rightPannel.push(
                                <Text
                                      key={ prefixType + i + '_' + k + j }
                                      onPress={ that.props.click.bind(this, oDat) }
                                      style={ styles.left_row }>
                                  { oDat }
                                </Text>);
                        });
                        break;
                    }
                }
            }
            index++;
        });
        return rightPannel;
    }
    leftPress(tabIndex, nIndex) {
        let obj = {};
        const that = this;
        _.forEach(this.state, function(oState, k) {
            if (k.indexOf(prefixType) > -1) {
                obj = {};
                obj[k] = false;
                that.setState(obj);
            }
            if (k.indexOf(prefixStyle) > -1) {
                obj = {};
                obj[k] = {};
                that.setState(obj);
            }
        });
        obj[prefixType + tabIndex + '_' + nIndex] = true;
        obj[prefixStyle + tabIndex + '_' + nIndex] = defaultBackgroundColor;
        this.setState(obj);
    }
    headerPress(title) {
        const that = this;
        const data = this.props.data;
        let index = 0;
        _.forEach(data, function(oData, i) {
            if (i === title) {
                that.setState({
                    tabSelected: index
                });
                const obj = {};
                let n = 0;
                _.forEach(oData, function(oDat, k) {
                    if (n !== 0) {
                        obj[prefixType + i + '_' + k] = false;
                        obj[prefixStyle + i + '_' + k] = {};
                    } else {
                        obj[prefixType + i + '_' + k] = true;
                        obj[prefixStyle + i + '_' + k] = defaultBackgroundColor;
                    }
                    n++;
                });
                that.setState(obj);
            }
            index++;
        });
    }
}

const styles = StyleSheet.create({
    container: {
        height: 240,
        flex: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    row: {
        flexDirection: 'row'
    },
    flex_1: {
        flex: 1
    },
    header: {
        height: 35,
        borderBottomWidth: 1,
        borderColor: '#DFDFDF',
        backgroundColor: '#F5F5F5'
    },
    header_text: {
        color: '#7B7B7B',
        fontSize: 15
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    left_pannel: {
        backgroundColor: '#F2F2F2'
    },
    left_row: {
        height: 48,
        lineHeight: 28,
        fontSize: 14,
        padding: 10,
        color: '#7C7C7C'
    },
    right_pannel: {
        marginLeft: 10
    },
    active_blue: {
        color: '#00B7EB'
    }
});

module.exports = MenuList;
