import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DropdownMenu from './components/DropdownMenu';

class DropdownMenuScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const data = [["线索来源", "微信", "网络"], ["创建时间", "2017", "2016", "2015"], ["线索等级", "A级", "B级", "C级", "D级"]];
        return (
            <View style={ styles.container }>
              <DropdownMenu
                            style={ { flex: 1 } }
                            arrowImg={ require('../../../img/dropdown_arrow.png') }
                            checkImage={ require('../../../img/menu_check.png') }
                            bgColor={ "white" }
                            tintColor={ "gray" }
                            selectItemColor={ "gray" }
                            data={ data }
                            maxHeight={ 410 }
                            handler={ (selection, row) => alert(data[selection][row]) }>
                <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } } />
              </DropdownMenu>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default DropdownMenuScreen;
