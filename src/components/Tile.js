import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Tile = () => {
  return (
    <View style={styles.container}>
      <Text>Tile</Text>
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

export default Tile;
