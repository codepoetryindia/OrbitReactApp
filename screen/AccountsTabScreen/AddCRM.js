import { Formik } from "formik";
import React, { Component } from "react";
import {
  ActivityIndicator,
  ScrollView, StyleSheet, Text,
  TextInput, TouchableOpacity, View
} from "react-native";
import Toast from "react-native-simple-toast";
import * as Yup from "yup";
import * as Colors from "../../constants/Colors";
import global_style from "../../constants/GlobalStyle";
import InvoiceService from "../../service/InvoiceService";
import { alertMessage } from "../../utils/utils";

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  planned_Revenue: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  probability: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export class AddCRM extends Component {
  constructor(props) {
    super(props);
    this.addCRM = this.addCRM.bind(this);
    this.state = {
      isLoading: false,
      name: "",
      planned_Revenue: "",
      probability: "",
    };
  }

  addCRM = (obj) => {
    // console.log(obj);

    if (global.user_info == "") {
      return;
    }
    console.log("obj = ", obj);
    let data = {
      name: obj.name,
      planned_revenue: obj.planned_Revenue,
      probability: obj.probability,
    };
    this.setState({ isLoading: true });
    InvoiceService.createCRM(data, global.token)
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
            name: "",
            planned_Revenue: "",
            probability: "",
          }}
          validationSchema={ValidationSchema}
          onSubmit={(values) => this.addCRM(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isSubmitting,
            setFieldTouched,
            isValid,
          }) => {
            return (
              <View
                style={{
                  flexDirection: "column",
                  height: "100%",
                  flex: 1,
                  paddingHorizontal: 15,
                  paddingBottom: 15,
                }}
              >
                <ScrollView>
                  <View style={styles.inputbox}>
                    <TextInput
                      style={styles.input}
                      placeholder="Name"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={() => setFieldTouched("name")}
                    />
                    {errors.name && touched.name ? (
                      <Text style={styles.errorLabel}>{errors.name}</Text>
                    ) : null}
                  </View>

                  <View style={styles.inputbox}>
                    <TextInput
                      style={styles.input}
                      placeholder="Planned Revenue"
                      value={values.planned_Revenue}
                      onChangeText={handleChange("planned_Revenue")}
                      onBlur={() => setFieldTouched("planned_Revenue")}
                    />
                    {errors.planned_Revenue && touched.planned_Revenue ? (
                      <Text style={styles.errorLabel}>
                        {errors.planned_Revenue}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.inputbox}>
                    <TextInput
                      style={styles.input}
                      placeholder="Probability"
                      value={values.probability}
                      onChangeText={handleChange("probability")}
                      onBlur={() => setFieldTouched("probability")}
                    />
                    {errors.probability && touched.probability ? (
                      <Text style={styles.errorLabel}>
                        {errors.probability}
                      </Text>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[styles.submitBtn]}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            );
          }}
        </Formik>
      </View>
    );
  }
}

export default AddCRM;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignSelf: "center",
  },
  inputbox: {
    marginVertical: 10,
    width: "100%",
  },
  input: {
    color: "#4a4a4a",
    fontWeight: "400",
    borderBottomColor: "#8a8a8a",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  errorLabel: {
    color: "#f00",
    fontSize: 16,
    marginTop: 2,
  },
  submitBtn: {
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
    alignSelf: "center",
  },
});
