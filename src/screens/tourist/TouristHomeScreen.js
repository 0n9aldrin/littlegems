import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Modal,
  Animated,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Icons from "react-native-vector-icons/MaterialIcons";
import IconFont from "react-native-vector-icons/Fontisto";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const TouristHomeScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [stringDate, setStringDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState({
    name: "",
    lat: "",
    lon: "",
  });
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [hasPaid, setHasPaid] = useState(false);
  const inputRef = useRef(null);

  const newRequest = useMutation(api.all_requests.insert);
  const [taskId, setTaskId] = useState("jh74tx5nd9h8z28kqrv8a31tv16kpvj5");

  const match = useQuery(api.all_requests.get_with_id, { id: taskId });

  const handlePlaceSelect = (place) => {
    // Extract and store only the first two parts from the display_name
    const placeParts = place.display_name.split(", ");
    const simplifiedName = placeParts.slice(0, 2).join(", ");
    setSelectedPlace({
      name: simplifiedName,
      lat: place.lat,
      long: place.lon,
    });
    setSearchResults([]); // Collapse the search results
    setSearchText("");
  };

  const clearSearch = () => {
    setSearchText("");
    setSelectedPlace("");
    setSearchResults([]);
    inputRef.current.focus(); // Focus the text input after clearing
  };

  const handleSearch = async (text) => {
    setSearchText(text);
    if (!text.trim()) return; // Don't search if the text is empty

    setLoading(true); // Set loading state to true while waiting for response
    setNoResults(false);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${text}&limit=3&countrycodes=city`
      );
      setSearchResults(response.data.slice(0, 3)); // Limiting to 3 results
      if (response.data.length === 0) {
        setNoResults(true); // Set noResults state if there are no search results
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Set loading state back to false after response
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  const handleSubmit = async () => {
    const dateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );
    console.log(
      "Selected Date:",
      dateTime.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );
    console.log("Place: ", selectedPlace.name);
    console.log("Place Long: ", selectedPlace.long);
    console.log("Place Lat: ", selectedPlace.lat);
    console.log("Note: ", noteText);

    const id = await newRequest({
      loc: selectedPlace.name,
      lat: parseFloat(selectedPlace.lat),
      lon: parseFloat(selectedPlace.long),
      time: dateTime.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      }),
      note: noteText,
    });

    setTaskId(id);

    setModalVisible(true); // Show the modal
  };

  const handleConfirmedSubmit = async () => {
    navigation.navigate("Chat", {
      prop1: match["match"],
    });
    setModalVisible(false);
  };

  const handlePayment = async () => {
    setHasPaid(true);
    navigation.navigate("Payment", {
      prop1: () => setModalVisible(true),
    });
    setModalVisible(false);
  };

  const onCancel = () => {
    console.log("Request to cancel request in backend");
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Icon name="user" size={24} color="white" />
          <Text style={styles.headerText}>Find a Local</Text>
          <View style={styles.iconContainer}>
            <Icon name="user" size={24} color="black" />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.location}>Location</Text>
          <View style={styles.searchSection}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Search for a city"
              value={selectedPlace.name || searchText}
              onChangeText={setSearchText}
              onSubmitEditing={() => handleSearch(searchText)}
              onFocus={() => setSearchResults([])}
            />
            <Icon
              name="x-circle"
              size={20}
              color="gray"
              style={styles.clearIcon}
              onPress={clearSearch}
            />
          </View>
          {searchText.trim().length > 0 &&
            (loading || searchResults.length > 0 || noResults) && (
              <View style={styles.searchResultsContainer}>
                {loading ? (
                  // Display loading spinner
                  <ActivityIndicator
                    size="small"
                    color="black"
                    style={{ marginTop: 10 }}
                  />
                ) : searchResults.length > 0 ? (
                  // Display search results
                  searchResults.map((result, index) => (
                    <TouchableOpacity
                      key={result.place_id}
                      style={[
                        styles.searchResultItem,
                        index === searchResults.length - 1 &&
                          styles.noBottomBorder,
                      ]}
                      onPress={() => handlePlaceSelect(result)}
                    >
                      <Icon
                        name="map-pin"
                        size={18}
                        style={styles.searchResultIcon}
                      />
                      <Text style={styles.searchResultText}>
                        {result.display_name.split(", ").slice(0, 2).join(", ")}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : noResults ? (
                  // Display "No results" message
                  <Text style={styles.searchResultItem}>No results</Text>
                ) : null}
              </View>
            )}

          <Text style={styles.date}>Date</Text>
          {/* <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.buttonDate}
        >
          <Text style={styles.buttonDateText}>Pick Date</Text>
        </TouchableOpacity> */}
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
          <Text style={styles.time}>Time</Text>
          {/* <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={styles.buttonTime}
        >
          <Text style={styles.buttonTimeText}>Pick Time</Text>
        </TouchableOpacity> */}
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />

          <Text style={styles.notes}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            multiline={true}
            numberOfLines={4}
            maxLength={50}
            placeholder="Enter notes (max 50 characters)"
            onChangeText={setNoteText}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonFilter}>
            <Text style={styles.filterButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              {/* Hang on */}
              {(!match || (match && !match["match"])) && (
                <View>
                  <Text style={styles.modalText}>
                    Hang on we're finding a local!
                  </Text>
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={styles.spinny}
                  />
                  <TouchableOpacity
                    onPress={onCancel}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.modalTextCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
              {match && match["match"] && (
                <View>
                  <Text style={styles.modalText}>You've been paired!</Text>
                  <View style={styles.tileContainerVertical}>
                    <View style={styles.tileContainer}>
                      <Image
                        source={{
                          uri: "https://s3-alpha-sig.figma.com/img/fd16/f7c0/f7413b2e46fd5b05c964dd658938cd24?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kGuzGIOB9ol9Vbu8w-W47Gyk7nKDWUWhkjjYdCyeWep4IAptjL-JPwxafzQkabUDDGVJZcZuZu8WCsQWKliOmhNVCsQUGPLfolSzpBhFBVlr~RP~8o~uQWjqOlA0-oya-~L6Ytcyrb2ufynAHcvViB~RQOS4XpdOkXVC71LzISDtpggjkwWycXJWrQyrzyMvEtu9FghZjyOJRYitP0L3-Iu0VHbo~6tZIph8zzOVbOPOvpuj71SUtwhA2uUO9-PsKhyao9TYfJ0k1mUrg8WN40~fCeH4tNAj70m~B0H0qQEi79-FJB20B8yazYq5g3Y23OhI7vT0uQDSo1L6bv-CAw__",
                        }}
                        style={styles.profileImage}
                      />
                      <View style={styles.tileTextContainer}>
                        <View style={styles.tileHeaderContainer}>
                          <Text style={styles.name}>{match["match"]}</Text>
                          <View style={styles.ratingBubble}>
                            <Text style={styles.rating}>4.4</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.payment} onPress={handlePayment}>
                    <IconFont name="apple-pay" size={20} color="#000" />
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 16,
                        marginLeft: 10,
                        marginRight: 100,
                      }}
                    >
                      **** **** **** 6557
                    </Text>
                    <Icons name="arrow-forward-ios" size={20} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={hasPaid ? handleConfirmedSubmit : null}
                    style={[
                      styles.buttonFilter,
                      !hasPaid && styles.disabledButton,
                    ]}
                    disabled={!hasPaid}
                  >
                    <Text style={styles.filterButtonText}>Confirm</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalTextCancel}>Cancel</Text>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 16,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    flex: 1,
    fontFamily: "Poppins-Regular",
  },
  iconContainer: {},
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
  clearIcon: {
    padding: 10,
  },
  spinny: {
    padding: 50,
  },
  searchResultsContainer: {
    position: "absolute",
    top: 90,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    paddingVertical: 10,
    // paddingHorizontal: 20,
    zIndex: 1,
    paddingTop: 0,
    borderWidth: 1,
    borderColor: "gray",
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingHorizontal: 20,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
  noBottomBorder: {
    borderBottomWidth: 0,
    marginBottom: -10,
  },
  searchResultIcon: {
    marginRight: 10,
  },
  searchResultText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  buttonDate: {
    backgroundColor: "black",
    borderRadius: 100,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonDateText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTime: {
    backgroundColor: "black",
    borderRadius: 100,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonTimeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonFilter: {
    backgroundColor: "#28637D",
    borderRadius: 100,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "rgba(40, 99, 125, 0.3)",
    borderRadius: 100,
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
    fontFamily: "Poppins-Bold",
  },
  notesInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 100, // Adjust height according to your design
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
  location: {
    marginBottom: 20,
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  date: {
    marginVertical: 20,
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  time: {
    marginVertical: 20,
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  notes: {
    marginVertical: 20,
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#F3F3F3",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  tileHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tileInfoContainer: {
    flexDirection: "row",
    marginBottom: 8,
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 20,
    width: "100%",
    height: "100%",
  },
  modalText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "black",
    alignSelf: "center",
  },
  modalTextCancel: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "red",
    alignSelf: "center",
  },
  cancelButton: {
    // backgroundColor: "white",
    borderRadius: 100,
    width: "70%",
    borderWidth: 2,
    borderColor: "grey",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  tileContainerVertical: {
    flexDirection: "column",
    padding: 20,
    // marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "rgba(40, 99, 125, 0.3)",
    borderRadius: 20,
  },
  tileTextContainer: {
    marginLeft: 10,
    justifyContent: "space-around",
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    // alignSelf: "center",
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
  location1: {
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
  payment: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 20,
  },
});

export default TouristHomeScreen;
