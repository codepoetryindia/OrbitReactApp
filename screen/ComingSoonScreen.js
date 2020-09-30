/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { metrics } from '../constants/GlobalStyle';

// import { WebView } from 'react-native-webview';

export default class ComingSoonScreen extends Component {
    componentDidMount() {
        console.log(global.web_url)
    }

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            header: null,
        }
    }

    onMenu = () => {
        this._drawer.open()
    }

    onComingSoon() {
        this.props.navigation.navigate('TabScreen')
    }
    render() {
        return (
            <SafeAreaView style={{ width: '100%', height: '100%' }}>
                    <HeaderComponent backTitle="Go Back" goBack={() => this.props.navigation.goBack()}></HeaderComponent>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>
                        Comming Soon !</Text>
                </View>
            </SafeAreaView>
        );
    }
}
const drawerStyles = {
    drawer: { shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 30 },
    main: { paddingLeft: 3 },
}

const styles = StyleSheet.create({
    icon_btn: {
        flex: 0.2,
        justifyContent: 'center'
    },
    icon: {
        alignSelf: 'center'
    },
    image: {
        width: 250 * metrics,
        height: 180 * metrics,
        resizeMode: 'stretch'
    },
    body: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    sb_body: {
        width: '85%',
        height: '100%',
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 100 * metrics
    }
})