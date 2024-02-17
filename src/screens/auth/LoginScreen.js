import LoginButton from "../../components/LoginButton";
import { useOAuth } from "@clerk/clerk-expo";
import { StyleSheet, View, Text } from "react-native";
import { useConvexAuth } from "convex/react";
import React from "react";
import { Button } from "react-native";

const Login = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={styles.container}>
      <LoginButton text={"Login"} onPress={onPress} />
      <Text>
        {isAuthenticated ? "Logged in" : "Logged out or still loading"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "150%",
    width: "100%",
    height: "12%",
    alignItems: "center",
    // borderWidth: 1,
    justifyContent: "center",
  },
});

export default Login;
