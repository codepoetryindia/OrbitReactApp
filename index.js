/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from  "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';

YellowBox.ignoreWarnings([
  "Warning: ViewPagerAndroid has been extracted",
])


AppRegistry.registerComponent(appName, () => App);

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


    
// messaging().onNotificationOpenedApp(remoteMessage => {
//   console.log('Notification caused app to open from background state:', remoteMessage.notification);
// });