import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import Moment from 'moment'
import styles from './Styles'

export default class NewsStoryDetail extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let storyMainImage = { uri: this.props.storyMainImage.url };
        Moment.locale('en');
        var dt = this.props.storyDate;     
        
        return (
            <View style={styles.storyDetailBox}>
                    <Image source={storyMainImage} style={{width: this.props.storyMainImage.width, height: this.props.storyMainImage.height}} />
                    <Text style={styles.storyTitle}>{this.props.storyTitle}</Text>
                    <Text style={styles.storyBody}>{this.props.storyBody}</Text>
                    <Text style={styles.storyDate}>{Moment(dt).format('Do MMM YY')}</Text>
            </View>
        );
    }
}

;
