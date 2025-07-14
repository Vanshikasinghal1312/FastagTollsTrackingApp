import React, {useState, useRef} from "react";
import {View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TrackingScreen from '../Screens/TrackingScreen'




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
            <Text style={{marginTop:30, marginLeft:25, fontSize:27, fontWeight:'bold'}}>Hey,{'\n'}
                <Text style={{marginLeft:27, fontSize:24, fontWeight:'bold'}}>Welcome Back!</Text>
                </Text>     
               <Image style={{marginLeft:40, marginRight:27, marginTop:20,height:80, width:150}}
                  source={require('../image/logo.png')}
                  />

            </View>

            <View style={{backgroundColor: 'purple', borderRadius: 22,padding: 45,marginLeft:20, marginRight:20, width: '90%', maxWidth: 400, alignItems: 'center', marginTop:30}}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 10,}}>Track your package</Text>
                    <Text style={{ fontSize: 16,color: 'white',textAlign: 'center',marginBottom: 20,paddingHorizontal: 10,}}>Enter the Vehicle number for tracking</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 15, width: '100%', height: 50,}}>
                      <TextInput
                        style={{flex: 1,fontSize: 16,color: '#333',}}
                        placeholder="Enter Vehicle Number"
                        placeholderTextColor="#888"
                        keyboardType="default"
                        autoCapitalize="none"
                        value={vehicleRegNo}
                        onChangeText={setvehicleRegNo}
                      />
                      <TouchableOpacity>
                        <Text style={{ fontSize: 20,color: '#888',}}>🔍</Text>
                      </TouchableOpacity> 
                    </View>
                  </View>
           

           <TouchableOpacity onPress={handleNext}
           //onPress={()=>props.navigation.navigate('TrackingScreen')}
           style={{backgroundColor:'orangered', padding:12, alignItems:'center', borderRadius:20, marginLeft:40, marginRight:40, marginTop:30}}
            >
            <Text style={{color:'white',fontWeight:'600', fontSize:20, alignItems:'center'}}>Next</Text>
           </TouchableOpacity>
     
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
