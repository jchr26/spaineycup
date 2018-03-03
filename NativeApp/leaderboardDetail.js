import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import styles from './Styles'

export default class LeaderboardDetail extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let compId = this.props.compId;
        let compName = this.props.compName;
        let compCourse = this.props.compCourse;
        let scoreData = this.props.scoreData;
        let playerData = this.props.playerData;

        // Loop through players, get their score data and total up strokes
        // Also rank leaders by stroke (initially)

        let playerArr = [];

        // get the players data (is this necessary?)
        for (var i=0; i < playerData.length; i++){
            playerArr[i] = {
                            "playerId": playerData[i].id,
                            "name": playerData[i].name, 
                            "handicap": playerData[i].handicap,
                            };
        }

        let totalScores = [];
        for (var i=0; i < playerArr.length; i++){
            let playerId = playerArr[i].playerId;
            totalScores[i] = [];
            totalScores[i]['playerName'] = playerArr[i].name.toUpperCase();
            totalScores[i]['strokes'] = 0;
            totalScores[i]['points'] = 0;

            try {
                let playerCompHoles = scoreData[0]['competitions'][compId]['players'][playerId]['holes'];
                for (var j=1; j <= 18; j++){
                    totalScores[i].strokes = totalScores[i].strokes + playerCompHoles[j].strokes;            
                }
            }
            catch(e) {
                console.log('Error loading scores for playerId: ' + playerId); 
            }
        }

        totalScores.sort(function(a,b){
            return a.strokes-b.strokes
        })

        var tablePositions = [];
        for (i=0; i<playerArr.length; i++){
            tablePositions[i] = i+1;
        }

        const tableHead = ['Pos', 'Player', 'Strokes', 'Points'];

        let tableData = [];
        for (i=0; i<totalScores.length; i++) {
            tableData[i] = [totalScores[i].playerName, totalScores[i].strokes, totalScores[i].points];
        }

        return (
            <View>
                <View style={styles.compNameTitleBox}>
                    <Text style={styles.compNameTitle}>{compName}</Text>
                </View>
                <View>
                    <Text style={styles.compCourseTitle}>{compCourse}</Text>
                </View>
                <View>
                    <Table style={stylers.table}>
                        <Row data={tableHead} flexArr={[1, 4, 1, 1]} style={stylers.head} textStyle={stylers.headerText}/>
                        <TableWrapper style={{flexDirection: 'row'}}>
                            <Col data={tablePositions} style={stylers.title} heightArr={[25,25]} textStyle={stylers.text}/>
                            <Rows data={tableData} flexArr={[4, 1, 1]} style={stylers.row} textStyle={stylers.rowText}/>
                        </TableWrapper>
                    </Table>
                </View>
            </View>
        );
    }
}

const stylers = StyleSheet.create({
  head: { height: 25, backgroundColor: 'seagreen' },
  title: { flex: 1, backgroundColor: 'yellow' },
  row: { height: 25, backgroundColor: 'white' },
  headerText: { textAlign: 'center', color: 'black' },
  rowText: { marginLeft: 5, textAlign: 'left', color: 'black' },
  text: { textAlign: 'center', color: 'red' },
  table: { marginLeft: 5, marginRight: 5 }
})

;
