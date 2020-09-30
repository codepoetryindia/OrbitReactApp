import React from 'react';
import {Text, View, Button} from 'react-native';
import WebView from 'react-native-webview';
import FastImage from 'react-native-fast-image';


export default class MyWebView extends React.Component {
    static navigationOptions = {
        title: 'Link'
    };

    // constructor(props) {
    //     super(props);
    // }
    

    render() {
        const {navigation} = this.props;
        var url = navigation.getParam('imageurl','www.mishi.ai');
        if(url.startsWith('data:image')){
            return (
                <FastImage
                    style={{ minWidth: 250, minHeight: 800}}
                    source={{
                        uri: url,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            )
        }
        return (
            <WebView
                useWebKit={false}
                source={{uri: navigation.getParam('imageurl', 'www.mishi.ai')}}
                // style={{marginTop: 20}}
            />
        );
    }
}