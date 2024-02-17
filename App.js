import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
import { CONVEX_URL } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigation/AuthNavigation";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import Constants from "expo-constants";

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function App() {
  return (
    <ClerkProvider
      publishableKey={
        "pk_test_Y3VycmVudC1oYWxpYnV0LTE5LmNsZXJrLmFjY291bnRzLmRldiQ"
      }
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
