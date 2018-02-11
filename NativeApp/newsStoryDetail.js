import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import styles from './Styles'

export default class NewsStoryDetail extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let storyMainImage = { uri: this.props.storyMainImage.url };
        console.log('storyMainImage:' + this.props.storyMainImage.url);
        return (
            <View style={styles.storyDetailBox}>
                    <Image source={storyMainImage} style={{width: this.props.storyMainImage.width, height: this.props.storyMainImage.height}} />
                    <Text style={styles.storyTitle}>{this.props.storyTitle}</Text>
                    <Text style={styles.storyBody}>{this.props.storyBody}</Text>
                    <Text style={styles.storyDate}>{this.props.storyDate}</Text>
            </View>
        );
    }
}

;
