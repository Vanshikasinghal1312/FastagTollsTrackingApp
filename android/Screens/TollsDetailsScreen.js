import React,{useState}from "react";
import {View, Text, FlatList, SafeAreaView} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';


export default function TollsDetailsScreen({route}){
     const {tolls} = route.params
    return(
            <SafeAreaView style={{flex:1}}>
            {/* <Text style={{fontWeight:'600', marginTop:30, fontSize:20, }}> Tolls Details: </Text> */}
            <View style={{backgroundColor: 'purple',marginTop:10, marginHorizontal: 10, marginBottom: 12, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10}}>
              <Text style={{color: 'white',borderRadius: 8,fontWeight:'bold',fontSize:20, marginLeft:5}}> 🚚 Total Tolls                                      {tolls.length}</Text>
            </View>
            <FlatList
             data={tolls}
             keyExtractor={(item, index) => index.toString()}
             ItemSeparatorComponent={() => <View style={{height: 10}} />}

             renderItem={({ item }) => (
            <View style={{backgroundColor: '#fff', marginHorizontal: 16, padding: 15, borderRadius: 10, marginTop:8, shadowColor: '#000', shadowOpacity: 0.05,shadowRadius: 4,elevation: 2,}}>
              
    <Text style={{ fontSize: 16,fontWeight: 'bold',color: 'black', }}>🚚   {item.tollPlazaName}</Text>
    <View style={{flexDirection:'row'}}>
    <Text style={{color: '#636e72',fontSize: 14,marginTop: 2,marginRight:15}}>Vehicle: {item.vehicleRegNo}</Text>
    <Text style={{color: '#636e72',fontSize: 14,marginTop: 2,}}>Time: {item.readerReadTime}</Text>
    </View>
    </View>
      
    
  
  )}
          contentContainerStyle={{ paddingBottom: 20 }}

/> 
        
        </SafeAreaView>
    )
}