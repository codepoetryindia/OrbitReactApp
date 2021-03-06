/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet,Text, View , BackHandler ,SafeAreaView} from 'react-native'
import DetailHeaderComponent from '../../components/DetailHeaderComponent'
import { ScrollView } from 'react-native-gesture-handler'
import { metrics } from '../../constants/GlobalStyle'
import HelpService from "../../service/HelpService"
import {Fonts} from '../../constants/Fonts'

export default class TermsAndConditionScreen extends Component {
    static navigationOptions = ({ navigation }) => {
		const { state } = navigation;
		return {
			header: null,
		}
    };
    constructor(props) {
        super()
        this.state = {
            terms_arr : []
        }
    }
    componentDidMount () {
        HelpService.getTermsConditions().then(res => {
            var data = res.data.result
            if (data.success) {
                this.setState({terms_arr : data.response})
            } else {
                this.setState({terms_arr : []})
            }
        }).catch(error => {
            this.setState({terms_arr : []})
        })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <DetailHeaderComponent navigation={this.props.navigation}  title="Terms and Conditions" goBack ={() => this.props.navigation.goBack()}></DetailHeaderComponent>
                <ScrollView style={{width: '100%' ,height : '100%'}}>
                    {
                        this.state.terms_arr.map((item, idx) => {
                            return (
                                <View style={styles.body} key={idx}>
                                    <Text style={styles.header}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.description}>
                                        {item.note}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        flexDirection : 'column',
        alignSelf : 'center',
    },
    body : {
        width : '85%',
        height : '100%',
        alignSelf : 'center',
        paddingTop : 30 * metrics,
    },
    header : {
        fontSize : 18 * metrics,
        fontFamily : Fonts.adobe_clean,
        fontWeight : '500',
        color : '#000'
    },
    description : {
        fontSize : 17 * metrics,
        fontFamily : Fonts.adobe_clean,
        marginTop : 20 * metrics,
        marginBottom : 20 * metrics
    }
});