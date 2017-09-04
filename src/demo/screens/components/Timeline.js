import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, ListView, Image, View, Text, TouchableOpacity } from 'react-native';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

const defaultCircleSize = 16;
const defaultCircleColor = '#007AFF';
const defaultLineWidth = 2;
const defaultLineColor = '#007AFF';
const defaultTimeTextColor = 'black';
const defaultDotColor = 'white';
const defaultInnerCircle = 'none';

export default class Timeline extends Component {
    constructor(props, context) {
        super(props, context);

        this._renderRow = this._renderRow.bind(this);

        this.renderDetail = (this.props.renderDetail ? this.props.renderDetail : this._renderDetail).bind(this);
        this.renderCircle = (this.props.renderCircle ? this.props.renderCircle : this._renderCircle).bind(this);
        this.renderEvent = this._renderEvent.bind(this);
        this.isRenderSeparator = this.props.separator !== null ? this.props.separator : true;
        this.onEventPress = this.props.onEventPress;

        this.state = {
            data: this.props.data,
            dataSource: ds.cloneWithRows(this.props.data),
            x: 0,
            width: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            dataSource: ds.cloneWithRows(nextProps.data)
        });
    }

    render() {
        return (
            <View style={ [styles.container, this.props.style] }>
              <ListView
                        ref="listView"
                        style={ [styles.listview] }
                        dataSource={ this.state.dataSource }
                        renderRow={ this._renderRow }
                        automaticallyAdjustContentInsets={ false }
                        {...this.props.options} />
            </View>
            );
    }

    _renderRow(rowData, sectionID, rowID) {
        const content = (
        <View style={ [styles.rowContainer, this.props.rowContainerStyle] }>
          { this.renderEvent(rowData, sectionID, rowID) }
          { this.renderCircle(rowData, sectionID, rowID) }
        </View>
        );

        return (
            <View key={ rowID }>
              { content }
            </View>
            );
    }

    _renderEvent(rowData, sectionID, rowID) {
        const lineWidth = rowData.lineWidth ? rowData.lineWidth : this.props.lineWidth;
        const isLast = this.state.data.slice(-1)[0] === rowData;
        const lineColor = isLast ? ('rgba(0,0,0,0)') : (rowData.lineColor ? rowData.lineColor : this.props.lineColor);
        const opStyle = {
            borderColor: lineColor,
            borderLeftWidth: lineWidth,
            borderRightWidth: 0,
            marginLeft: 8,
            paddingLeft: 20
        };

        return (
            <View
                  style={ [styles.details, opStyle] }
                  onLayout={ (evt) => {
                                 if (!this.state.x && !this.state.width) {
                                     const {x, width} = evt.nativeEvent.layout;
                                     this.setState({
                                         x,
                                         width
                                     });
                                 }
                             } }>
              <TouchableOpacity
                                disabled={ this.props.onEventPress === null }
                                style={ [this.props.detailContainerStyle] }
                                onPress={ () => this.props.onEventPress ? this.props.onEventPress(rowData) : null }>
                <View style={ { paddingBottom: 10 } }>
                  { this.renderDetail(rowData, sectionID, rowID) }
                </View>
                { this._renderSeparator() }
              </TouchableOpacity>
            </View>
            );
    }

    _renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={ [styles.title, this.props.titleStyle] }>
                      { rowData.title }
                    </Text>;
        if (rowData.description)
            title = (
                <View>
                  <View style={ styles.titleHeader }>
                    <Text style={ [styles.title, this.props.titleStyle] }>
                      { rowData.title }
                    </Text>
                    <Text style={ [styles.title, this.props.titleStyle] }>
                      { rowData.time }
                    </Text>
                  </View>
                  <Text style={ [styles.description, this.props.descriptionStyle] }>
                    { rowData.description }
                  </Text>
                </View>
            );
        return (
            <View style={ styles.container }>
              { title }
            </View>
            );
    }

    _renderCircle(rowData, sectionID, rowID) {
        const circleSize = rowData.circleSize ? rowData.circleSize : this.props.circleSize ? this.props.circleSize : defaultCircleSize;
        const circleColor = rowData.circleColor ? rowData.circleColor : this.props.circleColor ? this.props.circleColor : defaultCircleColor;
        const lineWidth = rowData.lineWidth ? rowData.lineWidth : this.props.lineWidth ? this.props.lineWidth : defaultLineWidth;

        const circleStyle = {
            width: this.state.x ? circleSize : 0,
            height: this.state.x ? circleSize : 0,
            borderRadius: circleSize / 2,
            backgroundColor: circleColor,
            left: 0
        };

        const dotStyle = {
            height: circleSize / 2,
            width: circleSize / 2,
            borderRadius: circleSize / 4,
            backgroundColor: rowData.dotColor ? rowData.dotColor : this.props.dotColor ? this.props.dotColor : defaultDotColor
        };
        const innerCircle = (<View style={ [styles.dot, dotStyle] } />);

        return (
            <View style={ [styles.circle, circleStyle, this.props.circleStyle] }>
              { innerCircle }
            </View>
            );
    }

    _renderSeparator() {
        if (this.isRenderSeparator)
            return (
                <View style={ [styles.separator, this.props.separatorStyle] } />
                );
        else
            return null;
    }
}

Timeline.defaultProps = {
    circleSize: defaultCircleSize,
    circleColor: defaultCircleColor,
    lineWidth: defaultLineWidth,
    lineColor: defaultLineColor
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listview: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row',
        flex: 1,
        //alignItems: 'stretch',
        justifyContent: 'center'
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 10,
        position: 'absolute',
        left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: defaultDotColor
    },
    title: {
        fontSize: 12
    },
    titleHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    details: {
        borderLeftWidth: defaultLineWidth,
        flexDirection: 'column',
        flex: 1
    },
    description: {
        marginTop: 10,
        fontSize: 12
    },
    separator: {
        height: 1,
        backgroundColor: '#aaa',
        marginTop: 10,
        marginBottom: 10
    }
});
