import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Animated,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

// Dummy data array
const touristsData = [
  {
    id: "1",
    name: "Marvis Ighedosa",
    rating: "4.4",
    location: "Location",
    dateTime: "Date/Time",
    bio: "some words about food preference/bio idk i’m just a woman",
    profileImage:
      "https://s3-alpha-sig.figma.com/img/fd16/f7c0/f7413b2e46fd5b05c964dd658938cd24?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kGuzGIOB9ol9Vbu8w-W47Gyk7nKDWUWhkjjYdCyeWep4IAptjL-JPwxafzQkabUDDGVJZcZuZu8WCsQWKliOmhNVCsQUGPLfolSzpBhFBVlr~RP~8o~uQWjqOlA0-oya-~L6Ytcyrb2ufynAHcvViB~RQOS4XpdOkXVC71LzISDtpggjkwWycXJWrQyrzyMvEtu9FghZjyOJRYitP0L3-Iu0VHbo~6tZIph8zzOVbOPOvpuj71SUtwhA2uUO9-PsKhyao9TYfJ0k1mUrg8WN40~fCeH4tNAj70m~B0H0qQEi79-FJB20B8yazYq5g3Y23OhI7vT0uQDSo1L6bv-CAw__", // You need to add the actual path to the profile image here
  },
  {
    id: "2",
    name: "Marvis Ighedosa",
    rating: "4.4",
    location: "Location",
    dateTime: "Date/Time",
    bio: "some words about food preference/bio idk i’m just a woman",
    profileImage:
      "https://s3-alpha-sig.figma.com/img/fd16/f7c0/f7413b2e46fd5b05c964dd658938cd24?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kGuzGIOB9ol9Vbu8w-W47Gyk7nKDWUWhkjjYdCyeWep4IAptjL-JPwxafzQkabUDDGVJZcZuZu8WCsQWKliOmhNVCsQUGPLfolSzpBhFBVlr~RP~8o~uQWjqOlA0-oya-~L6Ytcyrb2ufynAHcvViB~RQOS4XpdOkXVC71LzISDtpggjkwWycXJWrQyrzyMvEtu9FghZjyOJRYitP0L3-Iu0VHbo~6tZIph8zzOVbOPOvpuj71SUtwhA2uUO9-PsKhyao9TYfJ0k1mUrg8WN40~fCeH4tNAj70m~B0H0qQEi79-FJB20B8yazYq5g3Y23OhI7vT0uQDSo1L6bv-CAw__", // You need to add the actual path to the profile image here
  },
  {
    id: "3",
    name: "Marvis Ighedosa",
    rating: "4.4",
    location: "Location",
    dateTime: "Date/Time",
    bio: "some words about food preference/bio idk i’m just a woman",
    profileImage:
      "https://s3-alpha-sig.figma.com/img/fd16/f7c0/f7413b2e46fd5b05c964dd658938cd24?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kGuzGIOB9ol9Vbu8w-W47Gyk7nKDWUWhkjjYdCyeWep4IAptjL-JPwxafzQkabUDDGVJZcZuZu8WCsQWKliOmhNVCsQUGPLfolSzpBhFBVlr~RP~8o~uQWjqOlA0-oya-~L6Ytcyrb2ufynAHcvViB~RQOS4XpdOkXVC71LzISDtpggjkwWycXJWrQyrzyMvEtu9FghZjyOJRYitP0L3-Iu0VHbo~6tZIph8zzOVbOPOvpuj71SUtwhA2uUO9-PsKhyao9TYfJ0k1mUrg8WN40~fCeH4tNAj70m~B0H0qQEi79-FJB20B8yazYq5g3Y23OhI7vT0uQDSo1L6bv-CAw__", // You need to add the actual path to the profile image here
  },
  {
    id: "4",
    name: "Marvis Ighedosa",
    rating: "4.4",
    location: "Location",
    dateTime: "Date/Time",
    bio: "some words about food preference/bio idk i’m just a woman",
    profileImage:
      "https://s3-alpha-sig.figma.com/img/fd16/f7c0/f7413b2e46fd5b05c964dd658938cd24?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kGuzGIOB9ol9Vbu8w-W47Gyk7nKDWUWhkjjYdCyeWep4IAptjL-JPwxafzQkabUDDGVJZcZuZu8WCsQWKliOmhNVCsQUGPLfolSzpBhFBVlr~RP~8o~uQWjqOlA0-oya-~L6Ytcyrb2ufynAHcvViB~RQOS4XpdOkXVC71LzISDtpggjkwWycXJWrQyrzyMvEtu9FghZjyOJRYitP0L3-Iu0VHbo~6tZIph8zzOVbOPOvpuj71SUtwhA2uUO9-PsKhyao9TYfJ0k1mUrg8WN40~fCeH4tNAj70m~B0H0qQEi79-FJB20B8yazYq5g3Y23OhI7vT0uQDSo1L6bv-CAw__", // You need to add the actual path to the profile image here
  },
  // ... more items
];

// get curr user lat and lon

const TouristTile = ({
  name,
  rating,
  location,
  dateTime,
  bio,
  profileImage,
  id,
  navigation,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const expandAnimation = React.useRef(new Animated.Value(0)).current;

  const myData = useQuery(api.locals.getSelf);
  // console.log("mydata");
  // console.log(myData);
  // const requestList = allRequests({ lat: 10, lon: 10, dist: 10 });

  const toggleExpand = () => {
    Animated.timing(expandAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const expandStyle = {
    height: expandAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50], // Adjust the height as needed
    }),
  };

  const editMatch = useMutation(api.all_requests.change);

  const handleAccept = () => {
    Alert.alert(
      "Confirm Request",
      `Do you want to confirm ${name}'s request?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            editMatch({ id: id });
            console.log(`${name}'s request confirmed`);
            navigation.navigate("Chat", {
              prop1: name,
            });
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={toggleExpand} activeOpacity={0.9}>
      <View style={styles.tileContainerVertical}>
        <View style={styles.tileContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <View style={styles.tileTextContainer}>
            <View style={styles.tileHeaderContainer}>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.ratingBubble}>
                <Text style={styles.rating}>{rating}</Text>
              </View>
            </View>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.dateTime}>{dateTime}</Text>
            <Text style={styles.bio}>{bio}</Text>
          </View>
        </View>
        <Animated.View style={[styles.expandedContent, expandStyle]}>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const LocalHomeScreen = ({ navigation }) => {
  const onPressFilter = () => {
    console.log("Gilter pressed.");
  };
  const allRequests = useQuery(api.all_requests.get, {
    lat: 10,
    lon: 10,
    limit: 99999,
  });
  console.log(allRequests);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="user" size={24} color="white" />
        <Text style={styles.headerText}>Find a Tourist</Text>
        <View style={styles.iconContainer}>
          <Icon name="user" size={24} color="black" />
        </View>
      </View>
      {/* <TouchableOpacity onPress={onPressFilter} style={styles.buttonFilter}>
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity> */}
      <FlatList
        data={allRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouristTile
            name={item.name}
            rating={4.4}
            location={item.loc}
            dateTime={item.time}
            bio={item.note}
            id={item._id}
            profileImage={
              "https://s3-alpha-sig.figma.com/img/fd16/f7c0/f7413b2e46fd5b05c964dd658938cd24?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kGuzGIOB9ol9Vbu8w-W47Gyk7nKDWUWhkjjYdCyeWep4IAptjL-JPwxafzQkabUDDGVJZcZuZu8WCsQWKliOmhNVCsQUGPLfolSzpBhFBVlr~RP~8o~uQWjqOlA0-oya-~L6Ytcyrb2ufynAHcvViB~RQOS4XpdOkXVC71LzISDtpggjkwWycXJWrQyrzyMvEtu9FghZjyOJRYitP0L3-Iu0VHbo~6tZIph8zzOVbOPOvpuj71SUtwhA2uUO9-PsKhyao9TYfJ0k1mUrg8WN40~fCeH4tNAj70m~B0H0qQEi79-FJB20B8yazYq5g3Y23OhI7vT0uQDSo1L6bv-CAw__"
            }
            navigation={navigation}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center", // Center horizontally
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 16,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    // fontWeight: "bold",
    textAlign: "center", // Center the text horizontally
    flex: 1, // Take up remaining space
    fontFamily: "Poppins-Regular",
  },
  iconContainer: {
    // No need for marginLeft: "auto"
  },
  buttonFilter: {
    backgroundColor: "black",
    borderRadius: 60,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  filterButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  tileContainer: {
    flexDirection: "row",
    // padding: 20,
    // marginHorizontal: 20,
    // marginVertical: 10,
    // borderWidth: 2,
    // borderColor: "#EEEEEE",
    // borderRadius: 20,
  },
  tileContainerVertical: {
    flexDirection: "column",
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "rgba(40, 99, 125, 0.3)",
    borderRadius: 20,
  },
  tileHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tileInfoContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  tileTextContainer: {
    marginLeft: 10,
    justifyContent: "space-around",
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  ratingBubble: {
    backgroundColor: "rgba(40, 99, 125, 0.3)", // Background color of the bubble
    paddingHorizontal: 10,
    paddingVertical: 5, // Add padding to create space around the text
    borderRadius: 20, // Make it round
  },
  rating: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  location: {
    fontSize: 14,
    fontFamily: "Poppins-Italic",
  },
  dateTime: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
  },
  expandedContent: {
    overflow: "hidden",
  },
  acceptButton: {
    backgroundColor: "#28637D",
    padding: 10,
    borderRadius: 60,
    marginTop: 10,
  },
  acceptButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
});

export default LocalHomeScreen;
