import LoginButton from "../../components/LoginButton";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useConvexAuth } from "convex/react";
import React from "react";
import { useSignIn } from "@clerk/clerk-expo";

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
    <View style={styles.container}>
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
          <Text style={styles.text}>Don't have an account </Text>
          <TouchableOpacity
            style={styles.signUpTextWrapper}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  textWrapper: {
    flexDirection: "row",
    marginTop: 12,
  },
  signUpTextWrapper: {},
  signUpText: {
    fontWeight: "bold",
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
  },
  passwordTitle: {
    color: "rgba(0, 0, 0, .4)",
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
