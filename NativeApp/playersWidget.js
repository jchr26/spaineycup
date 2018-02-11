import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import styles from './Styles'

export default class PlayersWidget extends Component {
	constructor(props){
		super(props);
	}
	render() {
        let player = this.props.sectionData;
		return (
			<View style={{flex: 1}}>
				<View style={styles.playerImageContainer}>
				    <Text>Rendered PlayersWidget</Text>
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
