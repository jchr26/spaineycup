import React, { Component } from 'react';
import { AppRegistry, Image, Text, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import HeaderBar from './headerBar';

export default class SpaineyCupMainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        data:[],
        newsData:[],
		section: 'News'
    }

	this.handleSectionChange = this.handleSectionChange.bind(this);
  }

  handleSectionChange(sectionSelected){
	this.setState({
		section: sectionSelected
    });
  }

  getPlayerData(){
    return fetch('http://127.0.0.1:8080/players/2')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data: responseJson.player});
        console.log('player' + responseJson.player);
      })
      .catch((error) => {
        console.debug(error);
        this.setState({data: ""});
      });
  }

  getNewsData(){
    return fetch('http://127.0.0.1:8080/newsItems')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({newsData: responseJson});
        console.log('newsItems' + responseJson);
        console.log('newsItem:' + responseJson[0].title);
      })
      .catch((error) => {
        console.debug(error);
        this.setState({newsData: ""});
      });
  }

  componentDidMount(){
    this.getPlayerData();
    this.getNewsData();
  }

  render() {
    try {

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 4}}>
                <HeaderBar/>
            </View>
            <View style={{flex: 2, backgroundColor: 'darkgreen'}}>
                <TopNavigationBar 
					navSection={this.state.section}
					onSectionChange={this.handleSectionChange}
				/>
            </View>
            <View style={{flex: 28, backgroundColor: 'lightgreen'}}>
				<ContentContainer
					navSection={this.state.section}
                    sectionData={this.state.data}
                    newsData={this.state.newsData}
					onSectionChange={this.handleSectionChange}
				/>
            </View>
        </View>
    );

    } catch(error) {
        console.error(error);

    }
  }
}

class ContentContainer extends Component {
	
	constructor(props){
		super(props);
	}

	render() {
	    const NEWS = 'News';
	    let contentWidget = '';

		if (this.props.navSection == "News") {
			contentWidget = <NewsWidget
                                newsData={this.props.newsData} />;
		} 
		else if (this.props.navSection == "Players") {
			contentWidget = <PlayersWidget
                                sectionData={this.props.sectionData} />;
		}
		else {
			contentWidget = <Text style={styles.playerName}>{this.props.navSection}</Text>;
		}	
	 
		return (
			<View style={{flex: 1}}>
				{contentWidget}
			</View>
		)
	}
}

class NewsStorySummary extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={styles.storyList}>
                <View style={styles.storyListImage}>
                    <Image source={require('./assets/loggedoutAvatar.png')} style={{width: 26, height: 31}}/>
                </View>
                <View style={styles.storyListTitleDate}>
                    <Text style={styles.storyListTitle}>{this.props.storyTitle}</Text>
                    <Text style={styles.storyListDate}>{this.props.storyDate}</Text>
                </View>
            </View>
        );
    }
}

class NewsStoryDetail extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={styles.storyDetailBox}>
                    <Image source={require('./assets/loggedoutAvatar.png')} style={{width: 26, height: 31}}/>
                    <Text style={styles.storyTitle}>{this.props.storyTitle}</Text>
                    <Text style={styles.storyBody}>{this.props.storyBody}</Text>
                    <Text style={styles.storyDate}>{this.props.storyDate}</Text>
            </View>
        );
    }
}

class NewsWidget extends Component {
	constructor(props){
		super(props);
	}

	render() {
        let stories = this.props.newsData;
        var storyList = [];
        var defaultStory;
        for (var i = 0; i < stories.length; i++){
            storyList.push(
                <NewsStorySummary
                    storyTitle={stories[i].title}
                    storyHeroImage={stories[i].imgUrl}
                    storyDate={stories[i].date} 
                    key={i}
                    />
            );
            if (i == 0) {
                defaultStory = <NewsStoryDetail
                                   storyTitle={stories[0].title}
                                   storyHeroImage={stories[0].imgUrl}
                                   storyBody={stories[0].story}
                                   storyDate={stories[0].date}
                               />;
            }
        }

    
		return (
			<View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <ScrollView>
                        {defaultStory}
                    </ScrollView>
                </View>
                <View style={{flex: 1}}>
                    <ScrollView>
                        {storyList}
                    </ScrollView>
			    </View>
            </View>
		)
	}
}

class PlayersWidget extends Component {
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

class TopNavigationBar extends Component {

  constructor(props){
	super(props);
  } 

  handleSectionChange(sectionName){
	console.log('set nav value:' + sectionName);
    this.props.onSectionChange(sectionName);
  }

  render() {
    return (
        <ScrollView style={{flex: 1}} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { this.handleSectionChange('News') }} title="News"/>
				<View style={{width: 1, backgroundColor: 'white'}}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { this.handleSectionChange('Players') }} value={this.props.navSection} title="Players"/>
				<View style={{width: 1, backgroundColor: 'white'}}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { this.handleSectionChange('Scores') }} title="Scores"/>
				<View style={{width: 1, backgroundColor: 'white'}}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { this.handleSectionChange('Clips') }} title="Clips"/>
				<View style={{width: 1, backgroundColor: 'white'}}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { this.handleSectionChange('Gallery') }} title="Gallery"/>
				<View style={{width: 1, backgroundColor: 'white'}}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { this.handleSectionChange('Trivia') }} title="Trivia"/>
				<View style={{width: 1, backgroundColor: 'white'}}/>
            </View>
        </ScrollView>
    );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'darkgreen',
		flex: 1,
		flexDirection: 'row',
    },
	buttonStyle: {
		width: 150,
	},
	buttonContainerSelected: {
		
	},
    playerName: {
        flex: 1,
        color: 'green',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    playerBio: {
        flex: 10,
        color: 'darkgreen',
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    playerHandicap: {
        color: 'darkgreen',
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    playerImageContainer: {
        flex: 2,
        borderStyle: 'solid',
        borderWidth: 2,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        borderColor: 'seagreen',
        backgroundColor: 'lightgreen'
    },
    playerInfoContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderStyle: 'solid',
        borderWidth: 2,
        marginTop: 0,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        borderColor: 'seagreen',
        backgroundColor: 'lightgreen'
    },
    storyList: {
        flex: 1,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 2,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        borderColor: 'seagreen',
        backgroundColor: '#ccffcc'
    },
    storyListImage: {
        borderStyle: 'solid',
        borderWidth: 2,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        width: 150,
        height: 100,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    storyDetailBox: {
        flexWrap: 'wrap',
        borderStyle: 'solid',
        borderWidth: 1,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    storyListTitleDate: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    storyListTitle: {
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    storyListDate: {
        flexWrap: 'wrap',
        color: 'black',
        fontSize: 14,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    storyDate: {
        flexWrap: 'wrap',
        color: 'black',
        fontSize: 14,
        marginTop: 14,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    storyBody: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    storyTitle: {
        flex: 1,
        flexWrap: 'wrap',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
    },
});
