/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet,Text, View , Image ,ActivityIndicator, ScrollView,SafeAreaView,BackHandler, TouchableOpacity, Alert, FlatList, RefreshControl, Modal, Switch} from 'react-native'
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';





export default class PaymentTerms extends Component {
    static navigationOptions = ({ navigation }) => {
		const { state } = navigation;
		return {
			header: null,
		}
    };

    constructor(props) {
        super(props);
        this.searchFilterFunction = this.searchFilterFunction.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.ListEmpty = this.ListEmpty.bind(this);    
        this.onRefresh = this.onRefresh.bind(this);       
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);   
        this.FilterData = this.FilterData.bind(this);
        this.setTerms = this.setTerms.bind(this);
                

        this.state = {
          isShowDetail: false,
          isShowSide: false,
          item: null,
          isLoading: false,
          isRefresh:false,
          isOpenModal:false,
          company_type:'',
          isPerson:false,
          isCompany:false,
          isActive:false,
          active:'',
          forSelect:false,   
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
        Customers : [],
        isReady : false,
        isLoading : false,
        show_select : false,
        searchText:''
    }
    componentDidMount() {
        let data = this.props.navigation.getParam('forSelect', false)
        if(data){
            console.log("data");
            this.setState({forSelect:true});
        }

        if (global.is_accounting) {
            this.setState({show_select : true})
        }
        this.getPaymentTerms();
    }
    componentWillReceiveProps () {
        this.componentDidMount()
    }


    setTerms(data){
        if(this.state.forSelect){
             console.log(this.props.navigation.state);
             this.props.navigation.state.params.setTerms(data);
             this.props.navigation.pop();
         }
     }
 



    renderHeader = () => {
        const {searchText} = this.state;
        return (
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{flex:1, paddingRight:5}}>
                <SearchBar
                    placeholder="Type Here..."
                    lightTheme
                    showLoading={this.state.isLoading}
                    onChangeText={(text) => this.searchFilterFunction(text)}
                    autoCorrect={false}
                    value={searchText}
                />
            </View>
          </View>
        );
      };

      searchFilterFunction = (text) => {
        this.setState({
          searchText: text,
        });

        let obj = {};
        if(this.state.company_type){
            obj.company_type = this.state.company_type;
        }
        if(this.state.active){
            obj.active = this.state.active;
        }

        this.getPaymentTerms(text, obj);
        // const newData = this.arrayholder.filter((item) => {
        //   const itemData = `${item.PainterName.toUpperCase()}`;
        //   const textData = text.toUpperCase();
    
        //   return itemData.indexOf(textData) > -1;
        // });
        // this.setState({
        //   FlatListItems: newData,
        // });
      };


    getPaymentTerms(text = '', data={}){
        let obj = {
            "name":text,
            ...data
        };

        this.setState({isLoading : true})
        InvoiceService.getPaymentTerms(obj, global.token).then(res => {
            var data = res.data.result
            console.log('data = ' , data)
            if (data.success) {
                var data_arr = data.response.records
                this.setState({Customers : data_arr})
            } else {
                this.setState({Customers : []})
            }
            this.setState({isLoading : false})
            this.setState({isRefresh:false});
        }).catch(error => {
            console.log('error = ' , error.message)
            this.setState({isLoading : false})
            this.setState({isRefresh:false});
        })
    }

    FilterData(){

        let obj = {};
        if(this.state.company_type){
            obj.company_type = this.state.company_type;
        }
        if(this.state.active){
            obj.active = this.state.active;
        }
        this.getPaymentTerms(this.state.searchText, obj);
        this.closeModal();
    }


    renderItem({ item, idx }){
        return (
                                    <View key={idx} style={{flex:1, flexDirection:'row', paddingVertical:5,         borderBottomWidth : 1 ,
                                        borderBottomColor : Colors.white_gray_color}}>
                                            <TouchableOpacity style={styles.item} onPress={()=>this.setTerms(item)}>
                                                <View style={{flex : 0.05}}></View>
                                                <View style={{flex : 0.2 , justifyContent : 'center', alignItems : 'center'}}>
                                                    {
                                                        !item.rb_beneficiary_icon ?
                                                        <EvilIcons name="pencil" style={{fontFamily : Fonts.adobe_clean,fontSize : 60 * metrics, color : Colors.main_color,alignSelf : 'flex-start'}}></EvilIcons>
                                                        :
                                                        <Image source={{uri : 'data:image/png;base64,' + item.rb_beneficiary_icon}} style={{width :50 * metrics,alignSelf : 'flex-start', height : 50 * metrics, borderRadius : 100 ,resizeMode : 'cover'}}></Image>    
                                                    }
                                                </View>
                                                <View style={{flex : 0.5,flexDirection : 'column', justifyContent : 'center', paddingVertical:10}}>
                                                    <Text style={{fontFamily : Fonts.adobe_clean,fontSize : 18 * metrics , color : 'black'}}>{item.name}</Text>
                                                    <View style={{marginTop : 5 * metrics}}></View>
                                                    <View style={{flexDirection : 'column'}}>
                                                        <View style={{flexDirection : 'row'}}>
                                                            <Text style={{fontFamily : Fonts.adobe_clean,fontSize : 14 * metrics, color : '#000', marginRight : 10 * metrics}}>Note : </Text>
                                                            <Text style={{fontFamily : Fonts.adobe_clean,fontSize : 14 * metrics, color : Colors.gray_color}}>{item.note}</Text>
                                                        </View>
                                                    </View>
                                                    
                                                </View>
                                            </TouchableOpacity>
                                        </View> 
        );
    }

    ListEmpty(){
        return (
            !this.state.isLoading ? (
                <View style={{paddingTop:100}}>
                <Text style={{textAlign:'center', fontWeight:'700', fontSize:20, color:'#bcbcbc'}}>No Items Found</Text>  
            </View>
            ):null
        );
    }

    onRefresh(){
        this.setState({isRefresh : true})
        this.getPaymentTerms();
    }


    closeModal(){
        this.setState({isOpenModal : false})
    }
    openModal(){
        this.setState({isOpenModal : true})
    }
    



    render() {
        return (
            <SafeAreaView style={{flex:1, height:'100%', width:"100%", position:'relative', flexDirection:'column'}}>
                <View style={styles.container}>
                <DetailHeaderComponent navigation={this.props.navigation}  title="Select Terms" goBack ={() => {
                        this.props.navigation.goBack()
                    }}></DetailHeaderComponent>
                   
                    <View style={{flex : 1}}>            
                        <ScrollView style={{flexDirection : 'column', width : '100%' , alignSelf : 'center'}}>
                            <FlatList
                                data={this.state.Customers}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.id.toString()}
                                ListHeaderComponent={this.renderHeader}
                                ListEmptyComponent={this.ListEmpty}
                                refreshControl={
                                    <RefreshControl
                                        //refresh control used for the Pull to Refresh
                                        refreshing={this.state.isRefresh}
                                        onRefresh={()=>{
                                            this.onRefresh();
                                        }}
                                    />}
                            />
                        </ScrollView>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.isOpenModal}
                        onRequestClose={() => {
                        //   Alert.alert("Modal has been closed.");
                        this.closeModal();
                        }}
                    >
                        <View style={styles.modalContainer}>
                            
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>
                                    Search Filter
                                </Text> 
                                <TouchableOpacity style={styles.modalCloseButton} onPress={this.closeModal}>
                                    <Ionicons name="ios-close" size={35} style={styles.modalCloseIcon}></Ionicons>
                                </TouchableOpacity>
                            </View>

                            <View style={{flex:1}}>
                            {/* <View style={styles.inputBox}>
                                <Text style={styles.inputlabel}>Filter</Text>
                                <RNPickerSelect
                                        onValueChange={(value) => console.log(value)}
                                        items={[
                                            { label: 'Person', value: 'football' },
                                            { label: 'Company', value: 'baseball' },
                                            { label: 'Hockey', value: 'hockey' },
                                        ]}
                                        useNativeAndroidPickerStyle={false}
                                                    placeholder={{
              label: 'Select an option',
              value: null,
              color: 'red',
            }}
                                        textInputProps={{ underlineColor: 'yellow' }}
                                        style={{
                                            ...pickerSelectStyles,
                                            iconContainer: {
                                              top: 10,
                                              right: 10,
                                              zIndex:555555
                                            },
                                            placeholder: {
                                              color: '#6b6b6b',
                                              fontSize: 14,
                                              fontWeight: 'bold',
                                            },
                                          }}
                                          Icon={() => {
                                            return <Ionicons name="ios-arrow-dropdown" size={24} color="gray" />;
                                          }}
                                    />
                            </View> */}

                            <View style={styles.inputBoxSwitch}>
                                <View style={{flex:1}}>
                                    <Text style={styles.inputlabel}>Persons</Text>
                                    <Text style={styles.inputDes}>You can find only that customers, where company_type = person</Text>
                                </View>                        
                                <View style={{width:80}}>
                                    <Switch
                                            trackColor={{ false: "#767577", true: "#bdc3c7" }}
                                            thumbColor={this.state.isPerson? Colors.main_color : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            value={this.state.isPerson}
                                            onValueChange={(value)=> {
                                                if(value){
                                                    this.setState({company_type:'person', isPerson:true, isCompany:false})
                                                }else{
                                                    this.setState({company_type:'', isPerson:false, isCompany:false})
                                                }
                                            }}                                            
                                        />
                                </View>
                            </View>

                            <View style={styles.inputBoxSwitch}>
                                <View style={{flex:1}}>
                                    <Text style={styles.inputlabel}>Companies</Text>
                                    <Text style={styles.inputDes}>You can find only that customers, where company_type = company</Text>
                                </View>                        
                                <View style={{width:80}}>
                                    <Switch
                                            trackColor={{ false: "#767577", true: "#bdc3c7" }}
                                            thumbColor={this.state.isCompany? Colors.main_color : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            value={this.state.isCompany}
                                            onValueChange={(value)=> {
                                                if(value){
                                                    this.setState({company_type:'person', isCompany:true, isPerson:false})
                                                }else{
                                                    this.setState({company_type:'', isCompany:false, isPerson:false})
                                                }
                                            }}
                                        />
                                </View>
                            </View>

                            <View style={styles.inputBoxSwitch}>
                                <View style={{flex:1}}>
                                    <Text style={styles.inputlabel}>Archived</Text>
                                    <Text style={styles.inputDes}>You can find only archived customers</Text>
                                </View>                        
                                <View style={{width:80}}>
                                    <Switch
                                            trackColor={{ false: "#767577", true: "#bdc3c7" }}
                                            thumbColor={this.state.isActive? Colors.main_color : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            value={this.state.isActive}
                                            onValueChange={(value)=> {
                                                if(value){
                                                    this.setState({active:'False',isActive:true})
                                                }else{
                                                    this.setState({active:'', isActive:false})
                                                }
                                            }}
                                            
                                        />
                                </View>
                            </View>


                                
                            </View>


                            <View style={styles.modalFooter}>
                                    <TouchableOpacity style={[styles.footerButton, {backgroundColor:'gray'}]} onPress={this.closeModal}>
                                        <Text style={styles.footerButtonText}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.footerButton} onPress={this.FilterData}>
                                        <Text style={styles.footerButtonText}>Filter</Text>
                                    </TouchableOpacity>
                            </View>

                        </View>


                    </Modal>  


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
        flex: 0.80, 
        // height : 90 * metrics, 
    },
    modalContainer:{
        padding:10,
        flex:1,
    },
    modalHeader:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:30
    },
    modalTitle:{
        fontWeight:'700',
        fontSize:25,
        textAlign:'center',
        color:'#4a4a4a',        
    },
    modalCloseButton:{
        width:30,
        height:30,
        borderColor:'#f00',
        borderWidth:1,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
    },
    modalCloseIcon:{
        color:'#f00',
        fontWeight:'700'
    },
    inputBox:{
        padding:5,
        marginBottom:15,
        // borderColor:'#000',
        // borderWidth:1
    },
    inputBoxSwitch:{
        padding:5,
        marginBottom:15,
        flexDirection:'row',
        alignItems:'center'
    },
    inputlabel:{
        fontSize:18,
        fontWeight:'700',
        color:'#000',
        marginBottom:5
    },

    inputDes:{
        color:'#4a4a4a',
    },
    modalFooter:{
        borderTopColor:'#eee',
        borderTopWidth:1,
        paddingTop:10,
        flexDirection:'row',
        justifyContent:'space-between'        
    },
    footerButton:{
        width:'45%',
        backgroundColor:Colors.main_color,
        padding:10,
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    footerButtonText:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'700',
        fontSize:16
    }


});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#cacaca',
      borderRadius: 0,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });