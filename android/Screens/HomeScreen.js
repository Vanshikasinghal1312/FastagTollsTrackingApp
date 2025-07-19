import React from 'react'
import {View, Text, StyleSheet,Image, Pressable, TouchableOpacity, SafeAreaView} from 'react-native'
import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get('window');




export default function HomeScreen(props){
  return(
    <SafeAreaView style={{ flex: 1, width: wp('95%'),height: hp('90%')}}>
   
     
      <Image style={styles.logo1style}
      source={require('../image/logo.png')}
      />
       <Image style={styles.logo2style}
       source={require('../image/image.png')}
       /> 
      <Text style={{textAlign:'center', fontWeight:'bold', fontSize:moderateScale(25), color:'black',alignItems:'center'}}>Logistic services</Text>

       <Text style={{textAlign:'center',justifyContent: 'center', alignItems: 'center', marginTop: hp('2%'),fontSize:moderateScale(14)}}>Welcome to our logistic App where you can track{'\n'}
       <Text style={{marginLeft:wp('5%'), fontSize:moderateScale(14), marginRight: wp('5%'),}}> your shipments easily and efficiently
        </Text> 
        </Text>
        <TouchableOpacity onPress={()=>props.navigation.navigate('LoginScreen')}
          style={{backgroundColor:'orangered', padding:8, alignItems:'center', borderRadius:20, justifyContent: 'center',marginLeft:wp('10%'),marginRight: wp('5%'), marginTop: hp('2%')}}>
          <Text style={{color:'white',fontWeight:'600', fontSize:moderateScale(20), alignItems:'center'}}>Get started</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',  marginTop: hp('2%'),justifyContent:'center'}}>
         <Text>Don't have an account? </Text>
         <TouchableOpacity>
          <Text style={{color:'purple', fontWeight:'600'}}>Sign Up</Text>
         </TouchableOpacity>

        </View>
         
       

    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    
  },
  logo1style:{
     width: scale(100), 
     marginTop: hp('4%'),
    height: verticalScale(50), // scales vertically
padding: moderateScale(10),
    alignSelf:'center',
 

  }
,
logo2style:{
  alignSelf:'center',
  marginTop: hp('1%'),
  height: verticalScale(80), // scales vertically
padding: moderateScale(150),
    alignSelf:'center',
}
})