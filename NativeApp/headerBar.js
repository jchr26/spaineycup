import React, { Component } from 'react';
import { AppRegistry, Image, Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';

export default class HeaderBar extends Component {
  render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };

    return (
        <View style={styles.headerBarContainer}>
            <View style={styles.headerAvatar}>
               <TouchableHighlight onPress={() => {Alert.alert('Profile')}}>
                   <Image source={require('./assets/loggedoutAvatar.png')} style={{width: 26, height: 31}}/> 
               </TouchableHighlight>
            </View>
            <View style={styles.logoTrophy}>
               <Image source={require('./assets/trophy_icon.png')} style={{marginTop: 20, width: 30, height: 30}}/> 
               <Text style={{ color: 'white', marginBottom: 4}}>Spainey Cup 2018</Text>
            </View>
            <View style={styles.rightNav}>
               <TouchableHighlight onPress={() => {Alert.alert('Nav')}}>
                <View style={styles.rightNavBlock}>
                    <View style={styles.rightNavStrip}/>
                    <View style={styles.rightNavStrip}/>
                    <View style={styles.rightNavStrip}/>
                </View>
                </TouchableHighlight>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    headerBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: 'seagreen'
    },
    logoTrophy: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerAvatar: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 50,
        marginLeft: 10,
    },
    rightNav: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'flex-end',
        height: 50,
        marginRight: 10,
    },
    rightNavBlock: {
        marginTop: 20,
        backgroundColor: 'darkgreen',
        width: 26,
        height: 25,
    },
    rightNavStrip: {
        backgroundColor: 'honeydew',
        height: 4,
        margin: 2,
    }
});
