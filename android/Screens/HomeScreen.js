import React from 'react'
import {View, Text, StyleSheet,Image, Pressable, TouchableOpacity} from 'react-native'
import LoginScreen from '../Screens/LoginScreen'


export default function HomeScreen(props){
  return(
    <View style={styles.container}>
     
      <Image style={styles.logo1style}
      source={require('../image/logo.png')}
      />
       <Image style={styles.logo2style}
       source={require('../image/image.png')}
       />
      <Text style={{textAlign:'center', fontWeight:'bold', fontSize:30, marginTop:0}}>Logistic services</Text>

       <Text style={{textAlign:'center',marginLeft:30, marginRight:20, fontSize:15, marginTop:6}}>Welcome to our logistic App where you can track{'\n'}
       <Text style={{marginLeft:100, fontSize:15, marginRight:80}}> your shipments easily and efficiently
        </Text> 
        </Text>
        <TouchableOpacity onPress={()=>props.navigation.navigate('LoginScreen')}
          style={{backgroundColor:'orangered', padding:8, alignItems:'center', borderRadius:20, marginLeft:50, marginRight:50, marginTop:30}}>
          <Text style={{color:'white',fontWeight:'600', fontSize:22, alignItems:'center'}}>Get started</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row', marginTop:20,justifyContent:'center'}}>
         <Text>Don't have an account? </Text>
         <TouchableOpacity>
          <Text style={{color:'purple', fontWeight:'600'}}>Sign Up</Text>
         </TouchableOpacity>

        </View>
         
       
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    
  },
  logo1style:{
    // marginLeft:100, 
     marginTop:40,
     height:100,
    alignSelf:'center',
    marginBottom:1

  }
,
logo2style:{
  alignSelf:'center',
  //marginTop:0.5
}
})