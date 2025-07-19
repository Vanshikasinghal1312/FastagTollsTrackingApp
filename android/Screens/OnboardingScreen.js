import React, {useState, useRef} from "react";
import {View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get('window');



export default function OnboardingScreen(props){
      const [vehicleRegNo, setvehicleRegNo] = useState('');
    const [tolls, setTolls] = useState([]);
    const mapRef = useRef(null);

  const navigation = useNavigation();

   const handleNext = () => {
    if (!vehicleRegNo || vehicleRegNo.trim().length < 4) {
      Alert.alert('Invalid', 'Please enter a valid vehicle number');
      return;
    }

    navigation.navigate('TrackingScreen', { vehicleRegNo: vehicleRegNo.trim() });
  };

    return(
        <View>
            <View style={{flexDirection:'row'}}>
            <Text style={{marginTop: hp('4%'), marginLeft:wp('5%'), fontSize:moderateScale(20), fontWeight:'bold',color:'black'}}>Hey,{'\n'}
                <Text style={{marginLeft:wp('5%'), fontSize:moderateScale(20), fontWeight:'bold',color:'black'}}>Welcome Back!</Text>
                </Text>     
               <Image style={{marginLeft:wp('5%'), marginRight: wp('3%'), marginTop: hp('4%'), width: wp('50%'), height: hp('6%'), }}
                  source={require('../image/logo.png')}
                  />

            </View>

            <View style={{backgroundColor: 'purple', borderRadius: 22,padding: 45,marginLeft:wp('5%'), marginRight: wp('3%'), width: '90%', maxWidth: 400, alignItems: 'center', marginTop: hp('5%')}}>
                    <Text style={{ fontSize:moderateScale(26), fontWeight: 'bold', color: 'white',  marginBottom: hp('1%'),}}>Track your package</Text>
                    <Text style={{fontSize:moderateScale(14),color: 'white',textAlign: 'center', marginBottom: hp('2%'),paddingHorizontal: wp('3%'),}}>Enter the Vehicle number for tracking</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, paddingHorizontal: wp('5%'), width: '100%', height: 50,}}>
                      <TextInput
                        style={{flex: 1,fontSize:moderateScale(15),color: '#333', textAlign:'center'}}
                        placeholder="Enter Vehicle Number"
                        placeholderTextColor="#888"
                        keyboardType="default"
                        autoCapitalize="characters"
                        value={vehicleRegNo}
                        onChangeText={(text) => setvehicleRegNo(text.toUpperCase())}
                      />
                      <TouchableOpacity  onPress={handleNext}>
                        <Text style={{ fontSize: 20,color: '#888',}}>🔍</Text>
                      </TouchableOpacity> 
                    </View>
                  </View>
           

           {/* <TouchableOpacity 
           //onPress={()=>props.navigation.navigate('TrackingScreen')}
           style={{backgroundColor:'orangered', padding:12, alignItems:'center', borderRadius:20, marginLeft:40, marginRight:40, marginTop:30}}
            >
            <Text style={{color:'white',fontWeight:'600', fontSize:20, alignItems:'center'}}>Next</Text>
           </TouchableOpacity>
      */}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
    alignItems: 'center',
    justifyContent: 'center', 
    paddingHorizontal: 20, 
  }, 
  searchButton: {
    padding: 8,
  },
 
});
