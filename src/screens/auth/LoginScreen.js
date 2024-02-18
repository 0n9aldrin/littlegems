import LoginButton from "../../components/LoginButton";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useConvexAuth } from "convex/react";
import React from "react";
import { useSignIn } from "@clerk/clerk-expo";
import logo from "../../../assets/logo-gem.png";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
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
      navigation.navigate("UserSelect");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.usernameInputContainer}>
        <Text style={styles.usernameTitle}>Email Address</Text>
        <TextInput
          style={styles.usernameInput}
          autoCapitalize="none"
          value={emailAddress}
          placeholder=""
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>
      <View style={styles.passwordInputContainer}>
        <Text style={styles.passwordTitle}>Password</Text>
        <TextInput
          style={styles.passwordInput}
          value={password}
          placeholder=""
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <LoginButton
          style={styles.loginButton}
          text={"Login"}
          onPress={onSignInPress}
        />
        <View style={styles.textWrapper}>
          <TouchableOpacity
            style={styles.signUpTextWrapper}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.text}>Don't have an account </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpTextWrapper}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    alignItems: "center",
    // borderWidth: 1,
    justifyContent: "center",
  },
  logo: {
    width: 280, // Set the width of your image
    height: 280, // Set the height of your image
    resizeMode: "contain", // or 'cover' or 'stretch'
    marginBottom: 20,
  },
  textWrapper: {
    flexDirection: "row",
    marginTop: 12,
  },
  signUpTextWrapper: {},
  text: {
    fontFamily: "Poppins-Regular",
  },
  signUpText: {
    fontFamily: "Poppins-Bold",
  },
  passwordInput: {
    borderBottomWidth: 1,
    borderColor: "grey",
    marginVertical: 20,
    width: "100%",
  },
  usernameInput: {
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, .4)",
    marginVertical: 20,
    width: "100%",
  },
  passwordInputContainer: {
    width: "80%",
    alignItems: "left",
    // marginTop: 20,
  },
  usernameInputContainer: {
    width: "80%",
    alignItems: "left",
    marginTop: 20,
    marginBottom: 50,
  },
  usernameTitle: {
    color: "rgba(0, 0, 0, .4)",
    fontFamily: "Poppins-Regular",
  },
  passwordTitle: {
    color: "rgba(0, 0, 0, .4)",
    fontFamily: "Poppins-Regular",
  },
  buttonWrapper: {
    marginTop: 80,
    width: "100%",
    // borderWidth: 1,
    alignItems: "center",
  },
  //combine same styles
});

export default Login;
