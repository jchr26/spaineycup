import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import styles from './Styles'
import NewsStorySummary from './newsStorySummary';
import NewsStoryDetail from './newsStoryDetail';

export default class NewsWidget extends Component {
	constructor(props){
		super(props);
        this.state = {
            refreshing: false,
        };
	}

    _onRefresh() {
        this.setState({refreshing: true});
        this.getNewsData().then(() => {
            this.setState({refreshing: false});
        });
        this.render();
        console.log('re-rendered');
    }
  
    getNewsData(){
        return fetch('http://ec2-35-178-146-197.eu-west-2.compute.amazonaws.com/newsItems')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({newsData: responseJson});
                    console.log('newsItems' + responseJson);
                    console.log('newsItem:' + responseJson[5].title);
                this.props.newsData = this.state.newsData; 
            })
        .catch((error) => {
            console.debug(error);
            this.setState({newsData: ""});
        });
    }
    
	render() {
        let stories;
        if (this.state.newsData == null){
            stories = this.props.newsData;

        }
        else {
            console.log('using refreshed data from state');
            stories = this.state.newsData;
        }
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
                    storyDate={stories[i].createdate} 
                    />
                </TouchableOpacity>
            );

            var defaultStory = 
                        <NewsStoryDetail
                             storyTitle={stories[defaultStoryId].title}
                             storyHeroImage={stories[defaultStoryId].imgUrlHero}
                             storyMainImage={stories[defaultStoryId].imgUrlMain}
                             storyBody={stories[defaultStoryId].story}
                             storyDate={stories[defaultStoryId].createdate}
                        />;
        }

    
		return (
			<View style={{flex: 1}}>
                <View style={{flex: 1, marginBottom: 4}}>
                    <ScrollView ref='_storyScrollView'>
                        {defaultStory}
                    </ScrollView>
                </View>
                <View style={{flex: 1}}>
                    <ScrollView ref='_storyListScrollView' refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                    }>
                        {storyList}
                    </ScrollView>
			    </View>
            </View>
		)
	}
}
;
