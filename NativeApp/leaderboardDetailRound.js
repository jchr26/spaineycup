import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import styles from './Styles'

export default class LeaderboardDetailRound extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const frontNine = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const backNine = ['10', '11', '12', '13', '14', '15', '16', '17', '18'];
        let foo = [3];
        let bar = [[4,3,5,7,7,8,5,3]];

        return (
            <View style={{flex: 1}}>
                <View>
                    <Table style={stylers.table}>
                        <Row data={frontNine} flexArr={[1, 1, 1, 1, 1, 1, 1, 1, 1]} style={stylers.head} textStyle={stylers.headerText}/>
                        <TableWrapper style={{flexDirection: 'row'}}>
                            <Col data={foo} style={stylers.row} textStyle={stylers.rowText}/>
                            <Rows data={bar} flexArr={[1, 1, 1, 1, 1, 1, 1, 1, 1]} style={stylers.row} textStyle={stylers.rowText}/>
                        </TableWrapper>
                        <Row data={backNine} flexArr={[1, 1, 1, 1, 1, 1, 1, 1, 1]} style={stylers.head} textStyle={stylers.headerText}/>
                        <TableWrapper style={{flexDirection: 'row'}}>
                            <Col data={foo} style={stylers.row} textStyle={stylers.rowText}/>
                            <Rows data={bar} flexArr={[1, 1, 1, 1, 1, 1, 1, 1, 1]} style={stylers.row} textStyle={stylers.rowText}/>
                        </TableWrapper>
                    </Table>
                </View>
                <View style={{flex: 2}}>
                </View>
            </View>
        );
    }

}

const stylers = StyleSheet.create({
  head: { height: 25, backgroundColor: 'darkblue' },
  row: { height: 25, backgroundColor: 'white' },
  headerText: { textAlign: 'center', color: 'white' },
  rowText: { textAlign: 'center', color: 'black' },
  text: { textAlign: 'center', color: 'red' },
  table: { marginTop: 2, marginLeft: 5, marginRight: 5 }
})
;
