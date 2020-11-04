import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import global_style, { metrics } from "../../../constants/GlobalStyle";
import * as Images from "../../../constants/Image";
import * as Colors from "../../../constants/Colors";
import PropTypes from "prop-types";
import { Avatar } from "react-native-elements";
import { Fonts } from "../../../constants/Fonts";
import TransactionService from "../../../service/TransactionService";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ItemDetailComponent from "../../../components/ItemDetailComponent";



import {
  paramDate2,
  getHoursAndMins,
  changeDatefromAccount,
  getHoursAndMinsFromStr,
  changeNumber,
} from "../../../utils/utils";

export default class BeneficiaryTransactions extends Component {
    constructor(props) {
        super(props);
    }
  state = {
    category_arr: [],
    show_detail: true,
    isLoading:false,
    transaction_arr: [],
    isShowDetail: false,
    item: null,
    transaction_data: "",
    transaction_item: "",
  };

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
        title: 'Beneficiary Transactions',
    };
  };


  showDetail = (item) => {
    console.log( JSON.stringify(item));


    var obj = {
      note: !item.rb_transaction_add_notes ? "" : item.rb_transaction_add_notes,
      rating: "",
      attach: "",
    };

      this.setState({ isLoading: true });
    TransactionService.getTransactionDetail(global.token, item.id).then(
      (res) => {
        console.log(res);
        var detail = res.data.result;
        if (!detail.success) {
          return;
        }
        this.setState({ transaction_item: detail.response[0] });
        TransactionService.getTransactionDetailById(global.token, item.id)
          .then((res) => {
            var data = res.data.result;
            if (data.success) {
              item = data.response[0];
              console.log("detail = ", item);
              TransactionService.getRating(item.naxetra_id, global.token)
                .then((res) => {
                  var data = res.data.result;
                  obj.rating = data;
                  TransactionService.getAttach(item.naxetra_id, global.token)
                    .then((res) => {
                      var data = res.data.result;

                      if (data.success) {
                        obj.attach = data.response;
                      } else {
                        obj.attach = [];
                      }
                      this.setState({
                        isShowDetail: true,
                        item: item,
                        isLoading: false,
                        transaction_data: obj,
                      });
                    })
                    .catch((error) => {
                      this.setState({ isLoading: false });
                    });
                })
                .catch((error) => {
                  console.log("error2 = ", error.message);
                  this.setState({ isLoading: false });
                });
            }
          })
          .catch((error) => {
            this.setState({ isLoading: false });
          });
      }
    );
  };


  getTransactionList (id) {
    this.setState({ isLoading: true });
    TransactionService.GetBeneficiaryTransactions( id,  global.token).then(res => {
        var data = res.data.result;
        console.log("fetched data", data);

        if (data.success) {
            this.setState({transaction_arr : data.response.records});
        }else{
            this.setState({transaction_arr : []});
        }
        this.setState({ isLoading: false });
    }).catch(error => {
        this.setState({ isLoading: false });        
    })
}



  componentDidMount() {
    this.getTransactionList(this.props.navigation.state.params.data);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={this.state.show_detail ? { flex: 1 } : { flex: 1 }}>
          <ScrollView style={styles.container}>
            {this.state.show_detail ? (
              <View style={styles.body}>

                  {!this.state.transaction_arr.length && !this.state.isLoading   ?(
                      <Text style={{fontSize:20, fontWeight:'700', textAlign:'center', color:'#cacaca'}}>No Transactions Found</Text>
                  ):null}
                  
                {this.state.transaction_arr.map((item, idx) => {
                  return (
                    <TouchableOpacity style={styles.item} key={idx} onPress={()=>{
                      this.showDetail(item);
                    }}>
                      {!item.category_image ? (
                        <Avatar
                          rounded
                          overlayContainerStyle={{ backgroundColor: "#dfdfdf" }}
                          size="xlarge"
                          source={Images.default_icon}
                          resizeMode={"stretch"}
                          containerStyle={{
                            borderColor: 1,
                            borderColor: "gray",
                          }}
                          style={styles.l_img}
                        />
                      ) : (
                        // <Avatar
                        //   rounded
                        //   overlayContainerStyle={{ backgroundColor: "#dfdfdf" }}
                        //   size="xlarge"
                        //   source={{
                        //     uri:
                        //       "data:image/png;base64," +
                        //       item.rb_transaction_icon,
                        //   }}
                        //   resizeMode={"stretch"}
                        //   containerStyle={{
                        //     borderColor: 1,
                        //     borderColor: "gray",
                        //   }}
                        //   style={styles.l_img}
                        // />
                        <View style={[styles.l_img, {borderColor: 1, borderColor: "gray", backgroundColor: "#dfdfdf", justifyContent:'center', alignItems:'center'}]}>
                          <Icon name={item.category_image} size={22}></Icon>
                        </View>

                      )}

                      <View style={styles.text_body}>
                        {
                          <Text style={styles.title} numberOfLines={1}>
                            {!item.transaction_info_details
                              ? "Transaction"
                              : item.transaction_info_details}
                          </Text>
                        }
                        {!item.create_date ? (
                          <Text style={styles.time}>
                            {paramDate2(new Date())}{" "}
                            {getHoursAndMins(new Date())}
                          </Text>
                        ) : (
                          <Text style={styles.time}>
                            {changeDatefromAccount(
                              item.create_date.split(" ")[0]
                            )}{" "}
                            {getHoursAndMinsFromStr(
                              item.create_date.split(" ")[1]
                            )}
                          </Text>
                        )}
                      </View>
                      <View style={styles.count_body}>
                        {item.transaction_type == "out" ? (
                          <Text style={global_style.m_balance}>
                            {" "}
                            - £{" "}
                            {Number(
                              changeNumber(Math.abs(item.rb_amount))
                            ).toFixed(2)}
                          </Text>
                        ) : (
                          <Text style={global_style.p_balance}>
                            {" "}
                            + £{" "}
                            {Number(
                              changeNumber(Math.abs(item.rb_amount))
                            ).toFixed(2)}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) :null}
          </ScrollView>
        </View>
        {this.state.show_detail && (
          <View style={{ flex: 0.15, justifyContent: "center" }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.props.navigation.pop()}
            >
              <Text style={styles.btn_text}>Back</Text>
            </TouchableOpacity>
          </View>
        )}

        {this.state.isShowDetail && (
          <View style={global_style.opacityBg}>
            <ItemDetailComponent
              navigation={this.props.navigation}
              origin_data={this.state.transaction_item}
              trans_data={this.state.transaction_data}
              funcLoading={this.setLoading}
              item={this.state.item}
              closeModal={() => {
                this.setState({ isShowDetail: false });
                this.componentDidMount();
                // this.account_ref.onChangeState(); //new add
              }}
            />
          </View>
        )}

    {this.state.isLoading && (
          <View style={global_style.loading_body}>
            <ActivityIndicator
              size={100}
              color={Colors.main_color}
              style={global_style.activityIndicator}
            />
          </View>
        )}

        {/* <View style={{ height: 58 * metrics }} /> */}
      </View>
    );
  }
}

// BeneficiaryTransactions.propType = {
//   date: PropTypes.string,
//   transactions: PropTypes.array,
//   showLoadingFunc: PropTypes.func,
// };
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    marginTop: 10 * metrics,
  },
  container1: {
    width: "100%",
    flexDirection: "column",
    marginTop: 10 * metrics,
    marginBottom: 55 * metrics,
  },
  body: {
    width: "80%",
    height: "100%",
    alignSelf: "center",
    flexDirection: "column",
    marginTop: 20 * metrics,
  },
  item: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 20 * metrics,
  },
  l_img: {
    width: 40 * metrics,
    height: 40 * metrics,
    borderRadius: 50,
    backgroundColor: "red",
    resizeMode: "stretch",
    justifyContent: "center",
    elevation: 3.5,
    marginTop: 10 * metrics,
  },
  text_body: {
    marginLeft: 25 * metrics,
    flexDirection: "column",
    justifyContent: "center",
    flex: 0.8,
  },
  title: {
    fontSize: 16 * metrics,
    fontFamily: Fonts.adobe_clean,
    marginBottom: 3 * metrics,
    color: "#000",
  },
  count_body: {
    flex: 0.4,
    justifyContent: "center",
  },
  time: {
    fontSize: 13 * metrics,
    color: Colors.gray_color,
    fontFamily: Fonts.adobe_clean,
  },
  btn: {
    width: 160 * metrics,
    height: 55 * metrics,
    borderWidth: 1,
    borderRadius: 7 * metrics,
    borderColor: "white",
    alignSelf: "center",
    backgroundColor: Colors.main_color,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_text: {
    fontSize: 19 * metrics,
    fontFamily: Fonts.adobe_clean,
    color: "white",
  },
});
