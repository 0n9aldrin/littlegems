import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TouristHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TouristHomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TouristHomeScreen;
