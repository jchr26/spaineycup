import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import styles from './Styles'

export default class PlayerBioDetail extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let playerMainImage = { uri: this.props.playerMainImage.url };
        console.log('playerMainImage:' + this.props.playerMainImage.url);
        return (
            <View>
                <View style={styles.playerBioNameBox}>
                    <Text style={styles.playerName}>{this.props.playerName}</Text>
                </View>
                <View style={styles.playerBioNickNameBox}>
                    <Text style={styles.playerNickName}>"{this.props.playerNickName}"</Text>
                </View>
                <View style={styles.playerDetailBox}>
                    <Text style={styles.playerBio}>{this.props.playerBio}</Text>
                </View>
                <View style={styles.playerBioNickNameBox}>
                    <Text style={styles.playerNickName}>Vital Statistics</Text>
                </View>
                <View style={styles.playerVitalStatsBox}>
                    <Text style={{fontWeight: 'bold'}}>Age: <Text style={{fontWeight: 'normal'}}>{this.props.playerAge}</Text></Text>
                    <Text style={{fontWeight: 'bold'}}>Handicap: <Text style={{fontWeight: 'normal'}}>{this.props.playerHandicap}</Text></Text>
                    <Text style={{fontWeight: 'bold'}}>Best Finish: <Text style={{fontWeight: 'normal'}}>{this.props.playerBestfinish}</Text></Text>
                    <Text style={{fontWeight: 'bold'}}>Trademark Shot: <Text style={{fontWeight: 'normal'}}>{this.props.playerTrademark}</Text></Text>
                </View>
                <View style={styles.playerBioNickNameBox}>
                    <Text style={styles.playerNickName}>Greatest Tour Moments</Text>
                </View>
                <View style={styles.playerDetailBox}>
                    <Image source={playerMainImage} style={{width: this.props.playerMainImage.width, height: this.props.playerMainImage.height}} />
                </View>
            </View>
        );
    }
}

;
