import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../FastagTollTrackingApp/android/Screens/HomeScreen';
import LoginScreen from '../FastagTollTrackingApp/android/Screens/LoginScreen'
import OTPVerification from '../FastagTollTrackingApp/android/Screens/OtpconfirmationSceeen'
import OnboardingScreen from '../FastagTollTrackingApp/android/Screens/OnboardingScreen'
import TrackingScreen from '../FastagTollTrackingApp/android/Screens/TrackingScreen'
import TollsDetailsScreen from '../FastagTollTrackingApp/android/Screens/TollsDetailsScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
  );
}




