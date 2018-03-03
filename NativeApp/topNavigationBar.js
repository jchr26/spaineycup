import React, { Component } from 'react';
import { AppRegistry, Image, Text, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import styles from './Styles'

export default class TopNavigationBar extends Component {

  constructor(props){
	super(props);
  } 

  handleSectionChange(sectionName){
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
                <Button color='white' onPress={() => { this.handleSectionChange('Leader Board') }} title="Leader Board"/>
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
        </ScrollView>
    );
    }
}

;
