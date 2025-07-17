import React,{useState, useEffect, useRef, useCallback} from "react";
import {View, Text, Alert,FlatList, TextInput,Button, Image, TouchableOpacity,ActivityIndicator, Platform,PermissionsAndroid , KeyboardAvoidingView, Keyboard } from 'react-native'
import MapView, {Marker} from 'react-native-maps';

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
           if (Array.isArray(response) && response.length > 0) {
      setTolls(response);

      // ✅ Parse coordinates from tollPlazaGeocode
      const coordinates = response
        .map(toll => {
          if (
            typeof toll.tollPlazaGeocode === 'string' &&
            toll.tollPlazaGeocode.includes(',')
          ) {
            const [lat, lng] = toll.tollPlazaGeocode.split(',').map(coord => parseFloat(coord.trim()));
            if (!isNaN(lat) && !isNaN(lng)) {
              return { latitude: lat, longitude: lng };
            }
          }
          return null;
        })
        .filter(coord => coord !== null);

      // ✅ Zoom to toll markers
      if (coordinates.length > 0 && mapRef.current) {
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
          animated: true
        });
      } else {
        Alert.alert('No valid toll coordinates found');
      }

    } else {
      Alert.alert('No tolls found');
      setTolls([]);
    }
  } catch (error) {
    console.error('❌ API error:', error);
    Alert.alert('Failed to fetch toll data', error.message);
  }

  Keyboard.dismiss();
}; 

useEffect(() => {
  tolls.forEach((toll, index) => {
    console.log(`📍 Toll ${index}:`, toll.latitude, toll.longitude);
  });
  console.log("🧭 Updated tolls state:", tolls);
}, [tolls]);


  return (
     <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
      <Text>Data Length: {tolls.length}</Text>
      <Text>{JSON.stringify(tolls[0], null, 2)}</Text>
      <MapView
        style={{ flex:1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        ref={mapRef}
        initialRegion={{
          latitude: 22.9734, 
          longitude: 78.6569,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {tolls.map((toll, index) => {
          console.log(`Toll #${index}:`, toll.tollPlazaGeocode, toll.tollPlazaName);

    if (typeof toll.tollPlazaGeocode === 'string' && toll.tollPlazaGeocode.includes(',')) {
      console.log(toll.tollPlazaGeocode)
      const [latitude, longitude] = toll.tollPlazaGeocode.split(',').map(coordinates => parseFloat(coordinates.trim()));

      if (!isNaN(latitude) && !isNaN(longitude)) {
        console.log(`📍 Marker ${index} at`, latitude, longitude); // ✅ Debug log

        // const isCurrentToll = index === 0;
        return (
          <Marker
          key={index}
            coordinate={{ latitude: latitude, longitude: longitude }}
            title={toll.tollPlazaName}
            description={`Vehicle: ${toll.vehicleRegNo}`}
          />
        );
      }
    }
    return null;
  })}
      </MapView>
<View style={{flex:1}}> 
<TouchableOpacity 
style={{padding:9,borderRadius:5, backgroundColor:'orangered', alignItems:'center', alignSelf:'center',marginTop:500, marginLeft:80, position: 'absolute',}}
onPress={ ()=>{navigation.navigate('TollsDetailsScreen',{tolls})}}>
   <Text style={{color:'white', fontWeight:'bold'}}>View Tolls Details</Text>
</TouchableOpacity>
</View>
  
<Text style={{position: 'absolute',bottom: 20,left: 10,color: 'black',backgroundColor: 'white',padding: 8,borderRadius: 8,fontWeight: 'bold',}}>Total Tolls: {tolls.length}</Text>
      
</KeyboardAvoidingView>
  );
}






