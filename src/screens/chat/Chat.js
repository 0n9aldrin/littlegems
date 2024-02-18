import LoginButton from "../../components/LoginButton";
import { useOAuth } from "@clerk/clerk-expo";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  onPress,
  SafeAreaView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useConvexAuth } from "convex/react";
import React, { useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import Clerk from "@clerk/clerk-js";
import { Divider } from "react-native-elements";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Chat = () => {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { isLoading, isAuthenticated } = useConvexAuth();
  const [newMessageText, setNewMessageText] = useState("");
  const messages = useQuery(api.messaging.list);
  const sendMessage = useMutation(api.messaging.send);
  const btnSendMsg = async () => {
    await sendMessage({ message: newMessageText, origin: "Austin" });
    setNewMessageText("");
  };
  console.log(messages);

  return (
    <View style={styles.container}>
      <View style={styles.divider}></View>
      <SafeAreaView style={styles.msgAreaContainer}>
        <ScrollView style={styles.msgArea}>
          {messages?.map((message) => (
            <View
              key={message._id}
              style={[
                styles.messageContainer,
                message.origin === "Austin" ? styles.messageMine : null,
              ]}
            >
              <Text>{message.origin}</Text>
              <Text>{message.message}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={newMessageText}
          placeholder="Enter text here..."
          onChangeText={(newMsg) => setNewMessageText(newMsg)}
        />
        <TouchableOpacity style={styles.btn} onPress={btnSendMsg}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "80%",
    width: "100%",
    height: "10%",
    alignItems: "center",
    // borderWidth: 1,
    justifyContent: "center",
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
  },

  divider: {
    borderColor: "black",
    borderBottomWidth: 10,
    marginVertical: 0,
    width: "100%", // Adjust this value to control the space above and below the divider
  },

  input: {
    width: "70%",
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },

  btn: {
    backgroundColor: "blue",
    borderRadius: "100%",
    width: "25%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 200,
  },

  msgArea: {
    width: "100%",
    height: 500,
    backgroundColor: "grey",
    flexGrow: 1,
  },

  msgAreaContainer: {
    width: "100%",
    height: 400,
  },

  messageMine: {
    alignSelf: "flex-end", // Align message containers to the right side
    backgroundColor: "lightblue", // Example background color for own messages
  },
});

export default Chat;
