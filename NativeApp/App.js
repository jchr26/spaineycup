import React, { Component } from 'react';
import { AppRegistry, Image, Text, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import HeaderBar from './headerBar';

export default class SpaineyCupMainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        data:[],
		section: 'News'
    }

	this.handleSectionChange = this.handleSectionChange.bind(this);
  }

  handleSectionChange(sectionSelected){
	this.setState({
		section: sectionSelected
    });
  }

  getData(){
    return fetch('http://127.0.0.1:8080/players/1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data: responseJson.player.name});
      })
      .catch((error) => {
        console.debug(error);
        this.setState({data: ""});
      });
  }

  componentDidMount(){
    this.getData();
  }

  render() {
    try {
        let name = this.state.data;

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
					onSectionChange={this.handleSectionChange}
				/>
            </View>
        </View>
    );

				//<Text style={styles.playerName}>{name}</Text>
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
			contentWidget = <NewsWidget/>;
		} 
		else if (this.props.navSection == "Players") {
			contentWidget = <PlayersWidget/>;
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

class NewsWidget extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<View style={{flex: 1}}>
				<Text style={styles.playerName}>Rendered NewsWidget</Text>
			</View>
		)
	}
}

class PlayersWidget extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<View style={{flex: 1}}>
				<Text style={styles.playerName}>Rendered PlayersWidget</Text>
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
        flex: 2,
        color: 'green',
        fontWeight: 'bold',
        fontSize: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'green',
         backgroundColor: 'darkseagreen'
    },
});
