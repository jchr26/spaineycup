import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import styles from './Styles'

export default class PlayersWidget extends Component {
	constructor(props){
		super(props);
	}
	render() {
        let player = this.props.playerData;
		return (
			<View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <ScrollView horizontal={true} ref='_playerImageListView'>
                        
                    </ScrollView>
			    </View>
				<View style={styles.playerInfoContainer}>
                    <Text style={styles.playerName}>{player.name}</Text>
                    <Text style={styles.playerBio}>{player.bio}</Text>
                    <Text style={styles.playerHandicap}>Handicap: {player.handicap}</Text>
                    <Text style={styles.playerHandicap}>Born: {player.dob}</Text>
                </View>
			</View>
		)
	}
}
;
