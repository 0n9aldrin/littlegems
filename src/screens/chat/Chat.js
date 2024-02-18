import LoginButton from "../../components/LoginButton";
import { useOAuth } from "@clerk/clerk-expo";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  onPress,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useConvexAuth } from "convex/react";
import React, { useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import Clerk from "@clerk/clerk-js";
import { Divider } from "react-native-elements";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Icon from "react-native-vector-icons/Feather";

import { useUser } from "@clerk/clerk-react";

const dummyMessages = [
  { origin: "Austin", message: "Hello!" },
  { origin: "User123", message: "Hi there!" },
  { origin: "Austin", message: "How are you doing?" },
  { origin: "User123", message: "I'm good, thanks!" },
];

const Chat = ({ navigation, route }) => {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { isLoading, isAuthenticated } = useConvexAuth();
  const [newMessageText, setNewMessageText] = useState("");
  const messages = useQuery(api.messaging.list);
  const { user } = useUser();
  //const messages = dummyMessages;
  const myName = user.fullName;

  const sendMessage = useMutation(api.messaging.send);
  const btnSendMsg = async () => {
    await sendMessage({ message: newMessageText, origin: myName });
    setNewMessageText("");
  };
  const { prop1 } = route.params;

  const handleWeMet = () => {
    navigation.navigate("Photo Verification");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.header}>
          <View style={styles.topHeader}>
            <View style={styles.confirmButton1}>
              <Icon name="check-circle" size={24} color="#EAEAEA" />
              <Text style={styles.confirmButtonText1}>We Met</Text>
            </View>
            <Image
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/fd16/f7c0/f7413b2e46fd5b05c964dd658938cd24?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kGuzGIOB9ol9Vbu8w-W47Gyk7nKDWUWhkjjYdCyeWep4IAptjL-JPwxafzQkabUDDGVJZcZuZu8WCsQWKliOmhNVCsQUGPLfolSzpBhFBVlr~RP~8o~uQWjqOlA0-oya-~L6Ytcyrb2ufynAHcvViB~RQOS4XpdOkXVC71LzISDtpggjkwWycXJWrQyrzyMvEtu9FghZjyOJRYitP0L3-Iu0VHbo~6tZIph8zzOVbOPOvpuj71SUtwhA2uUO9-PsKhyao9TYfJ0k1mUrg8WN40~fCeH4tNAj70m~B0H0qQEi79-FJB20B8yazYq5g3Y23OhI7vT0uQDSo1L6bv-CAw__",
              }}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleWeMet}
            >
              <Icon name="check-circle" size={20} color="white" />
              <Text style={styles.confirmButtonText}>We Met</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{prop1}</Text>
          {/* <Text style={styles.date}>01/01/24 11:00 AM</Text>
          <Text style={styles.address}>69 Ur Mums Street, CA, 10001</Text> */}
        </View>
        <View style={styles.msgAreaContainer}>
          <ScrollView style={styles.msgArea}>
            {messages?.map((message) => (
              <View
                key={message._id}
                style={[
                  styles.messageContainer,
                  message.origin === myName
                    ? styles.messageMine
                    : styles.messageTheirs,
                ]}
              >
                {/* Conditionally render profile picture for messages sent by users other than "Austin" */}
                {message.origin !== myName && (
                  <Image
                    source={{
                      uri: "https://s3-alpha-sig.figma.com/img/fd16/f7c0/f7413b2e46fd5b05c964dd658938cd24?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kGuzGIOB9ol9Vbu8w-W47Gyk7nKDWUWhkjjYdCyeWep4IAptjL-JPwxafzQkabUDDGVJZcZuZu8WCsQWKliOmhNVCsQUGPLfolSzpBhFBVlr~RP~8o~uQWjqOlA0-oya-~L6Ytcyrb2ufynAHcvViB~RQOS4XpdOkXVC71LzISDtpggjkwWycXJWrQyrzyMvEtu9FghZjyOJRYitP0L3-Iu0VHbo~6tZIph8zzOVbOPOvpuj71SUtwhA2uUO9-PsKhyao9TYfJ0k1mUrg8WN40~fCeH4tNAj70m~B0H0qQEi79-FJB20B8yazYq5g3Y23OhI7vT0uQDSo1L6bv-CAw__",
                    }}
                    style={styles.chatProfileImage}
                  />
                )}
                <View
                  style={[
                    styles.bubble,
                    message.origin === myName
                      ? styles.bubbleMine
                      : styles.bubbleTheirs,
                  ]}
                >
                  <Text style={styles.bubbleText}>{message.message}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={newMessageText}
            placeholder="Enter text here..."
            onChangeText={(newMsg) => setNewMessageText(newMsg)}
          />
          <TouchableOpacity style={styles.btn} onPress={btnSendMsg}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white", // Or any other light shade you want for the background
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    // alignSelf: "center",
  },
  chatProfileImage: {
    width: 36,
    height: 36,
    borderRadius: 10,
    // alignSelf: "center",
  },
  confirmButton: {
    flexDirection: "row",
    backgroundColor: "#28637D",
    alignItems: "center",
    borderRadius: 100,
    // height: 45,
    // paddingVertical: 5,
    paddingHorizontal: 10,
  },
  confirmButton1: {
    flexDirection: "row",
    backgroundColor: "#EAEAEA",
    alignItems: "center",
    borderRadius: 100,
    // height: 20,
    // paddingVertical: 10,
    paddingHorizontal: 10,
  },
  confirmButtonText: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  confirmButtonText1: {
    fontFamily: "Poppins-Bold",
    color: "#EAEAEA",
    fontSize: 18,
    marginLeft: 10,
  },
  topHeader: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  userName: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    marginTop: 5,
  },
  date: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    marginTop: 5,
  },
  address: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    marginTop: 5,
  },
  header: {
    // flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#EAEAEA", // Or any other color you want for the header
  },
  container: {
    // marginTop: "80%",
    // width: "100%",
    // height: "10%",
    // alignItems: "center",
    // // borderWidth: 1,
    // justifyContent: "center",
    flex: 1,
  },

  inputContainer: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "transparent",
  },

  input: {
    width: "70%",
    height: 40,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "rgba(40, 99, 125, 0.3)",
    borderRadius: 100,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },

  btn: {
    backgroundColor: "#28637D",
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    color: "white",
  },

  msgArea: {
    width: "100%",
    height: 500,
    backgroundColor: "white",
    flexGrow: 1,
    padding: 10,
  },

  bubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },

  bubbleMine: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
  },

  bubbleTheirs: {
    marginLeft: 5,
    backgroundColor: "rgba(40, 99, 125, 0.3)",
    borderRadius: 10,
  },

  messageContainer: {
    flexDirection: "row",
  },

  bubbleText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },

  msgAreaContainer: {
    width: "100%",
    flex: 1,
  },

  messageTheirs: {
    // backgroundColor: "#EAEAEA", // Example background color for own messages
    alignSelf: "flex-start",
    // borderRadius: 10,
  },

  messageMine: {
    alignSelf: "flex-end", // Align message containers to the right side
    // backgroundColor: "rgba(40, 99, 125, 0.3)", // Example background color for own messages
    // borderRadius: 10,
  },
});

export default Chat;
