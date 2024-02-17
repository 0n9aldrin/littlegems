import LoginButton from "../../components/LoginButton";
import { useOAuth } from "@clerk/clerk-expo";
import { StyleSheet, View, Text, TextInput, onPress } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useConvexAuth } from "convex/react";
import React from "react";
import { Button } from "react-native";
import Clerk from "@clerk/clerk-js";
import { useSignIn } from "@clerk/clerk-expo";
// import { SignIn } from "@clerk/clerk-expo";
// import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { isLoading, isAuthenticated } = useConvexAuth();

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>
      <View>
        <TextInput
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <LoginButton text={"Login"} onPress={onSignInPress} />
      <Text>
        {isAuthenticated ? "Logged in" : "Logged out or still loading"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    width: "100%",
    height: "12%",
    alignItems: "center",
    // borderWidth: 1,
    justifyContent: "center",
  },
});

export default Login;
