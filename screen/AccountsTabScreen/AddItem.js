import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, ActivityIndicator,SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import RNPickerSelect from 'react-native-picker-select';
import InvoiceService from "../../service/InvoiceService";
import * as Colors from "../../constants/Colors";
import global_style, { metrics } from "../../constants/GlobalStyle";
import {Formik, Form} from 'formik';
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  product_name: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    product_id : Yup.string()
    .required('Required'),
    description : Yup.string()
    .min(2, 'Too Short!')
    .max(300, 'Too Long!')
    .required('Required'),
    quantity : Yup.string()
    .required('Required')
    .test('Number', 'Please enter a valid Number', (data) => {
      const regexp = /^[0-9]*$/;
      return regexp.test(data);
    }),
    price : Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
    .test('Number', 'Please enter a valid Amount', (data) => {
      const regexp = /^[0-9]*$/;
      return regexp.test(data);
    }),
    tax_ids : Yup.string()
    .required('Required'),
});



export default class AddItem extends Component {

constructor(props){
  super(props);
  this.setProduct = this.setProduct.bind(this);
  this.addProduct = this.addProduct.bind(this);
  this.state={
    TAXES:[],
    isLoading:false,
    product_name:'',
    product_id:'',
    description:'',
    quantity:'0',
    price:'',
    tax_ids:''
  }
  this.inputRef = React.createRef();
}


setProduct(data){
  this.setState({product_id:data.id, description:data.name, price:data.standard_price.toString(), product_name:data.name});
  // console.log(this.inputRef);

  this.inputRef.current.setFieldValue("product_id",data.id);
  this.inputRef.current.setFieldValue("description",data.name);
  this.inputRef.current.setFieldValue("price",data.standard_price.toString());
  this.inputRef.current.setFieldValue("product_name",data.name);

}

SelectProduct(){
  this.props.navigation.navigate("Products", {forSelect:true, setProduct:this.setProduct});
}


componentDidMount() {
  this.getTaxes('', {"type_tax_use":"sale"});
}

getTaxes(text = '', data={}){
  let obj = {
      "name":text,
      ...data
  };
  this.setState({isLoading : true})
  InvoiceService.getTaxes(obj, global.token).then(res => {
      var data = res.data.result
      console.log('TAxes data = ' , data)
      if (data.success) {
          var data_arr = data.response.records
          data_arr.forEach(element => {
            element.value =  element.id;
            element.label = element.name;
            element.key  = element.id;
          });

          this.setState({TAXES : data_arr})
      } else {
          this.setState({TAXES : []})
      }
      this.setState({isLoading : false})
  }).catch(error => {
      console.log('error = ' , error.message)
      this.setState({isLoading : false})
  })
}



addProduct(values){
  let data = {
    product_id:values.product_id,
    description:values.description,
    quantity:values.quantity,
    price:values.price,
    tax_ids:values.tax_ids
  }
       this.props.navigation.state.params.setProduct(data);
       this.props.navigation.pop();
}






  render() {
    return (
      <SafeAreaView style={{flex:1, position:'relative'}}>
      {this.state.isLoading && (
        <View style={global_style.loading_body}>
          <ActivityIndicator
            size={100}
            color={Colors.main_color}
            style={global_style.activityIndicator}
          />
        </View>
      )}

      <View style={styles.container}>

      <Formik
        initialValues={{
          product_name:'',
          product_id:'',
          description:'',
          quantity:'0',
          price:'',
          tax_ids:''
        }}
        validationSchema={ValidationSchema}
        onSubmit={values => this.addProduct(values)}
        innerRef={this.inputRef}
      >
         {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting, setFieldTouched, isValid, setFieldValue}) => {
          return (     
            <View>

        <View style={styles.textFeild}>
        {values.product_name ? (
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{values.product_name}</Text>
        ):(
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Select Product</Text>

        )}

        {values.product_name ? (
            <TouchableOpacity onPress={()=>{
              setFieldValue("product_id", "");
              setFieldValue("product_name", "");
            }}>
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

        {errors.product_id && touched.product_id ? (
                <Text style={styles.errorLabel}>{errors.product_id}</Text>
              ) : null}

        <View style={styles.textFeild}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Quantity</Text>
          <TextInput
            style={{ height: 40, width:100, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={handleChange('quantity')}
            onFocus={() => setFieldTouched('quantity')}
            value={values.quantity}
          />
        </View>
        {errors.quantity && touched.quantity ? (
                <Text style={styles.errorLabel}>{errors.quantity}</Text>
        ) : null}


        <View style={styles.textFeild}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Price</Text>
          <TextInput
            style={{ height: 40, width:100, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={handleChange('price')}
            onFocus={() => setFieldTouched('price')}
            value={values.price}
          />
        </View>
        {errors.price && touched.price ? (
                <Text style={styles.errorLabel}>{errors.price}</Text>
              ) : null}


      <View>
        <View                 
              style={{
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  marginTop: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "grey",
                  backgroundColor: "white",
                }}>
                  <RNPickerSelect
                      placeholder={{
                        label: 'Select TAX id',
                                    value: null,
                      }}
                      onValueChange={(value) => {
                        setFieldTouched('tax_ids');
                        setFieldValue('tax_ids', value);
                      }}
                      items={this.state.TAXES}
                      placeholderTextColor={'grey'}
                      style={{}}
                      value={values.tax_ids}
                      textInputProps={{
                        fontSize: 17,
                      }}
                    />
                  </View>

                  {errors.tax_ids && touched.tax_ids ? (
                <Text style={styles.errorLabel}>{errors.tax_ids}</Text>
              ) : null}

                  </View>


        <View>        
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "grey",
            backgroundColor: "white",
            padding: 10,
            marginTop: 10,
            fontWeight: "bold",
            fontSize: 16,
            paddingHorizontal: 20,          
          }}
          placeholder="Description"
          multiline={true}
          numberOfLines = {3}
          onChangeText={handleChange('description')}
          onFocus={() => setFieldTouched('description')}
          value={values.description}
        />

          {errors.description && touched.description ? (
                <Text style={styles.errorLabel}>{errors.description}</Text>
              ) : null}
        </View>  


        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
          onPress={handleSubmit}

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

)
}}
</Formik>   


      </View>
    </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal:10,
    marginTop:10,

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
    marginTop:15
  },
  addBtn: {
    height: 30,
    width: 30,
    backgroundColor: "#E96E2C",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  errorLabel: {
    color: '#f00',
    fontSize: 14,
  },
});
