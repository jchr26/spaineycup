import React, { Component } from 'react';
import { AppRegistry, Image, Text, View, StyleSheet, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';

import styles from './Styles';
import HeaderBar from './headerBar';
import TopNavigationBar from './topNavigationBar';
import NewsWidget from './newsWidget';
import PlayersWidget from './playersWidget';
import LeaderboardWidget from './leaderboardWidget';

export default class SpaineyCupMainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        data:[],
        newsData:[],
        compData:[],
        scoreData:[],
		newsItemId: 0,
		playerId: 0,
		compId: 0,
		section: 'News'
    }

	this.handleSectionChange = this.handleSectionChange.bind(this);
	this.handleNewsItemIdChange = this.handleNewsItemIdChange.bind(this);
	this.handlePlayerIdChange = this.handlePlayerIdChange.bind(this);
	this.handleCompIdChange = this.handleCompIdChange.bind(this);
  }

  handleSectionChange(sectionSelected){
	this.setState({
		section: sectionSelected
    });
  }

  handleNewsItemIdChange(newsItemId){
    console.log('Setting newsItemId state:' + newsItemId);
	this.setState({
		newsItemId: newsItemId
    });
  }

  handlePlayerIdChange(playerId){
    console.log('Setting playerId state:' + playerId);
	this.setState({
		playerId: playerId
    });
  }

  handleCompIdChange(compId){
    console.log('Setting compId state:' + compId);
	this.setState({
		compId: compId
    });
  }

  getPlayerData(){
    return fetch('http://127.0.0.1:8080/players')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({playerData: responseJson});
        console.log('players' + responseJson);
        console.log('player' + responseJson[0].name);
      })
      .catch((error) => {
        console.debug(error);
        this.setState({playerData: ""});
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

  getCompData(){
    return fetch('http://127.0.0.1:8080/competitions')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({compData: responseJson});
        console.log('competitions' + responseJson);
        console.log('competition:' + responseJson[0].name);
      })
      .catch((error) => {
        console.debug(error);
        this.setState({compData: ""});
      });
  }

  getScoreData(){
    return fetch('http://127.0.0.1:8080/scores')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({scoreData: responseJson});
        console.log('scores' + responseJson[0]['competitions']['1'].status);
      })
      .catch((error) => {
        console.debug(error);
        this.setState({scoreData: ""});
      });
  }

  componentDidMount(){
    this.getPlayerData();
    this.getNewsData();
    this.getCompData();
    this.getScoreData();
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
                    playerData={this.state.playerData}
                    playerId={this.state.playerId}
                    newsData={this.state.newsData}
                    newsItemId={this.state.newsItemId}
                    compData={this.state.compData}
                    scoreData={this.state.scoreData}
                    compId={this.state.compId}
					onSectionChange={this.handleSectionChange}
					onNewsItemIdChange={this.handleNewsItemIdChange}
					onPlayerIdChange={this.handlePlayerIdChange}
					onCompIdChange={this.handleCompIdChange}
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
	    this.handleNewsItemChange = this.handleNewsItemChange.bind(this);
	    this.handlePlayerChange = this.handlePlayerChange.bind(this);
	    this.handleCompChange = this.handleCompChange.bind(this);
	}

    handleNewsItemChange(newsItemId){
        this.props.onNewsItemIdChange(newsItemId);
    }

    handlePlayerChange(playerId){
        this.props.onPlayerIdChange(playerId);
    }

    handleCompChange(compId){
        this.props.onCompIdChange(compId);
    }

	render() {
	    const NEWS = 'News';
	    let contentWidget = '';

		if (this.props.navSection == "News") {
			contentWidget = <NewsWidget
                                newsData={this.props.newsData}
                                newsItemId={this.props.newsItemId}  
					            onNewsItemIdChange={this.handleNewsItemChange}
                            />;

		} 
		else if (this.props.navSection == "Players") {
			contentWidget = <PlayersWidget
                                playerData={this.props.playerData} 
                                playerId={this.props.playerId}  
					            onPlayerIdChange={this.handlePlayerChange}

                            />;
		}
		else if (this.props.navSection == "Leader Board") {
			contentWidget = <LeaderboardWidget
                                compId={this.props.compId}  
                                compData={this.props.compData} 
                                scoreData={this.props.scoreData} 
                                playerData={this.props.playerData} 
					            onCompIdChange={this.handleCompChange}
                            />;
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


;
