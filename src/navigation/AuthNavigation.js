import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/auth/SignUpScreen";
import Login from "../screens/auth/LoginScreen";
import DietFilters from "../components/DietFilters";
import UserSelect from "../screens/auth/UserSelectScreen";
const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="UserSelect" component={UserSelect} />  
    <Stack.Screen name="DietFilters" component={DietFilters} />
  </Stack.Navigator>
);

export default AuthNavigator;
