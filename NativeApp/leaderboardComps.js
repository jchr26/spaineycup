import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './Styles';

export default class LeaderboardComps extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let comps = this.props.compData;
        let compImage = { uri: this.props.compHeroImage.url };
        let compName = this.props.compName;
        let compCourse = this.props.compCourse;
        var defaultCompId = this.props.compId;

        return (
                <View style={styles.playerList}>
                    <View style={styles.compBox}>
                        <Text style={styles.compName}>{compName}</Text>
                    </View>
                    <View style={styles.playerListImage}>
                        <Image source={compImage} style={{width: 262, height: 112, marginLeft: 2, borderColor: 'black', borderWidth: 1}}/>
                    </View>
                    <View style={styles.compBox}>
                        <Text style={styles.compCourse}>{compCourse}</Text>
                    </View>
                </View>
        );
    }
}
;
