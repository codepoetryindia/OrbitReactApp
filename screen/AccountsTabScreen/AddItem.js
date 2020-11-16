import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class AddItem extends Component {

constructor(props){
  super(props);
  this.setProduct = this.setProduct.bind(this);
  this.addProduct = this.addProduct.bind(this);
  this.state={
    product_name:'',
    product_id:'',
    description:'',
    quantity:'0',
    price:''
  }
}


setProduct(data){
  this.setState({product_id:data.id, description:data.name, price:data.standard_price.toString(), product_name:data.name});
}

SelectProduct(){
  this.props.navigation.navigate("Products", {forSelect:true, setProduct:this.setProduct});
}



addProduct(){

  let data = {
    product_id:this.state.product_id,
    description:this.state.description,
    quantity:this.state.quantity,
    price:this.state.price,
    tax_ids:3
  }
       this.props.navigation.state.params.setProduct(data);
       this.props.navigation.pop();
}


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textFeild}>
        {this.state.product_name ? (
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{this.state.product_name}</Text>
        ):(
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Select Product</Text>

        )}

        {this.state.product_name ? (
            <TouchableOpacity onPress={()=>this.setState({product_id:'', product_name:''})}>
              <View>
                <Ionicons name="ios-close" color="#f00" size={30} />
              </View>
            </TouchableOpacity>
        ):(
          <TouchableOpacity onPress={()=>this.SelectProduct()}>
          <View style={styles.addBtn}>
            <Ionicons name="ios-add" color="white" size={30} />
          </View>
        </TouchableOpacity>
        )}

        </View>
        <View style={styles.textFeild}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Quantity</Text>
          <TextInput
            style={{ height: 40, width:100, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({quantity:text})}
            value={this.state.quantity}
          />
        </View>
        <View style={styles.textFeild}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Price</Text>
          <TextInput
            style={{ height: 40, width:100, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({price:text})}
            value={this.state.price}
          />
        </View>

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "grey",
            backgroundColor: "white",
            padding: 10,
            marginBottom: 10,
            fontWeight: "bold",
            fontSize: 16,
            paddingHorizontal: 20,          
          }}
          placeholder="Description"
          multiline={true}
          numberOfLines = {6}
          onChangeText={(text) => this.setState({description : text})}
          value={this.state.description}
        />
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={()=>this.addProduct()}

        >
          <View
            style={{
              height: 50,
              width: 120,
              backgroundColor: "#E96E2C",
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              {" "}
              Add
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal:10,
    marginTop:20,

  },
  textFeild: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom:15
  },
  addBtn: {
    height: 30,
    width: 30,
    backgroundColor: "#E96E2C",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
