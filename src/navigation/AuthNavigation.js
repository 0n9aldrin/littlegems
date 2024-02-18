import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/auth/SignUpScreen";
import Login from "../screens/auth/LoginScreen";
import DietFilters from "../components/DietFilters";
import UserSelect from "../screens/auth/UserSelectScreen";
import RadiusSelector from "../components/RadiusSelector";
import Chat from "../screens/chat/Chat";
import LocalHomeScreen from "../screens/local/LocalHomeScreen";
<<<<<<< HEAD
import PhotoVerification from "../screens/chat/PhotoVerification";
=======
import TouristHomeScreen from "../screens/tourist/TouristHomeScreen";
>>>>>>> e1ac57a55b4939a1c875e36ebdc262831eb3740c
const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Chat" component={Chat} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="UserSelect" component={UserSelect} />
<<<<<<< HEAD
    <Stack.Screen name="DietFilters" component={DietFilters} />
    <Stack.Screen name="RadiusSelector" component={RadiusSelector} />
    <Stack.Screen name="Photo Verification" component={PhotoVerification} />
    {/* <Stack.Screen name="Chat" component={Chat} /> */}
    {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
    {/* <Stack.Screen name="Login" component={Login} /> */}
    {/* <Stack.Screen name="UserSelect" component={UserSelect} />   */}
    {/* <Stack.Screen name="DietFilters" component={DietFilters} /> */}
    <Stack.Screen name="Local Home Screen" component={LocalHomeScreen} />
=======
    <Stack.Screen name="Chat" component={Chat} />
    {/* <Stack.Screen name="Local Home Screen" component={LocalHomeScreen} /> */}
    <Stack.Screen name="TouristHomeScreen" component={TouristHomeScreen} />
>>>>>>> e1ac57a55b4939a1c875e36ebdc262831eb3740c
  </Stack.Navigator>
);

export default AuthNavigator;
