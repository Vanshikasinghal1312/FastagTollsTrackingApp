import React,{useState, useEffect, useRef, useCallback} from "react";
import {View, Text, Alert,FlatList, TextInput,Button, Image, TouchableOpacity,ActivityIndicator, Platform,PermissionsAndroid , KeyboardAvoidingView, Keyboard } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import { useFocusEffect } from "@react-navigation/native";

// export default function TrackingScreen(props){
//     const [vehicleRegNo, setvehicleRegNo] = useState('');
//     const [tolls, setTolls] = useState([]);
//     const mapRef = useRef(null);


export default function TrackingScreen({route, navigation}){
   const {vehicleRegNo} = route.params
   const [tolls, setTolls] = useState([])
     const mapRef = useRef(null);

  
  useEffect(() => {
    fetchTollData();
  }, []);

  const fetchTollData = async () => {
     if (!vehicleRegNo.trim()) {
      Alert.alert('Enter a valid vehicleRegNo');
      return;
    }
  try {
    const responses = await fetch('https://fastagtracking.com/qiktrack/trackingApi', {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
       body: JSON.stringify({
        "company_id":"6853aa44097c3c572666dd6f",
        "tracking_For":"FASTAG",
        "parameters":{      
        "vehiclenumber": vehicleRegNo.trim()
    }
    
}
)    
    });
    
     const result = await responses.json()
         console.log('✅ POST response:', result);

          const response = result.response || []
          console.log(response,'📦 ')      

          if (Array.isArray(response)){
            setTolls(response)
            console.log(response)
          }
          
          if (response.length > 0 && mapRef.current){
            const coordinates = response.map(response =>({
              latitude: parseFloat(response.latitude),
            longitude: parseFloat(response.longitude),
            }))
            mapRef.current.fitToCoordinates(coordinates,{
              edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
            animated: true,
            })
          }else{
Alert.alert('No tolls found');
        setTolls([]);
          } }catch(error){
console.error('❌ API error:', error);
      Alert.alert('Failed to fetch toll data', error.message);
          }
          Keyboard.dismiss()
        }



useEffect(() => {
  tolls.forEach((toll, index) => {
    console.log(`📍 Toll ${index}:`, toll.latitude, toll.longitude);
  });
  console.log("🧭 Updated tolls state:", tolls);
}, [tolls]);




  return (
     <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
      {/* <View style={{position: 'absolute',top: 40,width: '90%',alignSelf: 'center',zIndex: 1,backgroundColor: 'white',padding: 10,borderRadius: 10,elevation: 5,shadowColor: '#000',}}> */}
        {/* <TextInput
          placeholder="Enter vehicle Registered No"
          value={vehicleRegNo}
          onChangeText={setvehicleRegNo}
          style={{ borderWidth: 1, borderColor: '#999', borderRadius: 6, padding: 8, marginBottom: 10,
  }}
      /> */}
        {/* <Button title="Search Tolls" onPress={fetchTollData} /> */}
      {/* </View> */}
      <Text>Data Length: {tolls.length}</Text>
      <Text>{JSON.stringify(tolls[0], null, 2)}</Text>
      <MapView
        style={{ flex:1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        ref={mapRef}
        initialRegion={{
          latitude: 28.326367, 
          longitude: 76.890515,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {tolls.map((toll, index) => {
          console.log(`Toll #${index}:`, toll.tollPlazaGeocode, toll.tollPlazaName);

    if (typeof toll.tollPlazaGeocode === 'string' && toll.tollPlazaGeocode.includes(',')) {
      console.log(toll.tollPlazaGeocode)
      const [latitude, longitude] = toll.tollPlazaGeocode.split(',').map(coordinates => parseFloat(coordinates.trim()));

      if (!isNaN(latitude) && !isNaN(longitude)) {
        return (
          <Marker
          key={index}
            coordinate={{ latitude: latitude, longitude: longitude }}
            title={toll.tollPlazaName}
            description={`Vehicle: ${toll.vehiclenumber}`}
            image={require('../image/fire-truck.png')}
          />
          // <Marker
          //   key={index}
          //   coordinate={{ latitude: latitude, longitude: longitude }}
          //   title={toll.tollPlazaName}
          //   description={`Vehicle: ${toll.vehiclenumber}`}
          // >
          //   {/* <Image
          //   source={require('../image/minitruck.png')}
          //   style={{ width: 30, height: 30 }}
          //   /> */}
          // </Marker>
        );
      }
    }
    return null;
  })}
      </MapView>

<TouchableOpacity 
style={{padding:9,borderRadius:5, backgroundColor:'orangered', alignItems:'center', alignSelf:'center',marginTop:600, marginLeft:180}}
onPress={()=>navigation.navigate('TollsDetailsScreen',{tolls})}
>
   <Text style={{color:'white', fontWeight:'bold'}}>View Tolls Details</Text>
</TouchableOpacity>
  
  <Text style={{position: 'absolute',bottom: 20,left: 10,color: 'black',backgroundColor: 'white',padding: 8,borderRadius: 8,fontWeight: 'bold',}}>Total Tolls: {tolls.length}</Text>
      
</KeyboardAvoidingView>
  );
}






