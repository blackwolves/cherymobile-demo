import { random, range, round } from "lodash";
import React, { Component } from "react";
import { ScrollView, StyleSheet, Platform, Text } from "react-native";
import Svg from "react-native-svg";
import { VictoryAxis, VictoryChart, VictoryGroup, VictoryStack, VictoryCandlestick, VictoryErrorBar, VictoryBar, VictoryLine, VictoryArea, VictoryScatter, VictoryTooltip, VictoryZoomContainer, VictoryVoronoiContainer, VictorySelectionContainer, VictoryBrushContainer, VictoryCursorContainer, VictoryPie, VictoryLabel, VictoryLegend, createContainer } from "victory-native";

import { VictoryTheme } from "victory-core";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#e1d7cd",
        justifyContent: "center",
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 50
    },
    text: {
        fontSize: 18,
        fontFamily: (Platform.OS === "ios") ? "Menlo" : "monospace",
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 30
    }
});

const candleData = [
    {
        x: 1,
        open: 9,
        close: 30,
        high: 56,
        low: 7
    },
    {
        x: 2,
        open: 80,
        close: 40,
        high: 120,
        low: 10
    },
    {
        x: 3,
        open: 50,
        close: 80,
        high: 90,
        low: 20
    },
    {
        x: 4,
        open: 70,
        close: 22,
        high: 70,
        low: 5
    },
    {
        x: 5,
        open: 20,
        close: 35,
        high: 50,
        low: 10
    },
    {
        x: 6,
        open: 35,
        close: 30,
        high: 40,
        low: 3
    },
    {
        x: 7,
        open: 30,
        close: 90,
        high: 95,
        low: 30
    },
    {
        x: 8,
        open: 80,
        close: 81,
        high: 83,
        low: 75
    }
];

const legendData = [{
    name: "Series 1",
    symbol: {
        type: "circle",
        fill: "green"
    }
}, {
    name: "Long Series Name",
    symbol: {
        type: "triangleUp",
        fill: "blue"
    }
}, {
    name: "Series 3",
    symbol: {
        type: "diamond",
        fill: "pink"
    }
}, {
    name: "Series 4",
    symbol: {
        type: "plus"
    }
}, {
    name: "Series 5",
    symbol: {
        type: "star",
        fill: "red"
    },
    labels: {
        fill: "purple"
    }
}, {
    name: "Series 6",
    symbol: {
        type: "circle",
        fill: "orange"
    },
    labels: {
        fill: "blue"
    }
}];

const legendStyle = {
    parent: {
        marginBottom: 20
    }
};

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export default class ChartScreen extends Component {
    static navigatorStyle = {
        tabBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            scrollEnabled: true,
            y: this.getYFunction(),
            style: this.getStyles(),
            transitionData: this.getTransitionData(),
            randomData: this.generateRandomData(),
            staticRandomData: this.generateRandomData(15),
            data: this.getData()
        };
    }

    componentDidMount() {
        //setInterval(this.updateDemoData.bind(this), 3000);
    }

    getYFunction() {
        const n = random(2, 7);
        return (data) => Math.exp(-n * data.x) * Math.sin(2 * n * Math.PI * data.x);
    }

    generateRandomData(points = 6) {
        return range(1, points + 1).map((i) => ({
            x: i,
            y: i + random(-1, 2)
        }));
    }

    getData() {
        return range(1, 10).map((i) => ({
            x: i,
            y: random(1, 10)
        }));
    }

    getStyles() {
        const colors = [
            "red", "orange", "magenta",
            "gold", "blue", "purple"
        ];
        return {
            stroke: colors[random(0, 5)],
            strokeWidth: random(1, 5)
        };
    }

    getTransitionData() {
        const n = random(4, 10);
        return range(n).map((i) => {
            return {
                x: i,
                y: random(2, 10)
            };
        });
    }

    changeScroll(scrollEnabled) {
        this.setState({
            scrollEnabled
        });
    }

    updateDemoData() {
        this.setState({
            y: this.getYFunction(),
            style: this.getStyles(),
            transitionData: this.getTransitionData(),
            randomData: this.generateRandomData(),
            data: this.getData()
        });
    }

    render() {
        return (
            <ScrollView
                        contentContainerStyle={ styles.container }
                        scrollEnabled={ this.state.scrollEnabled }>
              <VictoryLegend
                             data={ legendData }
                             style={ legendStyle } />
              <VictoryLegend
                             data={ legendData }
                             itemsPerRow={ 4 }
                             orientation="horizontal"
                             style={ legendStyle } />
              <VictoryChart
                            polar={ true }
                            theme={ VictoryTheme.material }>
                <VictoryBar
                            style={ { data: { fill: "tomato", opacity: 0.5 } } }
                            data={ [{ x: 15, y: 20, label: 1, fill: "red" }, { x: 25, y: 30, label: 2, fill: "orange" }, { x: 35, y: 65, label: 3, fill: "gold" }, { x: 40, y: 50, label: 4, fill: "blue" }, { x: 45, y: 40, label: 5, fill: "cyan" }, { x: 50, y: 30, label: 6, fill: "green" }] } />
                <VictoryScatter
                                style={ { data: { fill: "black" } } }
                                data={ [{ x: 15, y: 20 }, { x: 25, y: 30 }, { x: 35, y: 65 }, { x: 40, y: 50 }, { x: 45, y: 40 }, { x: 50, y: 30 }] } />
              </VictoryChart>
              <Text style={ styles.text }>
                { "VictoryCursorContainer" }
              </Text>
              <VictoryChart containerComponent={ <VictoryCursorContainer
                                                                         onTouchStart={ () => this.changeScroll(false) }
                                                                         onTouchEnd={ () => this.changeScroll(true) }
                                                                         cursorLabel={ (d) => (`${round(d.x, 2)} , ${round(d.y, 2)}`) } /> }>
                <VictoryAxis tickLabelComponent={ <VictoryLabel angle={ 45 } /> } />
                <VictoryBar/>
              </VictoryChart>
              <Text style={ styles.text }>
                { "VictoryBrushContainer" }
              </Text>
              <VictoryChart containerComponent={ <VictoryBrushContainer
                                                                        onTouchStart={ () => this.changeScroll(false) }
                                                                        onTouchEnd={ () => this.changeScroll(true) }
                                                                        selectionStyle={ { fill: "blue", fillOpacity: 0.1 } } /> }>
                <VictoryBar/>
              </VictoryChart>
              <Text style={ styles.text }>
                { "VictorySelectionContainer" }
              </Text>
              <VictoryChart containerComponent={ <VictorySelectionContainer
                                                                            onTouchStart={ () => this.changeScroll(false) }
                                                                            onTouchEnd={ () => this.changeScroll(true) } /> }>
                <VictoryScatter
                                data={ this.state.staticRandomData }
                                style={ { data: { fill: (d, active) => active ? "tomato" : "gray" } } } />
              </VictoryChart>
              <Text style={ styles.text }>
                { "VictoryZoomContainer" }
              </Text>
              <VictoryChart containerComponent={ <VictoryZoomContainer
                                                                       onTouchStart={ () => this.changeScroll(false) }
                                                                       onTouchEnd={ () => this.changeScroll(true) } /> }>
                <VictoryBar/>
              </VictoryChart>
              <Text style={ styles.text }>
                { "VictoryVoronoiContainer" }
              </Text>
              <VictoryChart containerComponent={ <VictoryVoronoiContainer
                                                                          onTouchStart={ () => this.changeScroll(false) }
                                                                          onTouchEnd={ () => this.changeScroll(true) }
                                                                          labels={ (d) => `( ${d.x} , ${d.y} )` } /> }>
                <VictoryLine data={ this.state.staticRandomData } />
              </VictoryChart>
              <Text style={ styles.text }>
                { 'createContainer("zoom", "voronoi")' }
              </Text>
              <VictoryChart containerComponent={ <VictoryZoomVoronoiContainer
                                                                              onTouchStart={ () => this.changeScroll(false) }
                                                                              onTouchEnd={ () => this.changeScroll(true) }
                                                                              labels={ (d) => `( ${d.x} , ${d.y} )` }
                                                                              dimension={ "x" } /> }>
                <VictoryScatter data={ this.state.staticRandomData } />
              </VictoryChart>
              <Text style={ styles.text }>
                { "<VictoryPie/>" }
              </Text>
              <VictoryPie
                          innerRadius={ 75 }
                          labelRadius={ 125 }
                          style={ { labels: { fontSize: 20 } } }
                          data={ this.state.randomData }
                          animate={ { duration: 1500 } } />
              <VictoryPie style={ { data: { stroke: "none", opacity: 0.3 } } } />
              <VictoryPie innerRadius={ 90 } />
              <VictoryPie
                          endAngle={ 90 }
                          startAngle={ -90 } />
              <VictoryPie
                          endAngle={ 90 }
                          innerRadius={ 90 }
                          padAngle={ 5 }
                          startAngle={ -90 } />
              <VictoryPie
                          style={ { labels: { fill: "white", stroke: "none", fontSize: 15, fontWeight: "bold" } } }
                          data={ [{ x: "<5", y: 6279 }, { x: "5-13", y: 9182 }, { x: "14-17", y: 5511 }, { x: "18-24", y: 7164 }, { x: "25-44", y: 6716 }, { x: "45-64", y: 4263 }, { x: "≥65", y: 7502 }] }
                          innerRadius={ 70 }
                          labelRadius={ 100 }
                          colorScale={ ["#D85F49", "#F66D3B", "#D92E1D", "#D73C4C", "#FFAF59", "#E28300", "#F6A57F"] } />
              <VictoryPie
                          style={ { data: { stroke: (data) => data.y > 75 ? "black" : "none", opacity: (data) => data.y > 75 ? 1 : 0.4 } } }
                          data={ [{ x: "Cat", y: 62 }, { x: "Dog", y: 91 }, { x: "Fish", y: 55 }, { x: "Bird", y: 55 }] } />
              <Text style={ styles.text }>
                { "<VictoryChart/>" }
              </Text>
              <VictoryChart>
                <VictoryBar/>
                <VictoryLine/>
              </VictoryChart>
              <VictoryChart>
                <VictoryCandlestick data={ candleData } />
              </VictoryChart>
              <VictoryChart domain={ { x: [0, 4] } }>
                <VictoryGroup
                              labels={ ["a", "b", "c"] }
                              offset={ 10 }
                              colorScale={ "qualitative" }>
                  <VictoryBar data={ [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }] } />
                  <VictoryBar data={ [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }] } />
                  <VictoryBar data={ [{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }] } />
                </VictoryGroup>
              </VictoryChart>
              <VictoryChart>
                <VictoryScatter data={ [{ x: 1, y: 3, fill: "red", symbol: "plus", size: 6, label: "Red" }, { x: 2, y: 5, fill: "magenta", size: 9, opacity: 0.4, label: "Magenta" }, { x: 3, y: 4, fill: "orange", size: 5, label: "Orange" }, { x: 4, y: 2, fill: "brown", symbol: "square", size: 6, label: "Brown" }, { x: 5, y: 5, fill: "black", symbol: "triangleUp", size: 5, label: "Black" }] } />
              </VictoryChart>
              <VictoryChart animate={ { duration: 2000 } }>
                <VictoryBar
                            labels={ () => "Hi" }
                            data={ this.state.transitionData }
                            style={ { data: { fill: "tomato", width: 12 } } }
                            animate={ { onExit: { duration: 500, before: () => ({ y: 0, fill: "orange", label: "BYE" }) } } } />
              </VictoryChart>
              <VictoryChart>
                <VictoryStack>
                  <VictoryArea data={ [{ x: "a", y: 2 }, { x: "b", y: 3 }, { x: "c", y: 5 }, { x: "d", y: 4 }, { x: "e", y: 7 }] } />
                  <VictoryArea data={ [{ x: "a", y: 1 }, { x: "b", y: 4 }, { x: "c", y: 5 }, { x: "d", y: 7 }, { x: "e", y: 5 }] } />
                  <VictoryArea data={ [{ x: "a", y: 3 }, { x: "b", y: 2 }, { x: "c", y: 6 }, { x: "d", y: 2 }, { x: "e", y: 6 }] } />
                  <VictoryArea data={ [{ x: "a", y: 2 }, { x: "b", y: 3 }, { x: "c", y: 3 }, { x: "d", y: 4 }, { x: "e", y: 7 }] } />
                </VictoryStack>
              </VictoryChart>
            </ScrollView>
            );
    }
}
