/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { firebase } from "@react-native-firebase/analytics";
import React, { Component } from "react";
import { Platform, Text, TextInput, View, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import SplashScreen from "react-native-splash-screen";
import * as Colors from "./constants/Colors";
import AppContainer from "./router/Router";
import PropTypes from "prop-types";
import messaging from "@react-native-firebase/messaging";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-community/async-storage";
import PushNotification from  "react-native-push-notification";
import NotifService from './service/NotifService';
import NavigationService from './service/NavigationService';


export default class App extends Component {


  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );

    this.onNotif = this.onNotif.bind(this);
  }

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(remoteMessage) { 
    if(remoteMessage.userInteraction){
          if(global.user_info && global.token ){
      switch(remoteMessage.data.type) {
        case "receive_money":
          // code block
          if(remoteMessage.foreground){
            NavigationService.resetRoute('TabScreen', {data:remoteMessage.data.data, openModal:true});
          }else{
            // NavigationService.navigate('TabScreen', {data:remoteMessage.data.record, openModal:true});
            NavigationService.navigate('LoginScreen', {data:remoteMessage.data.record, openModal:true});
          }
          break;
          case "account_blocked":
            // code block
            if(remoteMessage.foreground){
              return;
              // NavigationService.navigate('CompanyDetail', {data:remoteMessage.data.data, openModal:true});
            }else{
              // NavigationService.navigate('TabScreen', {data:remoteMessage.data.record, openModal:true});
              NavigationService.navigate('LoginScreen', {data:remoteMessage.data.record, openModal:true});
            }
            break;
            case "account_deactivated":
          // code block
          if(remoteMessage.foreground){
            return;
            // NavigationService.navigate('CompanyDetail', {data:remoteMessage.data.data, openModal:true});
          }else{
            // NavigationService.navigate('TabScreen', {data:remoteMessage.data.record, openModal:true});
            NavigationService.navigate('LoginScreen', {data:remoteMessage.data.record, openModal:true});
          }
          break;
        case "send_money":
            // code block
            if(remoteMessage.foreground){
                NavigationService.resetRoute('TabScreen', {data:remoteMessage.data.data, openModal:true, screen:'tab'});
            }else{
                NavigationService.navigate('LoginScreen', {data:remoteMessage.data.record, openModal:true});
            }
            
        break;
        case "card_block_admin":
          // code block
          if(remoteMessage.foreground){
            return;
              // NavigationService.resetRoute('TabScreen', {data:remoteMessage.data.data, openModal:true, screen:"card"});
          }else{
              NavigationService.navigate('LoginScreen', {data:remoteMessage.data.record, openModal:true});
          }
          
        break;

          case "kyc_approval":
                        // code block
            if(remoteMessage.foreground){
                NavigationService.resetRoute('TabScreen', {data:remoteMessage.data.data, openModal:false});
            }else{
                NavigationService.navigate('LoginScreen', {data:remoteMessage.data.record, openModal:true});
            }
        break;
            case "beneficiary_success":
                        // code block
              if(remoteMessage.foreground){
                  NavigationService.navigate('ManageBeneficiary', {data:remoteMessage.data.data, openModal:false});
              }else{
                          NavigationService.navigate('LoginScreen', {data:remoteMessage.data.record, openModal:true});
              }

            default:

          console.log("hello");
          // code block
      }
    } else {
      NavigationService.navigate('LoginScreen', {data:remoteMessage.data.record, openModal:true});
      return;
    }
         
    }else{
      this.notif.customNotification({title: remoteMessage.title, message:remoteMessage.message, data: remoteMessage.data.record, "type":remoteMessage.data.type});    
    }
  }


  
  componentDidMount() {
    if (Platform.OS == "android") {
      SplashScreen.hide();      
    }

    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;

    global.user_info = "";
    global.file_path = "";
    global.init_account = "false";
    this.getStorageData();
    // messaging().onMessage(async (remoteMessage) => {
      // console.log("remote messege", remoteMessage);
      // this.notif.customNotification({title: remoteMessage.title, message:remoteMessage.message});    
    // });
  }

  async getStorageData() {
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
    var steps = await AsyncStorage.getItem("steps");
    if (steps == null || steps == "") {
      global.steps = "Splash";
    } else {
      global.steps = steps;
    }
  }


  render() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: Colors.white_color,
        }}
      >
      <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
            this.navigator = navigatorRef;

          }}
        />
      </View>
    );
  }

  // render(){
  //   return(
  //   <View style={styles.container}>
  //   <Text style={styles.title}>
  //     Example app react-native-push-notification
  //   </Text>
  //   <View style={styles.spacer}></View>
  //   <TextInput
  //     style={styles.textField}
  //     value={this.state.registerToken}
  //     placeholder="Register token"
  //   />
  //   <View style={styles.spacer}></View>

  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.localNotif();
  //     }}>
  //     <Text>Local Notification (now)</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.localNotif('sample.mp3');
  //     }}>
  //     <Text>Local Notification with sound (now)</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.scheduleNotif();
  //     }}>
  //     <Text>Schedule Notification in 30s</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.scheduleNotif('sample.mp3');
  //     }}>
  //     <Text>Schedule Notification with sound in 30s</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.cancelNotif();
  //     }}>
  //     <Text>Cancel last notification (if any)</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.cancelAll();
  //     }}>
  //     <Text>Cancel all notifications</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.checkPermission(this.handlePerm.bind(this));
  //     }}>
  //     <Text>Check Permission</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.requestPermissions();
  //     }}>
  //     <Text>Request Permissions</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.abandonPermissions();
  //     }}>
  //     <Text>Abandon Permissions</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.getScheduledLocalNotifications(notifs => console.log(notifs));
  //     }}>
  //     <Text>Console.Log Scheduled Local Notifications</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.createOrUpdateChannel();
  //     }}>
  //     <Text>Create or update a channel</Text>
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => {
  //       this.notif.popInitialNotification();
  //     }}>
  //     <Text>popInitialNotification</Text>
  //   </TouchableOpacity>

  //   <View style={styles.spacer}></View>

  //   {this.state.fcmRegistered && <Text>FCM Configured !</Text>}

  //   <View style={styles.spacer}></View>
  // </View>
  //   )
  // }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
