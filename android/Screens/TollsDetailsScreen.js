import React,{useState}from "react";
import {View, Text, FlatList, SafeAreaView, Button} from 'react-native'
import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get('window');




export default function TollsDetailsScreen({route, navigation}){
     const {tolls} = route.params || {}
    return(
            <SafeAreaView style={{flex:1,width: wp('100%'),height: hp('5%')}}>
            {/* <Text style={{fontWeight:'600', marginTop:30, fontSize:20, }}> Tolls Details: </Text> */}
            <View style={{backgroundColor: 'purple',marginTop: hp('2%'),marginBottom: hp('2%'), marginVertical: hp('4%'),  marginHorizontal: wp('5%'), borderRadius: 10}}>
              <Text style={{color: 'white',borderRadius: 8,fontWeight:'bold',fontSize:moderateScale(20), marginLeft:wp('5%')}}> 🚚 Total Tolls             {tolls.length}</Text>
            </View>
            <FlatList
             data={tolls}
             keyExtractor={(item, index) => index.toString()}
             ItemSeparatorComponent={() => <View style={{height:hp('0.1%')}} />}

             renderItem={({ item }) => (
            <View style={{backgroundColor: '#fff',  marginHorizontal: wp('4%'), paddingVertical: hp('1%'), paddingHorizontal: wp('3%'),borderRadius: 10, marginTop: hp('1%'), shadowColor: '#000', shadowOpacity: 0.05,shadowRadius: 4,elevation: 2,}}>
              
    <Text style={{ fontSize: moderateScale(14),fontWeight: 'bold',color: 'black', }}>🚚   {item.tollPlazaName}</Text>
    <View style={{flexDirection:'row'}}>
    <Text style={{color: '#636e72',fontSize: moderateScale(13),marginTop: hp('0.8%'),marginRight:wp('2.5%')}}>Vehicle: {item.vehicleRegNo}</Text>
    <Text style={{color: '#636e72',fontSize: moderateScale(13),marginTop: hp('0.8%'),}}>Time: {item.readerReadTime}</Text>
    </View>
    </View>
    
      
    
  
  )}
          contentContainerStyle={{ paddingBottom: 20 }}

/> 
        
        </SafeAreaView>
    )
}