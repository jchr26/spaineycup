import React, { Component } from 'react';
import { AppRegistry, Image, Text, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';

export default class TopNavigationBar extends Component {

  render() {
    return (
        <ScrollView style={{flex: 1}} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { Alert.alert('Clicked!') }} title="News"/>
				<View style={{width: 1, backgroundColor: 'white'}}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { Alert.alert('Clicked!') }} title="Players"/>
				<View style={{width: 1, backgroundColor: 'white'}}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { Alert.alert('Clicked!') }} title="Scores"/>
				<View style={{width: 1, backgroundColor: 'white'}}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { Alert.alert('Clicked!') }} title="Clips"/>
				<View style={{width: 1, backgroundColor: 'white'}}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { Alert.alert('Clicked!') }} title="Gallery"/>
				<View style={{width: 1, backgroundColor: 'white'}}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button color='white' onPress={() => { Alert.alert('Clicked!') }} title="Trivia"/>
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
		
	}
});
