import React, { useState, useRef } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const TouristHomeScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const inputRef = useRef(null);

  const handlePlaceSelect = (place) => {
    // Extract and store only the first two parts from the display_name
    const placeParts = place.display_name.split(", ");
    const simplifiedName = placeParts.slice(0, 2).join(", ");
    setSelectedPlace(simplifiedName);
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
    // Handle selected time
  };

  const handleSubmit = () => {
    console.log("Selected Date:", date.toDateString());
    console.log("Selected Time:", date.toTimeString());
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Icon name="user" size={24} color="white" />
            <Text style={styles.headerText}>Find a Tourist</Text>
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
                value={selectedPlace || searchText}
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
                          {result.display_name
                            .split(", ")
                            .slice(0, 2)
                            .join(", ")}
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
              value={date}
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
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.buttonFilter}
            >
              <Text style={styles.filterButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
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
  searchResultsContainer: {
    position: "absolute",
    top: 110,
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
    backgroundColor: "black",
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
});

export default TouristHomeScreen;
