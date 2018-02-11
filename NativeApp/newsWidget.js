import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './Styles'
import NewsStorySummary from './newsStorySummary';
import NewsStoryDetail from './newsStoryDetail';

export default class NewsWidget extends Component {
	constructor(props){
		super(props);
	}
    
	render() {
        let stories = this.props.newsData;
        var storyList = [];
        var defaultStoryId = this.props.newsItemId;

        for (var i = 0; i < stories.length; i++){
            let newsItemId = i;
            
            storyList.push(
                <TouchableOpacity onPress={() => {this.props.onNewsItemIdChange(newsItemId);this.refs._storyScrollView.scrollTo({x:0, y:0, animated: false})}} key={i} >
                <NewsStorySummary
                    storyTitle={stories[i].title}
                    storyHeroImage={stories[i].imgUrlHero}
                    storyMainImage={stories[i].imgUrlMain}
                    storyDate={stories[i].date} 
                    />
                </TouchableOpacity>
            );

            var defaultStory = 
                        <NewsStoryDetail
                             storyTitle={stories[defaultStoryId].title}
                             storyHeroImage={stories[defaultStoryId].imgUrlHero}
                             storyMainImage={stories[defaultStoryId].imgUrlMain}
                             storyBody={stories[defaultStoryId].story}
                             storyDate={stories[defaultStoryId].date}
                        />;
        }

    
		return (
			<View style={{flex: 1}}>
                <View style={{flex: 2, marginBottom: 4}}>
                    <ScrollView ref='_storyScrollView'>
                        {defaultStory}
                    </ScrollView>
                </View>
                <View style={{flex: 1}}>
                    <ScrollView ref='_storyListScrollView'>
                        {storyList}
                    </ScrollView>
			    </View>
            </View>
		)
	}
}
;
