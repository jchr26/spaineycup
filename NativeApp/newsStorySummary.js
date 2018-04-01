import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import styles from './Styles'
import Moment from 'moment';

export default class NewsStorySummary extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let storyImage = { uri: this.props.storyHeroImage.url };
        Moment.locale('en');
        var dt = this.props.storyDate;     
   
        return (
            <View style={styles.storyList}>
                <View style={styles.storyListImage}>
                    <Image source={storyImage} style={{width: 116, height: 56}}/>
                </View>
                <View style={styles.storyListTitleDate}>
                    <Text style={styles.storyListTitle}>{this.props.storyTitle}</Text>
                    <Text style={styles.storyListDate}>{Moment(dt).format('Do MMM YY')}</Text>
                </View>
            </View>
        );
    }
}
;
