import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './Styles'
import PlayerBioSummary from './playerBioSummary';
import PlayerBioDetail from './playerBioDetail';

export default class PlayersWidget extends Component {
	constructor(props){
		super(props);
	}
	render() {
        let players = this.props.playerData;
        var playerList = [];
        var defaultPlayerId = this.props.playerId;

        for (var i = 0; i < players.length; i++){
            let playerId = i;
            
            playerList.push(
                <TouchableOpacity onPress={() => {this.props.onPlayerIdChange(playerId);this.refs._playerBioScrollView.scrollTo({x:0, y:0, animated: false})}} key={i} >
                <PlayerBioSummary 
                    playerHeroImage={players[i].imgUrlHero}
                    />
                </TouchableOpacity>
            );
            var defaultPlayer = 
                    <PlayerBioDetail
                         playerName={players[defaultPlayerId].name}
                         playerAge={players[defaultPlayerId].age}
                         playerHandicap={players[defaultPlayerId].handicap}
                         playerNickName={players[defaultPlayerId].nickname}
                         playerBestfinish={players[defaultPlayerId].bestfinish}
                         playerTrademark={players[defaultPlayerId].trademark}
                         playerMainImage={players[defaultPlayerId].imgUrlMain}
                         playerBio={players[defaultPlayerId].bio}
                    />;
        }

		return (
			<View style={{flex: 1}}>
                <View style={{flex: 1, marginBottom: 2, marginTop: 2}}>
                    <ScrollView horizontal={true} ref='_playerImageListView' showsHorizontalScrollIndicator={false}>
                        {playerList}
                    </ScrollView>
                </View>
                <View style={{flex: 2}}>
                    <ScrollView ref='_playerBioScrollView'>
                        {defaultPlayer}
                    </ScrollView>
			    </View>
			</View>
		)
	}
}
;
