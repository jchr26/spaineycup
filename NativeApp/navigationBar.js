import React, { Component } from 'react';
import { AppRegistry, Image, Text, View, StyleSheet, Button, Alert } from 'react-native';

export default class NavigationBar extends Component {

  render() {
    return (
        <View style={styles.navBar}>
            <View style={[styles.buttonContainer, styles.leftButton]}>
                <Button onPress={() => { Alert.alert('Clicked!') }} title="A"/>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => { Alert.alert('Clicked!') }} title="B"/>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => { Alert.alert('Clicked!') }} title="C"/>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => { Alert.alert('Clicked!') }} title="D"/>
            </View>
            <View style={[styles.buttonContainer, styles.rightButton]}>
                <Button onPress={() => { Alert.alert('Clicked!') }} title="E"/>
            </View>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: 'green',
        flex: 8, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
    },
    buttonContainer: {
        width: 50,
        height: 50,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
    },
    leftButton: {
        marginLeft: 20,
    },
    rightButton: {
        marginRight: 20,
    }
});
