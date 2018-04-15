import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './Styles'
import LeaderboardComps from './leaderboardComps';
import LeaderboardDetail from './leaderboardDetail';
import LeaderboardDetailRound from './leaderboardDetailRound';

export default class LeaderboardWidget extends Component {
	constructor(props){
		super(props);
	}
	render() {
        let comps = this.props.compData;
        let compPoints = this.props.compPoints;

        var compList = [];
        var defaultCompId = this.props.compId;

        let sortedComps = {};

        // sort the comps
        for (let i = 0; i < comps.length; i++){
            let compId = comps[i].competitionId;
            
            sortedComps[compId] = {
                "competitionId": comps[i].competitionId,
                "course": comps[i].course,
                "courseId": comps[i].courseId,
                "name": comps[i].name,
                "imgUrlHero": comps[i].imgUrlHero
            }; 
        }

        // to make the competitions display in the order (Spainey Cup first (6))
        for (let compId in sortedComps){
            if (compId == 6) {
                console.log("Key = 6");
                compList.unshift(
                    <TouchableOpacity onPress={() => {this.props.onCompIdChange(compId);this.refs._compDetailScrollView.scrollTo({x:0, y:0, animated: false})}} key={compId} >
                        <LeaderboardComps
                            compHeroImage={sortedComps[compId].imgUrlHero}
                            compName={sortedComps[compId].name}
                            compCourse={sortedComps[compId].course}
                            compCourseId={sortedComps[compId].courseId}
                        />
                    </TouchableOpacity>
                );
            } else {
                compList.push(
                    <TouchableOpacity onPress={() => {this.props.onCompIdChange(compId);this.refs._compDetailScrollView.scrollTo({x:0, y:0, animated: false})}} key={compId} >
                        <LeaderboardComps
                            compHeroImage={sortedComps[compId].imgUrlHero}
                            compName={sortedComps[compId].name}
                            compCourseId={sortedComps[compId].courseId}
                            compCourse={sortedComps[compId].course}
                        />
                    </TouchableOpacity>
                );
            }
        }

        var defaultComp = 
                    <LeaderboardDetail
                         compName={sortedComps[defaultCompId].name}
                         compId={sortedComps[defaultCompId].competitionId}
                         compCourse={sortedComps[defaultCompId].course}
                         scoreData={this.props.scoreData} 
                         compCourseId={sortedComps[defaultCompId].courseId}
                         courseData={this.props.courseData} 
                         playerData={this.props.playerData} 
                         compPoints={this.props.compPoints} 
                    />;

        var defaultCompDetailRound = 
                    <LeaderboardDetailRound
                         compName={sortedComps[defaultCompId].name}
                         compId={sortedComps[defaultCompId].id}
                         compCourse={sortedComps[defaultCompId].course}
                         compCourseId={sortedComps[defaultCompId].courseId}
                         scoreData={this.props.scoreData} 
                         courseData={this.props.courseData} 
                         playerData={this.props.playerData} 
                         compPoints={this.props.compPoints} 
                    />;

		return (
			<View style={{flex: 4}}>
               <View style={{marginBottom: 2, marginTop: 2}}>
                    <ScrollView horizontal={true} ref='_compImageListView' showsHorizontalScrollIndicator={false}>
                        {compList}
                    </ScrollView>
                </View>
                <View>
                    <ScrollView ref='_compDetailScrollView'>
                        {defaultComp}
                    </ScrollView>
                </View>
			</View>
		)
	}
}
;
