import React, { Component } from 'react';
import { AppRegistry, Image, Text, View, StyleSheet, Button } from 'react-native';

export default class HeaderBar extends Component {
  render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };

    return (
        <View style={styles.headerBarContainer}>
               <Text>Cup</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    headerBarContainer: {
        flex: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: 'seagreen'
    },
});
