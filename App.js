/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { firebase } from '@react-native-firebase/analytics';
import React, { Component } from 'react';
import { AsyncStorage, Platform, Text, TextInput, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Colors from './constants/Colors';
import Router from './router/Router';



export default class App extends Component {
  componentDidMount () {
    if (Platform.OS == 'android') {
      SplashScreen.hide();
    }
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;

    global.user_info = ''
    global.file_path = ''
    global.init_account = 'false'
    this.getStorageData()
  }



  async getStorageData () {
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
    var steps = await AsyncStorage.getItem('steps')
    if (steps == null || steps == '') {
      global.steps = "Splash"
    } else {
      global.steps = steps
    }
  }

  render() {
    return (
      <View style={{width : '100%' , height : '100%', backgroundColor : Colors.white_color}}>
        {/* <View
          style={{
            height: StatusBar.currentHeight,
          }}>
        </View> */}
        <Router ref={nav => { this.navigator = nav; }}/>
      </View>
    );
  }
}