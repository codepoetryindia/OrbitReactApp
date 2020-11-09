/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet,Text, View , Image ,ActivityIndicator, ScrollView,SafeAreaView,BackHandler, TouchableOpacity, Alert} from 'react-native'
import * as Colors from '../../constants/Colors'
import * as Images from '../../constants/Image'
import DetailHeaderComponent from '../../components/DetailHeaderComponent'
import global_style, { metrics } from '../../constants/GlobalStyle';
import TransactionService from '../../service/TransactionService';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {Fonts} from '../../constants/Fonts'
import { convertJSON } from '../../utils/utils';
import SimpleToast from 'react-native-simple-toast';
import Drawer from "react-native-drawer";
import SideMenuComponent from "../../components/SideMenuComponent";
import TabHeaderScreen from '../../components/TabHeaderScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InvoiceService from '../../service/InvoiceService';





export default class DashboardTab extends Component {
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
          bills_to_pay: 0,
            contacts: 0,
            customer_invoices: 0,
            profite_and_loss : 0
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
        beneficiaries_arr : [],
        isReady : false,
        isLoading : false,
        show_select : false
    }
    componentDidMount() {
        this.getData();
    }
    componentWillReceiveProps () {
        this.componentDidMount()
    }




    getData(){
        console.log("calling");
        this.setState({isLoading : true})
        InvoiceService.getDashboard({},global.token).then(res => {
            var data = res.data.result
            console.log('data = ' , data)
            if (data.success) {
                this.setState({bills_to_pay : data.data.bills_to_pay});
                this.setState({contacts : data.data.contacts});
                this.setState({customer_invoices : data.data.customer_invoices});
                this.setState({profite_and_loss : data.data.profit_and_loss});
            } else {
                this.setState({bills_to_pay : 0});
                this.setState({contacts : 0});
                this.setState({customer_invoices : 0});
                this.setState({profite_and_loss : 0});
            }
            this.setState({isLoading : false})
        }).catch(error => {
            console.log('error = ' , error.message)
            this.setState({isLoading : false})
        })
    }



    render() {
        return (
            
            <SafeAreaView style={{flex:1, height:'100%', width:"100%", position:'relative', flexDirection:'column'}}>
                    
                <View style={styles.container}>
                {
                    this.state.isLoading && 
                    <View style={[global_style.loading_body, {zIndex:555555}]}>
                        <ActivityIndicator size={100} color={Colors.main_color} style={global_style.activityIndicator}></ActivityIndicator>
                    </View>
                }


                <TabHeaderScreen headerTitle="Account" navigation = {this.props.navigation} showDrawer={() => this.openDrawer()}></TabHeaderScreen>
                    <View style={{flex : 1, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around', alignItems:'center', paddingTop:100, paddingHorizontal:15 }} >
                    
                         <TouchableOpacity style={styles.card}>
                            <View style={styles.cardView}>
                                <Ionicons name="ios-apps" color={Colors.main_color} size={50*metrics} />    
                                <Text>Profit & Loss</Text>
                            </View>
            <Text style={styles.cardTitle}>{this.state.profite_and_loss}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card}>
                            <View style={styles.cardView}>
                                <Ionicons name="ios-clipboard" color={Colors.main_color} size={50*metrics} />    
                                <Text>Sale Invoices</Text>
                            </View>
            <Text style={styles.cardTitle}>{this.state.customer_invoices}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card}>
                            <View style={styles.cardView}>
                                <Ionicons name="ios-document" color={Colors.main_color} size={50*metrics} />    
                                <Text>Bills</Text>
                            </View>
            <Text style={styles.cardTitle}>{this.state.bills_to_pay}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card}>
                            <View style={styles.cardView}>
                                <Ionicons name="ios-people" color={Colors.main_color} size={50*metrics} />    
                                <Text>Contacts</Text>
                            </View>
            <Text style={styles.cardTitle}>{this.state.contacts}</Text>
                        </TouchableOpacity> 


                    </View> 
                </View>
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
        flex: 0.80, 
        // height : 90 * metrics, 
    },
    card:{

        width: '45%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // elevation: 5,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#000',
        backgroundColor:'#fff',
        marginBottom:20,
    },cardView:{
        alignItems:'center',
        marginBottom:10,
        borderBottomColor: '#efefef',
        borderBottomWidth: 1,
        padding:10,
        width:'100%'
    },cardTitle:{
        fontWeight:'700',
        fontSize:22,
        marginBottom:10
    }
    
});