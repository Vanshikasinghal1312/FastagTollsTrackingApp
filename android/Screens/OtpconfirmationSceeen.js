import React,{useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import OnboardingScreen from './OnboardingScreen'


export default function OTPVerification(props){
    return(
        <View>
            <Image 
            style={{height:250, width:180,justifyContent:'center', alignSelf:'center', marginTop:40}}
            source={require('../image/illustration-3.png')}
            />
            <Text style={{fontWeight:'bold', fontSize:20, textAlign:'center'}}>Verify your phone number</Text>
            <Text style={{textAlign:'center', color:'gray', fontSize:13, marginTop:6}}>We have send the OTP to your registered mobile number </Text>
       <View >
        </View>   
<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 30 }}>
        
          <TextInput
         style={{ width: 50, height: 50, borderWidth: 1, borderColor: '#aaa', borderRadius: 8, textAlign: 'center', fontSize: 20 }}
            keyboardType="number-pad"
            maxLength={1}
           />
      
      </View>
          <TouchableOpacity>
            <Text style={{color:'purple', textAlign:'center', marginTop:10}}>Resend Code</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>props.navigation.navigate('OnboardingScreen')}
          style={{backgroundColor:'orangered', padding:8, alignItems:'center', borderRadius:20, marginLeft:50, marginRight:50, marginTop:30}}>
            <Text style={{color:'white',fontWeight:'600', fontSize:18, alignItems:'center'}}>Verify</Text>
          </TouchableOpacity>

        </View>
    )
}