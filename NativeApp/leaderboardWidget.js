import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './Styles'
import LeaderboardComps from './leaderboardComps';
import LeaderboardDetail from './leaderboardDetail';

export default class LeaderboardWidget extends Component {
	constructor(props){
		super(props);
	}
	render() {
        let comps = this.props.compData;
        let scores = this.props.scoreData;

        var compList = [];
        var defaultCompId = this.props.compId;

        for (var i = 0; i < comps.length; i++){
            let compId = i;
            
            compList.push(
                <TouchableOpacity onPress={() => {this.props.onCompIdChange(compId);this.refs._compDetailScrollView.scrollTo({x:0, y:0, animated: false})}} key={i} >
                <LeaderboardComps 
                    compHeroImage={comps[i].imgUrlHero}
                    compName={comps[i].name}
                    compCourse={comps[i].course}
                    compName={comps[defaultCompId].name}
                    compId={comps[defaultCompId].id}
                    compCourse={comps[defaultCompId].course}
                    scoreData={this.props.scoreData} 
                    playerData={this.props.playerData} 
                    compData={this.props.compData} 
                />
                </TouchableOpacity>
            );
        }

        var defaultComp = 
                    <LeaderboardDetail
                         compName={comps[defaultCompId].name}
                         compId={comps[defaultCompId].id}
                         compCourse={comps[defaultCompId].course}
                         scoreData={this.props.scoreData} 
                         playerData={this.props.playerData} 
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
            <View style={{flex: 1}}>
                <ScrollView horizontal={true} ref='_compPlayerDetailScrollView' showsHorizontalScrollIndicator={false}>
                   <Text>player round details</Text> 
                </ScrollView>
			</View>
			</View>
		)
	}
}
;
