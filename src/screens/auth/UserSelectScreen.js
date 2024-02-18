import LoginButton from "../../components/LoginButton";

import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";

import RadiusSelector from "../../components/RadiusSelector";
import DietFilters from "../../components/DietFilters";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

import * as Location from "expo-location";

const UserSelect = ({ navigation }) => {
  const [userType, setUserType] = useState(0);
  const newTourist = useMutation(api.tourists.insert);
  const newLocal = useMutation(api.locals.insert);

  const [filters, setFilters] = useState([]);
  const [radius, setRadius] = useState(0);

  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Pleas grant location permissions");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLocation(location);
      console.log("Location:");
      console.log(location);
    };
    getPermissions();
  }, []);
  
  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address");
    console.log(geocodedLocation);
  };

//   const onContinuePress = async () => {
//     // Fetch the current location
//     setIsLoading(true);
//     const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
//     setLocation(currentLocation);

//     if (userType === 1) {
//       await newTourist({ dietary_restrictions: filters });
//       navigation.navigate("Tourist Home Screen");
//     }
//     if (userType === 0) {
//       const obj = reverseGeocode();
//       console.log("here");
//       console.log(obj);
//       await newLocal({ lon: 20, lat: 20, dist: radius });
//       navigation.navigate("Local Home Screen");
//     }
//     navigation.navigate("TouristHomeScreen");
//   };
const onContinuePress = async () => {
    setIsLoading(true);
    const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    setLocation(currentLocation);
  
    // Print longitude and latitude to the console
    console.log("Longitude:", currentLocation.coords.longitude);
    console.log("Latitude:", currentLocation.coords.latitude);
  
    if (userType === 1) {
      await newTourist({ dietary_restrictions: filters });
      navigation.navigate("Tourist Home Screen");
    }
    if (userType === 0) {
      await newLocal({ lon: currentLocation.coords.longitude, lat: currentLocation.coords.latitude, dist: radius });
      navigation.navigate("Local Home Screen");
    }
  };
  

  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });

    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
  };

  const pressHandler = () => {
    if (userType == 1) {
      setUserType(0);
    } else {
      setUserType(1);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Are you a tourist or a local?</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.subContainer,
            { backgroundColor: userType ? "white" : "#28637D" },
          ]}
          onPress={pressHandler}
        >
          <Text
            style={[
              styles.buttonText,
              { color: userType ? "#28637D" : "white" },
            ]}
          >
            Local
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subContainer,
            { backgroundColor: userType ? "#28637D" : "white" },
          ]}
          onPress={pressHandler}
        >
          <Text
            style={[
              styles.buttonText,
              { color: userType ? "white" : "#28637D" },
            ]}
          >
            Tourist
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.selectionContainer}>
        {userType === 0 && (
          <RadiusSelector radius={radius} setRadius={setRadius} />
        )}
        {userType === 1 && (
          <DietFilters filters={filters} setFilters={setFilters} />
        )}
      </View>
      <View style={styles.continueWrapper}>
        {!isLoading && (
          <LoginButton text="Continue" onPress={onContinuePress} />
        )}
        {isLoading && (
          <View
            style={[
              styles.smallContainer,
              { backgroundColor: "white", color: "#28637D" },
            ]}
          >
            <Text style={[styles.loadingText, { color: "#28637D" }]}>
              Loading...
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  space: {
    height: 15,
  },
  continueWrapper: {
    // borderWidth: 1,
    alignItems: "center",
  },
  selectionContainer: {
    marginTop: "10%",
  },
  subContainer: {
    backgroundColor: "#28637D",
    borderRadius: 100,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  smallContainer: {
    backgroundColor: "#28637D",
    borderRadius: 100,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  titleContainer: {
    maxWidth: "80%",
    marginBottom: "10%",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 30,
    textAlign: "center",
  }
});

export default UserSelect;
