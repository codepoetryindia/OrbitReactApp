/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet,Text, View , Image ,ActivityIndicator, ScrollView,SafeAreaView,BackHandler, TouchableOpacity, Alert, FlatList,RefreshControl} from 'react-native'
import * as Colors from '../../constants/Colors'
import * as Images from '../../constants/Image'
import DetailHeaderComponent from '../../components/DetailHeaderComponent'
import global_style, { metrics } from '../../constants/GlobalStyle';
import TransactionService from '../../service/TransactionService';
import InvoiceService from '../../service/InvoiceService';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {Fonts} from '../../constants/Fonts'
import { convertJSON } from '../../utils/utils';
import SimpleToast from 'react-native-simple-toast';
import Drawer from "react-native-drawer";
import SideMenuComponent from "../../components/SideMenuComponent";
import TabHeaderScreen from '../../components/TabHeaderScreen';
import {ListItem, Avatar, SearchBar} from 'react-native-elements';




export default class SettingTab extends Component {
    static navigationOptions = ({ navigation }) => {
		const { state } = navigation;
		return {
			header: null,
		}
    };

    constructor(props) {
        super(props);            
        this.state = {
          isShowDetail: false,
          isShowSide: false,
          item: null,
          isLoading: false,
          isRefresh:false
        };
      }

    openDrawer = () => {
        this.props.navigation.openDrawer();
        // this.setState({ isShowSide: true });
        // this._drawer.open();
      };
    
      closeDrawer = () => {
        this.setState({ isShowSide: false });
        this._drawer.close();
      };

    state = {
        isReady : false,
        isLoading : false,
        show_select : false,
        searchText:''
    }
    componentDidMount() {
    }
    componentWillReceiveProps () {
        this.componentDidMount()
    }


    render() {
        return (
            <SafeAreaView style={{flex:1, height:'100%', width:"100%", position:'relative', flexDirection:'column'}}>
                <View style={styles.container}>
                <TabHeaderScreen headerTitle="Setting" navigation = {this.props.navigation} showDrawer={() => this.openDrawer()}></TabHeaderScreen>                
                    <View style={{flex : 1}}>            
                        <View style={{flexDirection : 'column', width : '100%' , flex:1, alignSelf : 'center', alignItems:'center'}}>
                            <Text style={{textAlign:'center'}}>Coming Soon</Text>
                        </View>
                    </View>
                </View>
                {/* {
                    this.state.isLoading && 
                    <View style={global_style.loading_body}>
                        <ActivityIndicator size={100} color={Colors.main_color} style={global_style.activityIndicator}></ActivityIndicator>
                    </View>
                } */}
            </SafeAreaView>
        );
    }




}

const drawerStyles = {
    drawer: { shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 50, flex:1 },
    main: { paddingLeft: 3 },
  };

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        flexDirection : 'column',
        alignSelf : 'center',
    },
    bottom : {
        flex : 0.2 , width : '85%', alignSelf : 'center', justifyContent : 'center'
    },
    item : {
        flexDirection : 'row',
        flex: 1,
        paddingHorizontal:15,
        paddingVertical:10 
        // height : 90 * metrics, 
    }
});