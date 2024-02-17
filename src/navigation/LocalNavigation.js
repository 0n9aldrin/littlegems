import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocalHomeScreen from '../screens/local/LocalHomeScreen';

const Stack = createNativeStackNavigator();

const LocalNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}> 
    <Stack.Screen name="Local Home Screen" component={LocalHomeScreen} />
  </Stack.Navigator>
);

export default LocalNavigator;
