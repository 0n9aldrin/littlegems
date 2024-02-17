import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/auth/SignUpScreen';
import Login from '../screens/auth/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}> 
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={SignUp} /> 
  </Stack.Navigator>
);

export default AuthNavigator;
