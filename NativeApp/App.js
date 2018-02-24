import React, { Component } from 'react';
import { AppRegistry, Image, Text, View, StyleSheet, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';

import styles from './Styles';
import HeaderBar from './headerBar';
import TopNavigationBar from './topNavigationBar';
import NewsWidget from './newsWidget';
import PlayersWidget from './playersWidget';

export default class SpaineyCupMainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        data:[],
        newsData:[],
		newsItemId: 0,
		playerId: 0,
		section: 'News'
    }

	this.handleSectionChange = this.handleSectionChange.bind(this);
	this.handleNewsItemIdChange = this.handleNewsItemIdChange.bind(this);
	this.handlePlayerIdChange = this.handlePlayerIdChange.bind(this);
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

  handlePlayerIdChange(newsItemId){
    console.log('Setting playerId state:' + playerId);
	this.setState({
		playerId: playerId
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
                    playerData={this.state.playerData}
                    playerId={this.state.playerId}
                    newsData={this.state.newsData}
                    newsItemId={this.state.newsItemId}
					onSectionChange={this.handleSectionChange}
					onNewsItemIdChange={this.handleNewsItemIdChange}
					onPlayerIdChange={this.handlePlayerIdChange}
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
	}

    handleNewsItemChange(newsItemId){
        this.props.onNewsItemIdChange(newsItemId);
    }

    handlePlayerChange(playerId){
        this.props.onPlayerIdChange(playerId);
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
