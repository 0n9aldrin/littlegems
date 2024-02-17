import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
import { CONVEX_URL } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigation/AuthNavigation";

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </ConvexProvider>
  );
}
