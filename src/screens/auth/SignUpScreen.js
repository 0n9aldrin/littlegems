import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import LoginButton from "../../components/LoginButton";

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
        <View style={styles.subContainer}>
          <View style={styles.usernameInputContainer}>
            <TextInput
              style={styles.usernameInput}
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name..."
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>
          <View style={styles.usernameInputContainer}>
            <TextInput
              style={styles.usernameInput}
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>
          <View style={styles.usernameInputContainer}>
            <TextInput
              style={styles.usernameInput}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <View style={styles.usernameInputContainer}>
            <TextInput
              style={styles.usernameInput}
              value={password}
              placeholder="Password..."
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
        </View>
      )}
      {pendingVerification && (
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
  subContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  usernameInput: {
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, .4)",
    marginVertical: 15,
    width: "100%",
    paddingBottom: 30,
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
    width: "80%",
    marginTop: "20%",
  },
});
