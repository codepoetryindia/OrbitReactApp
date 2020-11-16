/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Picker,
} from "react-native";
import * as Colors from "../../constants/Colors";
import DetailHeaderComponent from "../../components/DetailHeaderComponent";
import TextComponent from "../../components/TextComponent";
import { RadioButton } from "react-native-paper";
import global_style, { metrics } from "../../constants/GlobalStyle";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "react-native-elements";
import TransactionService from "../../service/TransactionService";
import { alertMessage } from "../../utils/utils";
import { Fonts } from "../../constants/Fonts";
import CrmService from "../../service/CrmService";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import InvoiceService from "../../service/InvoiceService";
import Toast from 'react-native-simple-toast';

export default class InvoiceAdd extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      header: null,
    };
  };
    state = {
        isLoading : false,
        isReady : false,
        datePickerVisible:false,
        datePickerVisible2:false,        
        "partner_id": 60,
        "invoice_date": "01/03/2020",
        "due_date": "02/03/2020",
        "payment_term_id": false,
        "name": "Any reference title",
        "invoice_line_ids": [
              {
                  "product_id": "2",
                  "description": "Mango, Kind of Fruite and this is demo description",
                  "quantity": "15",
                  "tax_ids":15,
                  "price": "50"
              },
          ],
          "recurring": true,
          "recurring_type": "monthly",
          "recurring_interval": 1,
          "recurring_end": "after",
          "recurring_end_interval": 1
    }





    constructor(props) {
        super(props);
        this.SelectCustomer = this.SelectCustomer.bind(this);
        this.setCustomer = this.setCustomer.bind(this);
        this.setTerms = this.setTerms.bind(this);
        this.setProduct = this.setProduct.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
        this.openDatePicker2 = this.openDatePicker2.bind(this);
        this.hideDatepicker = this.hideDatepicker.bind(this);
        this.formatDate = this.formatDate.bind(this); 
        this.removeItem = this.removeItem.bind(this);

        this.state={
          isLoading : false,
          isReady : false,
          datePickerVisible:false,
          "partner_id": 60,
          "partner_name": '',
          "invoice_date": this.formatDate(new Date()),
          "due_date": this.formatDate(new Date()),
          "payment_term_id": false,
          "payment_term_name":'',
          "name": "Any reference title",
          invoice_line_ids: [
                // {
                //     "product_id": "2",
                //     "description": "Mango, Kind of Fruite and this is demo description",
                //     "quantity": "15",
                //     "tax_ids":15,
                //     "price": "50"
                // },
                // {
                //   "product_id": "3",
                //   "description": "Mango, Kind of Fruite and this is demo description",
                //   "quantity": "15",
                //   "tax_ids":15,
                //   "price": "50"
                // }
            ],
            "recurring": true,
            "recurring_type": "monthly",
            "recurring_interval": 1,
            "recurring_end": "after",
            "recurring_end_interval": 1,
            "subtotal":0,          
        }        
    }

    setCustomer(data){
      this.setState({partner_id:data.id, partner_name:data.name});
    }
    
    
    SelectCustomer(){
      this.props.navigation.navigate("CustomersList", {forSelect:true, setCustomer:this.setCustomer});
    }

    setProduct(data){
      console.log(data);
      this.setState(prevState =>({        
        invoice_line_ids:[...prevState.invoice_line_ids, data]
      })
    );

        let total = parseInt(data.price)* parseInt(data.quantity);
    this.setState(prevState =>({subtotal: prevState.subtotal + total }));              
  }
    
    
    SelectProduct(){
      this.props.navigation.navigate("AddItem", {forSelect:true, setProduct:this.setProduct});
    }



    setTerms(data){
      this.setState({payment_term_id:data.id, payment_term_name:data.name});
    }
    
    
    SelectTerms(){
      this.props.navigation.navigate("PaymentTerms", {forSelect:true, setTerms:this.setTerms});
    }

    openDatePicker(){
      this.setState({datePickerVisible:true});
    }

    openDatePicker2(){
      this.setState({datePickerVisible2:true});
    }

    hideDatepicker(){
      this.setState({datePickerVisible:false, datePickerVisible2:false});
    }


    formatDate(date){
      return format(date, "dd/MM/yyyy");
    }

    removeItem(data){
      let filteredArray = this.state.invoice_line_ids.filter(item => {
        return item.product_id != data.product_id
      })

      let total = 0;
      filteredArray.forEach(element => {
          total = total+  (parseInt(element.price)* parseInt(element.quantity));
      });
      this.setState({invoice_line_ids: filteredArray, subtotal: total});
    }

  componentDidMount() {
    console.log(global.bank_name);
    if (global.bank_name != undefined && global.bank_name != "") {
      this.setState({ name: global.bank_name });
    }
    CrmService.getCustomerList(global.token)
      .then((res) => {
        var data = res.data.result;
        if (data.success) {
          this.setState({ customer_list: data.response.records });
        } else {
          this.setState({ customer_list: [] });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  selectType = (value) => {
    this.setState({ pay_type: value });
  };

  checkReady = () => {
    console.log(this.state.sort_code);
    if (
      this.state.name != "" &&
      this.state.sort_code != "" &&
      this.state.account_number != "" &&
      this.state.account_number.length == 8 &&
      this.state.sort_code.length == 8
    ) {
      this.setState({ isReady: true });
    } else {
      this.setState({ isReady: false });
    }
  };

  add = () => {
    console.log(this.state);

    if (!this.state.isReady) {
      // return;
    }
    if (global.user_info == "") {
      return;
    }

    var obj = {
      partner_id: this.state.partner_id,
      invoice_date: this.state.invoice_date,
      due_date: this.state.due_date,
      payment_term_id: this.state.payment_term_id,
      invoice_line_ids: this.state.invoice_line_ids,
    };
    console.log("obj = ", obj);
    this.setState({ isLoading: true });
    InvoiceService.createInvoice(obj, global.token)
      .then((res) => {

        console.log(res);

        var data = res.data.result;
        if (typeof data == "undefined") {
          alertMessage("You must enter correct informations.");
        } else {
          if (data.success) {
            Toast.show(data.messasge, Toast.LONG);
            this.props.navigation.pop();

          } else {
            alertMessage(data.message);
          }
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        alertMessage(error.message);
        this.setState({ isLoading: false });
      });
  };



  render() {
    return (
      <SafeAreaView>
        <ScrollView style={{width:'100%', height:'100%'}}>
          <View style={styles.container}>
            <DetailHeaderComponent
              navigation={this.props.navigation}
              title="Add New Invoice"
              goBack={() => {
                this.props.navigation.goBack();
              }}
            />
            <View style={{ flex: 1 }}>
              <View />
              <View
                style={{
                  flexDirection: "column",
                  width: "85%",
                  height: "100%",
                  alignSelf: "center",
                }}
              >
                <View style={{ height: 30 * metrics, flexDirection: "row" }} />        
              <View style={styles.card}>
                <View style={styles.cardItem}>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight:'700' }}>Invoice Date: </Text>
                    <Text style={{ fontSize: 16 }}>{this.state.invoice_date}</Text>
                  </View>

                  <View>
                    <TouchableOpacity onPress={()=>this.openDatePicker()} style={styles.smallBtn}>
                      <Text>Select Date</Text>
                    </TouchableOpacity>

                    <DateTimePickerModal
                      isVisible={this.state.datePickerVisible}
                      mode="date"
                      onConfirm={(date)=>{this.setState({invoice_date:this.formatDate(date)}); this.hideDatepicker();}}
                      onCancel={()=>this.hideDatepicker()}
                    />


                  </View>
                </View>
                
                <View style={styles.cardItem}>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight:'700' }}>Due Date: </Text>
                    <Text style={{ fontSize: 16 }}>{this.state.due_date}</Text>
                  </View>
                <View>
                  <TouchableOpacity onPress={()=>this.openDatePicker2()} style={styles.smallBtn}>
                    <Text>Select Date</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                      isVisible={this.state.datePickerVisible2}
                      mode="date"
                      onConfirm={(date)=>{this.setState({due_date:this.formatDate(date)}); this.hideDatepicker(); }}
                      onCancel={()=>this.hideDatepicker()}
                    />

                  </View>
                </View>


              </View>



                <View
                  style={{
                    height: 50,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "grey",
                    borderRadius: 10,
                    backgroundColor: "white",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    marginBottom: 10,
                  }}
                >
                  <TouchableOpacity>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 16 }}>TO: </Text>
                      {
                        this.state.partner_name ? (
                          <Text style={{ fontSize: 16, color: "#000" }}>
                          {this.state.partner_name}
                        </Text>
                        ):(
                          <Text style={{ fontSize: 16, color: "grey" }}>
                          Customer
                        </Text>
                        )
                      }
                    </View>
                  </TouchableOpacity>

                  {
                        this.state.partner_name ? (
                          <TouchableOpacity onPress={()=>this.setState({partner_id:'', partner_name:''})}>
                          <Ionicons
                            name="ios-close"
                            size={30 * metrics}
                            style={{color:'#f00'}}
                          />
                        </TouchableOpacity>
                        ):(
                          <TouchableOpacity onPress={this.SelectCustomer}>
                          <Ionicons
                            name="ios-add-circle-outline"
                            size={30 * metrics}
                          />
                        </TouchableOpacity>
                        )
                      }
                </View>

                <View
                  style={{
                    height: 50,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "grey",
                    borderRadius: 10,
                    backgroundColor: "white",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    marginBottom: 10,
                  }}
                >
                  <View                       style={{
                        flex:1}} >
                    <View
                      style={{
                        flex:1,
                        width:'100%',
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                    <TouchableOpacity style={{flex:0.9}}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={{ fontSize: 16 }}>Payment Terms: </Text>
                        {
                          this.state.payment_term_name ? (
                            <Text style={{ fontSize: 16, color: "#000" }}>
                            {this.state.payment_term_name}
                          </Text>
                          ):(
                            <Text style={{ fontSize: 16, color: "grey" }}>
                            
                          </Text>
                          )
                        }
                      </View>
                    </TouchableOpacity>

                  {
                        this.state.payment_term_name ? (
                          <TouchableOpacity onPress={()=>this.setState({payment_term:'', payment_term_name:''})}>
                          <Ionicons
                            name="ios-close"
                            size={30 * metrics}
                            style={{color:'#f00'}}
                          />
                        </TouchableOpacity>
                        ):(
                          <TouchableOpacity onPress={()=>this.SelectTerms()}>
                          <Ionicons
                            name="ios-add-circle-outline"
                            size={30 * metrics}
                          />
                        </TouchableOpacity>
                        )
                      }
                    </View>
                  </View>
                </View>

                <View>
                <View
                      style={{
                        width: "100%",
                        height: 40,
                        backgroundColor: "#535050",
                        borderTopLeftRadius: 9,
                        borderTopRightRadius: 9,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,                        
                      }}
                    >
                      <Text style={{ fontSize: 16, color: "white" }}>
                        Add Products
                      </Text>
                      <TouchableOpacity onPress = {()=>{  this.SelectProduct()}}>
                    <Ionicons
                      name="ios-add-circle-outline"
                      size={30 * metrics}
                      style={{color:'#fff'}}
                    />
                  </TouchableOpacity>
                    </View>



                  <View
                    style={{
                      width: "100%",
                      borderWidth: 1,
                      borderColor: "grey",
                      borderRadius: 10,
                      backgroundColor: "white",
                      marginBottom: 10,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      padding:10
                    }}
                  >

                    {this.state.invoice_line_ids.length > 0 ? (

                        this.state.invoice_line_ids.map((item, index) =>{                        
                          return(
                            <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom:5                              
                            }}
                            key={index}
                          >
                            <Text style={{ fontSize: 16, color: "grey" , flex:0.8,fontWeight:'700'}}>
                              {item.description}
                            </Text>

                            <Text style={{ fontSize: 16, color: "black", fontWeight:'700'}}>
                            {item.quantity} * {item.price}
                            </Text>

                            <TouchableOpacity style={{flex:0.05}} onPress={()=>this.removeItem(item)}>
                              <Ionicons
                            name="ios-close"
                            size={30 * metrics}
                            style={{color:'#f00'}}
                          />
                            </TouchableOpacity>

                          </View>
                          )
                        })                                              
                    ) :(
                                          <View
                                          style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingBottom: 10,
                                          }}
                                        >
                                          <Text style={{ fontSize: 16, color: "grey" }}>
                                            No Items Added
                                          </Text>
                                        </View>
                    )}


                    {/* <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingHorizontal: 10,
                        marginBottom: 5,
                      }}
                    >
                      <Text style={{ fontSize: 16, color: "grey" }}>{total}</Text>
                    </View> */}


                                        <View
                                        style={{
                                          width: "100%",
                                          borderBottomLeftRadius: 9,
                                          borderBottomRightRadius: 9,
                                          flexDirection: "row",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          borderTopColor:'#cacaca',
                                          borderTopWidth:1,
                                          paddingVertical:10
                                        }}
                                      >
                                        <Text style={{ fontSize: 16, color: "#000", fontWeight:'700' }}>
                                          Subtotal
                                        </Text>
                                        <Text style={{ fontSize: 16, color: "#000" }}>
                                        {this.state.subtotal}
                                        </Text>
                                      </View>
                                      
                  
                                         
                  </View>
                </View>

                <View style={styles.bottom}>
                <TouchableOpacity
                  style={
                    this.state.isReady
                      ? global_style.bottom_active_btn
                      : global_style.bottom_btn
                  }
                  onPress={() => this.add()}
                >
                  <View style={global_style.btn_body}>
                    <Text style={global_style.left_text}>Save</Text>
                    <MaterialIcon
                      style={global_style.right_icon}
                      name="arrow-right"
                      size={25 * metrics}
                    />
                  </View>
                </TouchableOpacity>
              </View>

                {/* <TouchableOpacity>
                  <View
                    style={{
                      height: 150,
                      width: "100%",
                      borderWidth: 1,
                      borderColor: "grey",
                      borderRadius: 10,
                      backgroundColor: "white",
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>Discount</Text>
                      <Text style={{ fontSize: 16 }}>0.00</Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>Tax</Text>
                      <Text style={{ fontSize: 16 }}>0.00</Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>Total</Text>
                      <Text style={{ fontSize: 16 }}>0.00</Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>Payment</Text>
                      <Text style={{ fontSize: 16 }}>0.00</Text>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        height: 30,
                        backgroundColor: "#535050",
                        borderBottomLeftRadius: 9,
                        borderBottomRightRadius: 9,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text style={{ fontSize: 16, color: "white" }}>
                        Balance Due
                      </Text>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        $ 0.00
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity> */}

                {/* <TouchableOpacity>
                  <View
                    style={{
                      height: 40,
                      width: "100%",
                      borderWidth: 1,
                      borderColor: "grey",
                      backgroundColor: "white",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 10,
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 16, color: "grey" }}>
                        Customer
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <Ionicons name="ios-attach" size={25 * metrics} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View
                    style={{
                      height: 120,
                      width: "100%",
                      borderWidth: 1,
                      borderColor: "grey",
                      backgroundColor: "white",
                      justifyContent: "flex-start",
                      paddingHorizontal: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "grey" }}>Note</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </ScrollView>

        {this.state.isLoading && (
            <View style={global_style.loading_body}>
              <ActivityIndicator
                size={100}
                color={Colors.main_color}
                style={global_style.activityIndicator}
              />
            </View>
          )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  bottom: {
    width: "100%",
    alignSelf: "center",
  },
  check_body: {
    marginTop: 50 * metrics,
    flexDirection: "row",
  },
  check_item: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checked_title: {
    fontSize: 17 * metrics,
    fontFamily: Fonts.adobe_clean,
    color: Colors.main_color,
  },
  check_title: {
    fontSize: 17 * metrics,
    fontFamily: Fonts.adobe_clean,
    color: Colors.dark_gray,
  },
  picker_text: {
    marginBottom: -5,
    fontFamily: Fonts.adobe_clean,
    fontSize: 14 * metrics,
    color: Colors.gray_color,
    marginLeft: 4 * metrics,
  },

  card:{
      paddingVertical:10,
      width: "100%",
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 10,
      backgroundColor: "white",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginBottom: 10,
  },

  cardItem:{
    flex:1, flexDirection:'row', justifyContent:'space-between',marginBottom:10,
    alignItems:'center'
  },
  smallBtn:{
    backgroundColor:'#0f0',
    alignItems:'center',
    padding:5,
    borderRadius:5
  }
});
