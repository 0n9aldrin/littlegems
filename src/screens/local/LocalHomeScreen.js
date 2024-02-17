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
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

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

const TouristTile = ({
  name,
  rating,
  location,
  dateTime,
  bio,
  profileImage,
}) => {
  const [expanded, setExpanded] = useState(false);
  const expandAnimation = useRef(new Animated.Value(0)).current;

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
            <View style={styles.tileInfoContainer}>
              <Text style={styles.location}>{location}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.dateTime}>{dateTime}</Text>
            </View>
            <Text style={styles.bio}>{bio}</Text>
          </View>
        </View>
        <Animated.View style={[styles.expandedContent, expandStyle]}>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const LocalHomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="user" size={24} color="white" />
        <Text style={styles.headerText}>Find a Tourist</Text>
        <View style={styles.iconContainer}>
          <Icon name="user" size={24} color="black" />
        </View>
      </View>
      <FlatList
        data={touristsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouristTile
            name={item.name}
            rating={item.rating}
            location={item.location}
            dateTime={item.dateTime}
            bio={item.bio}
            profileImage={item.profileImage}
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
  },
  iconContainer: {
    // No need for marginLeft: "auto"
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
    borderColor: "#EEEEEE",
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
    fontWeight: "bold",
  },
  ratingBubble: {
    backgroundColor: "#EEEEEE", // Background color of the bubble
    paddingHorizontal: 10,
    paddingVertical: 5, // Add padding to create space around the text
    borderRadius: 20, // Make it round
  },
  rating: {
    fontSize: 14,
  },
  location: {
    fontSize: 14,
  },
  dot: {
    fontSize: 14,
    marginHorizontal: 5,
  },
  dateTime: {
    fontSize: 14,
  },
  bio: {
    fontSize: 14,
    marginBottom: 5,
  },
  expandedContent: {
    overflow: "hidden",
  },
  acceptButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  acceptButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LocalHomeScreen;
