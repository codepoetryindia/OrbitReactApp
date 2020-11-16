import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TextComponent from "../../components/TextComponent";

export class AddCustomers extends Component {
  constructor() {
    super();
    this.state = {
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
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "column",
            width: "85%",
            height: "100%",
            alignSelf: "center",
          }}
        >
          <ScrollView>
            <TextComponent
              textPlaceHolder="First Name"
              textValue={this.state.firstName}
              textType="text"
              onChangeText={(value) => this.firstName(value)}
            />
            <TextComponent
              textPlaceHolder="Last Name"
              textValue={this.state.lastName}
              textType="text"
              onChangeText={(value) => this.lastName(value)}
            />
            <TextComponent
              textPlaceHolder="House Number"
              textValue={this.state.houseNumber}
              textType="text"
              onChangeText={(value) => this.houseNumber(value)}
            />
            <TextComponent
              textPlaceHolder="Building Name"
              textValue={this.state.buildingName}
              textType="text"
              onChangeText={(value) => this.buildingName(value)}
            />

            <TextComponent
              textPlaceHolder="Address Info"
              textValue={this.state.addressInfo}
              textType="text"
              onChangeText={(value) => this.addressInfo(value)}
            />
            <TextComponent
              textPlaceHolder="Street"
              textValue={this.state.street}
              textType="text"
              onChangeText={(value) => this.street(value)}
            />
            <TextComponent
              textPlaceHolder="Street 2"
              textValue={this.state.street2}
              textType="text"
              onChangeText={(value) => this.street2(value)}
            />
            <TextComponent
              textPlaceHolder="City"
              textValue={this.state.city}
              textType="text"
              onChangeText={(value) => this.city(value)}
            />

            <TextComponent
              textPlaceHolder="Country"
              textValue={this.state.country}
              textType="text"
              onChangeText={(value) => this.country(value)}
            />
            <TextComponent
              textPlaceHolder="Zip"
              textValue={this.state.zip}
              textType="text"
              onChangeText={(value) => this.zip(value)}
            />
            <TextComponent
              textPlaceHolder="Country 2"
              textValue={this.state.country2}
              textType="text"
              onChangeText={(value) => this.country2(value)}
            />
            <TextComponent
              textPlaceHolder="Phone"
              textValue={this.state.phone}
              textType="number"
              onChangeText={(value) => this.phone(value)}
            />
            <TextComponent
              textPlaceHolder="Email"
              textValue={this.state.email}
              textType="text"
              onChangeText={(value) => this.email(value)}
            />
              <TextComponent
              textPlaceHolder="Website"
              textValue={this.state.website}
              textType="text"
              onChangeText={(value) => this.website(value)}
            />
          </ScrollView>
        </View>
        <TouchableOpacity onPress = {()=>{}}>
          <View
            style={{
              height: 50,
              width: 100,
              backgroundColor: "#E96E2C",
              position: "absolute",
              margin: 16,
              right: 120,
              bottom: 0,
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
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              Save
            </Text>
          </View>
        </TouchableOpacity>
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
});
