import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';


export default class CustomerEdit extends React.Component {
    static navigationOptions = {
        title: 'Add/Edit Customer'
    };

    sendToBot = async (id, data)=>{
        console.log(id)
        // await fetch('https://46c107371735.ngrok.io/naxetra/send/?id='+id, {
        await fetch('https://naxetra.mishi.ai/naxetra/send/?id='+id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },body: 
                //samples provided for different scenarios

                JSON.stringify({
                    "purpose": "customer",
                    "result": {
                        "customer":{
                                "rb_first_name": "MISHI KFC INDIA",
                                "rb_last_name": "",
                                "house_number": "",
                                "building_name": "",
                                "address_info": "Orion Gate, Guildford Road, Woking, Surrey, United Kingdom, GU22 7NJ",
                                "street": "Guildford Road",
                                "street2": "undefined",
                                "city": "Woking",
                                "county": "",
                                "zip": "GU22 7NJ",
                                "country": "United Kingdom",
                                "phone": "",
                                "email": "",
                                "website": ""
                            }
                        }
                    }
                ),
        }).then((Response)=>Response.json()).then((responseJson)=>{
                console.log('Success', responseJson);
                this.props.navigation.goBack(null);
        }).catch(err => {
            console.log('Error while sending data',err)
        })
    }

    render() {
        const {navigation} = this.props;
        var customer = navigation.getParam('data',{});
        var id = navigation.getParam('conversationID', "");
        console.log(customer)
        return (
            <View style={{flex:1, justifyContent: "center"}}>
                <Text style={{justifyContent: "center", alignSelf:"center"}}>This is Screen for editing Customer </Text>
                <TouchableOpacity onPress={()=> this.sendToBot(id, customer)} 
                    style={{
                        alignItems: "center", 
                        justifyContent: "center",
                        backgroundColor: "#DDDDDD", 
                        
                        height: 40, margin: 50} }>
                            <Text>Click Here to send details to bot</Text>
                </TouchableOpacity>
            </View>
        );
    }
}