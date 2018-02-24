import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import styles from './Styles';

export default class PlayerBioSummary extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let playerImage = { uri: this.props.playerHeroImage.url };
        return (
            <View style={styles.playerList}>
                <View style={styles.playerListImage}>
                    <Image source={playerImage} style={{width: 116, height: 200, marginLeft: 2}}/>
                </View>
            </View>
        );
    }
}
;
