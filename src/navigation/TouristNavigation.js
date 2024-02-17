import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TouristHomeScreen from '../screens/tourist/TouristHomeScreen';

const Stack = createNativeStackNavigator();

const TouristNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}> 
    <Stack.Screen name="Tourist Home Screen" component={TouristHomeScreen} />
  </Stack.Navigator>
);

export default TouristNavigator;
