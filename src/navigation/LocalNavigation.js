import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';

const Stack = createNativeStackNavigator();

const LocalNavigator = () => (
  <Stack.Navigator> 
  </Stack.Navigator>
);

export default LocalNavigator;
