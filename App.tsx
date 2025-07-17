import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../FastagTollTrackingAppSKL/android/Screens/HomeScreen';
import LoginScreen from '../FastagTollTrackingAppSKL/android/Screens/LoginScreen'
import OTPVerification from '../FastagTollTrackingAppSKL/android/Screens/OtpconfirmationSceeen'
import OnboardingScreen from '../FastagTollTrackingAppSKL/android/Screens/OnboardingScreen'
import TrackingScreen from '../FastagTollTrackingAppSKL/android/Screens/TrackingScreen'
import TollsDetailsScreen from '../FastagTollTrackingAppSKL/android/Screens/TollsDetailsScreen'
import { SafeAreaView } from "react-native";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex:1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
        <Stack.Screen name="TollsDetailsScreen" component={TollsDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}




