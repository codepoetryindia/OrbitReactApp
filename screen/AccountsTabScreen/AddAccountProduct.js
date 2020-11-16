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
  TextInput,
  Picker,
} from "react-native";
import DetailHeaderComponent from "../../components/DetailHeaderComponent";
import TextComponent from "../../components/TextComponent";
import { RadioButton } from "react-native-paper";
import * as Colors from "../../constants/Colors";
import global_style, { metrics } from "../../constants/GlobalStyle";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "react-native-elements";
import TransactionService from "../../service/TransactionService";
import InvoiceService from "../../service/InvoiceService";
import { alertMessage } from "../../utils/utils";
import { Fonts } from "../../constants/Fonts";
import CrmService from "../../service/CrmService";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';

export default class AddAccountProduct extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      header: null,
    };
  };


  state = {
    isLoading: false,
    isReady: false,    
  };

  constructor(props) {
    super(props);
    this.selectProductImage = this.selectProductImage.bind(this);
    this.checkReady = this.checkReady.bind(this);
    this.getProductCategories = this.getProductCategories.bind(this);
    this.state = {
      isLoading: false,
      isReady: false,
      name: "",
      lst_price: "",
      standard_price: "",
      description: "",
      image:'',
      mime:'',
      ProductCategory:[],
      categ_id:'',
      type:''
    };
  }



  // componentWillUnmount() {
  //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }
  // componentDidMount() {
  //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // handleBackButtonClick = () => {
  //     this.props.navigation.goBack()
  // }


  selectProductImage(){
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64:true,
      }).then(image => {
        console.log(image);
        this.setState({image:image.data, mime:image.mime});
        this.checkReady();
      }).catch(error => {
        console.log(error);
      })      
    } catch (error) {
      
    }
  }


  componentDidMount() {
    this.getProductCategories();
  }

  getProductCategories(text = '', data={}){
    let obj = {
        "name":text,
        ...data
    };
    this.setState({isLoading : true})
    InvoiceService.getProductCategories(obj, global.token).then(res => {
        var data = res.data.result
        console.log('Products data = ' , data)
        if (data.success) {
            var data_arr = data.response.records

            data_arr.forEach(element => {
              element.value =  element.id;
              element.label = element.name;
              element.key  = element.id;
            });

            this.setState({ProductCategory : data_arr})
        } else {
            this.setState({ProductCategory : []})
        }
        this.setState({isLoading : false})
    }).catch(error => {
        console.log('error = ' , error.message)
        this.setState({isLoading : false})
    })
}



  checkReady = () => {
    if (
      this.state.name != "" &&
      this.state.categ_id != "" &&
      this.state.type != "" &&
      this.state.lst_price != "" &&
      this.state.standard_price != "" &&
      this.state.description &&
      this.state.image
    ) {
      this.setState({ isReady: true });
    } else {
      this.setState({ isReady: false });
    }
};


  add = () => {
    if (!this.state.isReady) {
      return;
    }
    if (global.user_info == "") {
      return;
    }
    var obj = {
      name:this.state.name,
      lst_price:this.state.lst_price,
      standard_price:this.state.standard_price,
      description: this.state.description,
      image:this.state.image,
      categ_id:this.state.categ_id,
      type:this.state.type
    }

    console.log("obj = ", obj);
    this.setState({ isLoading: true });
    InvoiceService.addProduct(obj, global.token)
      .then((res) => {
        var data = res.data.result;
        console.log(res);
        if (typeof data == "undefined") {
          alertMessage("You must enter correct informations.");
        } else {
          if (data.success) {
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
        <View style={styles.container}>
          <DetailHeaderComponent
            navigation={this.props.navigation}
            title="Add New Product"
            goBack={() => {
              this.props.navigation.goBack();
            }}
          />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "column",
                width: "85%",
                height: "100%",
                alignSelf: "center",
              }}
            >
              <View style={{ height: 30 * metrics, flexDirection: "row" }} />
              
              <View
                style={{
                  width: "100%",
                  height: 120,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: 100,
                    width: 100,
                    borderWidth: 1,
                    borderColor: "grey",
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    marginRight: 10,
                  }}

                  onPress={()=>this.selectProductImage()}

                >
                  {!this.state.image ? (
                                      <Ionicons
                                      name="ios-image"
                                      size={99 * metrics}
                                      color="grey"
                                    />
                  ):(
                    <Image
                    style={{width:100, height:100}}
                    source={{uri: `data:${this.state.mime};base64,${this.state.image}`}}
                  />        
                  )}
                </TouchableOpacity>
                <TextInput
                  style={{
                    flex: 3,
                    height: 100,
                    borderWidth: 1,
                    borderColor: "grey",
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                  placeholder="Product Name"
                  onChangeText={(text) => {
                    this.setState({ name: text });
                    this.checkReady();
                  }}
                />
              </View>

              <View                 
              style={{
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  marginBottom: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "grey",
                  backgroundColor: "white",
                }}>
                  <RNPickerSelect
                      onValueChange={(value) => this.setState({categ_id: value})}
                      items={this.state.ProductCategory}
                      placeholderTextColor={'grey'}
                      style={{}}
                      // placeholder={"Slect Category"}
                      value={this.state.categ_id}
                      textInputProps={{
                        fontSize: 17 * metrics,
                        fontFamily: Fonts.adobe_clean,
                      }}
                    />
                  </View>

                  <View                 
              style={{
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  marginBottom: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "grey",
                  backgroundColor: "white",
                }}>
                  <RNPickerSelect
                      onValueChange={(value) => this.setState({type: value})}
                      items={[
                        {label:"consumable", value:"consumable", key :1},
                        {label:"salable", value:"salable", key :2},
                        {label:"service", value:"service", key :3},
                      ]}
                      placeholderTextColor={'grey'}
                      style={{}}
                      // placeholder={"Slect Category"}
                      value={this.state.type}
                      textInputProps={{
                        fontSize: 17 * metrics,
                        fontFamily: Fonts.adobe_clean,
                      }}
                    />
                  </View>

              <View
                style={{
                  width: "100%",
                  height: 60,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "grey",
                  backgroundColor: "white",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Sales Price
                </Text>
                <TextInput
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                  placeholder="0.00"
                  onChangeText={(text) => {
                    this.setState({ lst_price: text });
                    this.checkReady();
                  }}
                />
              </View>

              <View
                style={{
                  width: "100%",
                  height: 60,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "grey",
                  backgroundColor: "white",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Cost</Text>
                <TextInput
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                  placeholder="0.00"
                  onChangeText={(text) => {
                    this.setState({ standard_price: text });
                    this.checkReady();
                  }}
                />
              </View>

              <View
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "grey",
                  backgroundColor: "white",
                  paddingLeft: 10,
                }}
              >
                <TextInput
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                  multiline={true}
                  numberOfLines={3}
                  placeholder="Description"
                  onChangeText={(text) => {
                    this.setState({ description: text });
                    this.checkReady();
                  }}
                />
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

            </View>
          
          <View />
          </View>
        </View>
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
    alignSelf: "center",
  },
  bottom: {
    marginTop:20
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
});
