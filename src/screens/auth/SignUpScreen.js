import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import LoginButton from "../../components/LoginButton";
import logo from "../../../assets/logo-gem.png";

export default function SignUpScreen({ navigation }) {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      navigation.navigate("UserSelect");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!pendingVerification && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >
            <View style={styles.subContainer}>
              <Image source={logo} style={styles.logo} />
              <View style={styles.usernameInputContainer}>
                <Text style={styles.usernameTitle}>First Name</Text>
                <TextInput
                  style={styles.usernameInput}
                  autoCapitalize="words"
                  value={firstName}
                  placeholder=""
                  onChangeText={(firstName) => setFirstName(firstName)}
                />
              </View>
              <View style={styles.usernameInputContainer}>
                <Text style={styles.usernameTitle}>Last Name</Text>
                <TextInput
                  style={styles.usernameInput}
                  autoCapitalize="words"
                  value={lastName}
                  placeholder=""
                  onChangeText={(lastName) => setLastName(lastName)}
                />
              </View>
              <View style={styles.usernameInputContainer}>
                <Text style={styles.usernameTitle}>Email</Text>
                <TextInput
                  style={styles.usernameInput}
                  autoCapitalize="none"
                  value={emailAddress}
                  keyboardType="email-address"
                  placeholder=""
                  onChangeText={(email) => setEmailAddress(email)}
                />
              </View>
              <View style={styles.usernameInputContainer}>
                <Text style={styles.usernameTitle}>Password</Text>
                <TextInput
                  style={styles.usernameInput}
                  value={password}
                  placeholder=""
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                />
              </View>

              {/* <TouchableOpacity onPress={onSignUpPress}>
            <Text>Sign up</Text>
          </TouchableOpacity> */}
              <View style={styles.buttonWrapper}>
                <LoginButton text={"Sign up"} onPress={onSignUpPress} />
              </View>
              <View style={styles.textWrapper}>
                <TouchableOpacity
                  style={styles.signUpTextWrapper}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  <Text style={styles.text}>Have an account? </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signUpTextWrapper}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  <Text style={styles.signUpText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
      {pendingVerification && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.subContainer}>
          <View style={styles.usernameInputContainer}>
            <TextInput
              style={styles.usernameInput}
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <LoginButton text={"Verify Email"} onPress={onPressVerify} />
          </View>
        </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  logo: {
    width: 150, // Set the width of your image
    height: 150, // Set the height of your image
    resizeMode: "contain", // or 'cover' or 'stretch'
    marginBottom: 20,
  },
  subContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  usernameTitle: {
    color: "rgba(0, 0, 0, .4)",
    fontFamily: "Poppins-Regular",
  },
  usernameInput: {
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, .4)",
    marginVertical: 15,
    width: "100%",
    // paddingBottom: 30,
    fontFamily: "Poppins-Regular",
  },
  usernameInputContainer: {
    width: "80%",
    alignItems: "left",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonWrapper: {
    alignItems: "center",
    // borderWidth: 1,
    width: "90%",
    marginTop: "10%",
  },
  textWrapper: {
    flexDirection: "row",
    marginTop: 12,
  },
  signUpText: {
    fontFamily: "Poppins-Bold",
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
});
