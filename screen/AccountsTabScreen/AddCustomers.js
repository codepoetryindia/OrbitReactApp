import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput
} from "react-native";
import TextComponent from "../../components/TextComponent";
import {Formik, Form} from 'formik';
import * as Yup from "yup";
import global_style, { metrics } from "../../constants/GlobalStyle";
import * as Colors from "../../constants/Colors";
import InvoiceService from "../../service/InvoiceService";
import { alertMessage } from "../../utils/utils";
import Toast from 'react-native-simple-toast';


const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    houseNumber: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    buildingName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    addressInfo: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    street: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    street2: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    city: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    country: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    zip: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    country2: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    phone: Yup.string()
    .min(13, 'Enter a valid number with country code')
    .max(13, 'Too long max 13 ')
    .required('Required')
    .test('Number', 'Please enter a valid number with Country code', (data) => {
      const regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
      return regexp.test(data);
    }),
    email: Yup.string()
    .email('Enter Valid Email')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    website: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});


export class AddCustomers extends Component {
  constructor(props) {
    super(props);
    this.addCustomer= this.addCustomer.bind(this);
    this.state = {
      isLoading:false,
      firstName: "",
      lastName: "",
      houseNumber: "",
      buildingName: "",
      addressInfo: "",
      street: "",
      street2: "",
      city: "",
      country: "",
      zip: "",
      country2: "",
      phone: "",
      email : "",
      website: "",
    };
  }


  addCustomer = (obj) => {
    if (global.user_info == "") {
      return;
    }
    console.log("obj = ", obj);
    let data = {
      "rb_first_name":obj.firstName,
			"rb_last_name" : obj.lastName,
			"house_number": obj.houseNumber,
			"building_name":obj.buildingName,
			"address_info":obj.addressInfo,
			"street":obj.street,
			"street2":obj.street2,
			"city":obj.city,
			"county":obj.country,
			"zip":obj.zip,
			"country":obj.country2,
			"phone":obj.phone,
			"email":obj.email,
			"website":obj.website
    }
    this.setState({ isLoading: true });
    InvoiceService.createCustomer(data, global.token)
      .then((res) => {
        console.log(res);
        var data = res.data.result;
        console.log(data);
          if (data.success) {
            Toast.show(data.messasge, Toast.LONG);
            this.props.navigation.pop();
          } else {
            alertMessage(data.message);
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
      <View style={styles.container}>
        {this.state.isLoading && (
            <View style={global_style.loading_body}>
              <ActivityIndicator
                size={100}
                color={Colors.main_color}
                style={global_style.activityIndicator}
              />
            </View>
      )}


      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          houseNumber: "",
          buildingName: "",
          addressInfo: "",
          street: "",
          street2: "",
          city: "",
          country: "",
          zip: "",
          country2: "",
          phone: "",
          email : "",
          website: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={values => this.addCustomer(values)}
      >
         {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting, setFieldTouched, isValid}) => {
          return (          
        <View
          style={{
            flexDirection: "column",            
            height: "100%",
            flex:1,
            paddingHorizontal:15,
            paddingBottom:15
          }}
        >
          <ScrollView>
          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={() => setFieldTouched('firstName')}
            />
              {errors.firstName && touched.firstName ? (
                <Text style={styles.errorLabel}>{errors.firstName}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={() => setFieldTouched('lastName')}
            />
              {errors.lastName && touched.lastName ? (
                <Text style={styles.errorLabel}>{errors.lastName}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="House Number"
              value={values.houseNumber}
              onChangeText={handleChange('houseNumber')}
              onBlur={() => setFieldTouched('houseNumber')}
            />
              {errors.houseNumber && touched.houseNumber ? (
                <Text style={styles.errorLabel}>{errors.houseNumber}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="Building Name"
              value={values.buildingName}
              onChangeText={handleChange('buildingName')}
              onBlur={() => setFieldTouched('buildingName')}
            />
              {errors.buildingName && touched.buildingName ? (
                <Text style={styles.errorLabel}>{errors.buildingName}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="Address Info"
              value={values.addressInfo}
              onChangeText={handleChange('addressInfo')}
              onBlur={() => setFieldTouched('addressInfo')}
            />
              {errors.addressInfo && touched.addressInfo ? (
                <Text style={styles.errorLabel}>{errors.addressInfo}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="Street"
              value={values.street}
              onChangeText={handleChange('street')}
              onBlur={() => setFieldTouched('street')}
            />
              {errors.street && touched.street ? (
                <Text style={styles.errorLabel}>{errors.street}</Text>
              ) : null}
          </View>


          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="Street2"
              value={values.street2}
              onChangeText={handleChange('street2')}
              onBlur={() => setFieldTouched('street2')}
            />
              {errors.street2 && touched.street2 ? (
                <Text style={styles.errorLabel}>{errors.street2}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={values.city}
              onChangeText={handleChange('city')}
              onBlur={() => setFieldTouched('city')}
            />
              {errors.city && touched.city ? (
                <Text style={styles.errorLabel}>{errors.city}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={values.country}
              onChangeText={handleChange('country')}
              onBlur={() => setFieldTouched('country')}
            />
              {errors.country && touched.country ? (
                <Text style={styles.errorLabel}>{errors.country}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="ZIP"
              value={values.zip}
              onChangeText={handleChange('zip')}
              onBlur={() => setFieldTouched('zip')}
            />
              {errors.zip && touched.zip ? (
                <Text style={styles.errorLabel}>{errors.zip}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="Country2"
              value={values.country2}
              onChangeText={handleChange('country2')}
              onBlur={() => setFieldTouched('country2')}
            />
              {errors.country2 && touched.country2 ? (
                <Text style={styles.errorLabel}>{errors.country2}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={() => setFieldTouched('phone')}
            />
              {errors.phone && touched.phone ? (
                <Text style={styles.errorLabel}>{errors.phone}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
              {errors.email && touched.email ? (
                <Text style={styles.errorLabel}>{errors.email}</Text>
              ) : null}
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              placeholder="Website"
              value={values.website}
              onChangeText={handleChange('website')}
              onBlur={() => setFieldTouched('website')}
            />
              {errors.website && touched.website ? (
                <Text style={styles.errorLabel}>{errors.website}</Text>
              ) : null}
          </View>
          

          <TouchableOpacity onPress={handleSubmit} style={[styles.submitBtn]} >
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
                Save
              </Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
      )
      }}
      </Formik>          
    </View>
    );
  }
}

export default AddCustomers;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignSelf: "center",
  },
  inputbox: {
    marginVertical:10,
    width:'100%'
  },
  input: {    
    color: '#4a4a4a',
    fontWeight:'400',
    borderBottomColor: '#8a8a8a',
    borderBottomWidth: 1,
    fontSize:18
  },
  errorLabel: {
    color: '#f00',
    fontSize: 16,
    marginTop:2
  },
  submitBtn:{
      height: 50,
      width: 180,
      backgroundColor: "#E96E2C",
      margin: 16,
      borderRadius: 30,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.12,
      shadowRadius: 60,
      elevation: 2,
      justifyContent: "center",
      alignItems: "center",
      alignSelf:'center'
  }

});
