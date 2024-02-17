import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const LocalHomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Find a Tourist</Text>
        <Icon name="user" size={24} color="black" />
      </View>
      <Text>Rest of the content goes here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });

export default LocalHomeScreen;
