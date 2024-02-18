import LoginButton from "../../components/LoginButton";

import { StyleSheet, View } from "react-native";
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

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Pleas grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
    };
    getPermissions();
  }, []);

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address");
    console.log(geocodedLocation);
  };

  const onContinuePress = async () => {
    // Fetch the current location
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

    if (userType === 1) {
      await newTourist({ dietary_restrictions: filters });
      navigation.navigate("Tourist Home Screen");
    }
    if (userType === 0) {
      const obj = reverseGeocode();
      console.log("here");
      console.log(obj);
      await newLocal({ lon: 20, lat: 20, dist: radius });
      navigation.navigate("Local Home Screen");
    }
    navigation.navigate("TouristHomeScreen");
  };

  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });

    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
  };

  return (
    <View>
      <View style={styles.container}>
        <LoginButton text="Local" onPress={() => setUserType(0)} />
        <View style={styles.space}></View>
        <LoginButton text="Tourist" onPress={() => setUserType(1)} />
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
        <LoginButton text="Continue" onPress={onContinuePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "80%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  space: {
    height: 15,
  },
  continueWrapper: {
    // borderWidth: 1,
    alignItems: "center",
    marginTop: "0%",
  },
  selectionContainer: {
    marginTop: "10%",
  },
});

export default UserSelect;
