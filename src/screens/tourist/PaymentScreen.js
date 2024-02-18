import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PaymentScreen = ({navigation, route}) => {
    const handlePress = () => {
        navigation.pop();
        route.params?.prop1?.(true);
    }

  return (
    <SafeAreaView style={styles.container}>
      <Icon name="check-circle" size={100} color="green" />
      <Text style={styles.message}>Payment Complete</Text>
      <Text style={styles.amount}>$5 transferred</Text>
      <TouchableOpacity style={styles.button}onPress={handlePress} >
      <Text style={styles.done}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 24,
    marginTop: 20,
    fontFamily: "Poppins-Bold"
  },
  amount: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 40,
    fontFamily: "Poppins-Regular"
  },
  done: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "white"
  },
  button: {
    backgroundColor: "#28637D",
    borderRadius: 100,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  }
});

export default PaymentScreen;
