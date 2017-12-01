import React, { Component } from 'react';
import { AppRegistry, Image, Text, View, StyleSheet } from 'react-native';
import NavigationBar from './navigationBar';
import TopNavigationBar from './topNavigationBar';
import HeaderBar from './headerBar';

export default class SpaineyCupMainPage extends Component {

  constructor() {
    super();
    this.state = {
        data:[]
    }
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
                <TopNavigationBar/>
            </View>
            <View style={{flex: 28, backgroundColor: 'lightgreen'}}>
                <Text style={styles.playerName}>{name}</Text>
            </View>
        </View>
    );
    } catch(error) {
        console.error(error);

    }
  }
}

const styles = StyleSheet.create({
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
