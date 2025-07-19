import React, { useState } from "react";
import {View, Text, Image, TextInput, TouchableOpacity, Alert} from 'react-native'
import OTPVerification from "./OtpconfirmationSceeen";
import { Dimensions } from 'react-native';


export default function LoginScreen(props){
    const [phoneNumber, setPhoneNumber] =useState('')
     
    const handleMobile=(phoneNumber)=>{
      setPhoneNumber(phoneNumber)
    } 

   const handleSubmit=()=>{
        if (!phoneNumber || phoneNumber.length !== 10){
           setTimeout(() => {
      Alert.alert('Invalid', 'Please enter a valid 10-digit mobile number');
    }, 100);
    return;
        } 
           props.navigation.navigate('OTPVerification')

        
        
    }
    return(
        <View>
        <Image style={{height:250, width:180,justifyContent:'center', alignSelf:'center', marginTop:40}}
        source={require('../image/illustration-2.png')}
        />
        <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:20, marginTop:20,color:'black'}}>Enter your Phone number</Text>
        <Text style={{alignSelf:'center', marginTop:6, fontSize:12, color:'gray'}}>We will send you a 4-digit confirmation code to verfiy phone number
           </Text>

    <View style={{ flexDirection: 'row',alignItems: 'center', marginTop:20,borderColor: '#ccc',borderWidth: 1,borderRadius: 10,paddingHorizontal: 10, marginLeft:20, marginRight:20}}>
        <Image  style={{ width: 24, height: 16, resizeMode: 'contain', marginRight: 8,}}
            source={{ uri: 'https://flagcdn.com/w40/in.png' }}/>
            <Text style={{fontSize: 16,marginRight: 8,fontWeight: '500',}}>+91</Text>
        <TextInput
        style={{flex: 1,fontSize: 16,}}
        placeholder="Enter mobile number"
        keyboardType="numeric"
        maxLength={10}
        value={phoneNumber}
        onChangeText={handleMobile}
        />
    </View>

<TouchableOpacity onPress={handleSubmit}
//onPress={()=>props.navigation.navigate('OTPVerification')}
 style={{backgroundColor:'orangered', padding:8, alignItems:'center', borderRadius:20, marginLeft:50, marginRight:50, marginTop:30 }}>
    <Text style={{color:'white',fontWeight:'600', fontSize:20, alignItems:'center'}}>Get a code</Text>
</TouchableOpacity>

        </View>
    )
}