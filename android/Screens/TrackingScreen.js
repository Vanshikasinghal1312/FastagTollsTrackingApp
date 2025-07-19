import React,{useState, useEffect, useRef, useCallback} from "react";
import {View, Text, Alert,FlatList, TextInput,Button, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import MapView, {Marker, PROVIDER_GOOGLE,Polyline} from 'react-native-maps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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
    })   
    });
    
    const result = await responses.json()                       // console.log('✅ POST response:', result);
     const response = result.response || []                       ///  console.log(response,'📦 ')   
  if (Array.isArray(response) && response.length > 0) {
       setTolls(response);

      const coordinates = response.map(toll => {
          if ( typeof toll.tollPlazaGeocode === 'string' && toll.tollPlazaGeocode.includes(',')) {
            const [latitude, longitude] = toll.tollPlazaGeocode.split(',').map(coordinates => parseFloat(coordinates.trim()));
          if (!isNaN(latitude) && !isNaN(longitude)) {
              return { ...toll, latitude, longitude };
            }
          }
          return null;
        })
  if (coordinates.length > 0 && mapRef.current) {       
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
          animated: true
        },1000);
      } } else {
      Alert.alert('No tolls found');
      setTolls([]);
       }} catch (error) {
    console.error('❌ API error:', error);
    Alert.alert('Failed to fetch toll data', error.message);
  }
  Keyboard.dismiss();
}; 
useEffect(() => {
  const interval = setInterval(() => {
    fetchTollData();
  }, 10000);
  return () => clearInterval(interval);
}, []);

// useEffect(() => {
//   tolls.forEach((toll, index) => {
//     console.log(`📍 Toll ${index}:`, toll.latitude, toll.longitude);
//   });
//   console.log("🧭 Updated tolls state:", tolls);
// }, [tolls]);

  return (
     <KeyboardAvoidingView behavior="padding" style={{flex:1,position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
      <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ flex:1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}    
      initialRegion={{
      latitude: 22.9734,
      longitude: 78.6569,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
      }}
       zoomEnabled={true}            // ✅ Pinch zoom
  zoomControlEnabled={true}     // ✅ Zoom buttons on Android
  scrollEnabled={true}          // ✅ Allow drag/pan
  rotateEnabled={true}          // ✅ Rotate map
  showsUserLocation={false}
  showsMyLocationButton={false}
      >
        
        {tolls.map((toll, index) => {
          //console.log(` 📍📍📍📍📍Toll #${index}:`, toll.tollPlazaGeocode, toll.tollPlazaName);
    if (typeof toll.tollPlazaGeocode === 'string' && toll.tollPlazaGeocode.includes(',')) {
      const [latitude, longitude] = toll.tollPlazaGeocode.split(',').map(coordinates => parseFloat(coordinates.trim()));

      if (!isNaN(latitude) && !isNaN(longitude)) {
        // console.log(`📍📍 Marker ${index} at`, latitude, longitude); 
              const isLast = index === tolls.length - 1;
if (isLast){
        return (   
          // <Marker
          //   key={index}
          //   coordinate={{latitude:latitude,longitude:longitude}}
          //   title={toll.tollPlazaName}
          //   description={`Vehicle: ${toll.vehicleRegNo}`}
          //  image={index === tolls.length - 1 ? require('../image/fire-truck.png') : undefined} // 👈 Only last one gets image

          ///>
          <Marker
          key={index}
            coordinate={{latitude:latitude,longitude:longitude}}
            // title={toll.tollPlazaName}
            // description={`Vehicle: ${toll.vehicleRegNo}`}
          >
            <Image   
             source={require('../image/fire-truck.png')}
            
            style={{
              width:  60 ,
              height: 50, // truck bigger, others smaller  
             // resizeMode: 'contain',
            }}
            />
        
          </Marker>
           
       ); }
      else {
        return (
          <Marker
            key={index}
            coordinate={{ latitude, longitude }}
            title={toll.tollPlazaName}
            description={`Vehicle: ${toll.vehicleRegNo}`}
            
          />
        );
      }}}
    return null;
  })} 
  <Polyline
  coordinates={tolls
    .map(toll => {
      if (
        typeof toll.tollPlazaGeocode === 'string' &&
        toll.tollPlazaGeocode.includes(',')
      ) {
        const [latitude, longitude] = toll.tollPlazaGeocode
          .split(',')
          .map(coord => parseFloat(coord.trim()));
        if (!isNaN(latitude) && !isNaN(longitude)) {
          return { latitude, longitude };
        }
      }
      return null;
    })
    .filter(coord => coord !== null)}
  strokeColor="blue"
  strokeWidth={4}
/>
      </MapView>


<View style={{flex:1}}> 
<TouchableOpacity 
style={{paddingHorizontal: wp('3%'),paddingVertical: hp('1%'), borderRadius:5, backgroundColor:'orangered', alignItems:'center', alignSelf:'center',marginLeft:wp('15%'),marginRight: wp('5%'), marginTop: hp('80%')}}
onPress={ ()=>{navigation.navigate('TollsDetailsScreen',{tolls})}}>
   <Text style={{color:'white', fontWeight:'bold'}}>View Tolls Details</Text>
</TouchableOpacity>
</View> 
<Text style={{position: 'absolute',bottom: 20,left: 10,color: 'black',backgroundColor: 'white',padding: 8,borderRadius: 8,fontWeight: 'bold',}}>Total Tolls: {tolls.length}</Text>
</KeyboardAvoidingView>
  );
}






