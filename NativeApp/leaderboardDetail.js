import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import LeaderboardDetailRound from './leaderboardDetailRound';

import styles from './Styles'

export default class LeaderboardDetail extends Component {
    constructor(props){
        super(props);
    }

    getCompCourseData(courseData, compCourseId){
        let compCourseData = [];
        for (let i=0; i < courseData.length; i++){
            if (courseData[i].courseId == compCourseId) {
                compCourseData = courseData[i];
            }
        }
        return compCourseData;
    }

    render(){
        let compId = this.props.compId;
        let compName = this.props.compName;
        let compCourse = this.props.compCourse;
        let compCourseId = this.props.compCourseId;
        let courseData = this.props.courseData;
        let playerData = this.props.playerData;
        let compPoints = this.props.compPoints;

        // Maybe use scoreData to display individual rounds
        //let scoreData = this.props.scoreData;

        let compCourseData = this.getCompCourseData(courseData, compCourseId);

        let totalScores = [];

        for (let playerId in compPoints[compId.toString()]){
            totalScores[playerId] = compPoints[compId.toString()][playerId];
        }

        var tablePositions = [];
        for (i=0; i<playerData.length; i++){
            tablePositions[i] = i+1;
        }

        const tableHead = ['Pos', 'Player', 'Strokes', 'Points'];

        let tableData = [];
        for (i=0; i<totalScores.length; i++) {
            if (totalScores[i] == null) {
                console.log("i null:" + i);
                continue;
            }
            tableData[i] = [totalScores[i].playerName, totalScores[i].strokes, totalScores[i].points];
        }

        totalScores.sort(function(a,b){
            return a.points-b.points
        }).reverse(); 

        var detailRound = 
                    <LeaderboardDetailRound
                         compName={compName}
                         compId={compId}
                         compCourse={compCourse}
                         compCourseData={compCourseData}
                         compCourseId={compCourseId}
                         scoreData={this.props.scoreData} 
                         playerData={playerData[1]}
                         compPoints={this.props.compPoints} 
                    />;

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
                <View>
                    {detailRound}
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
