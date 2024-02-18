import LoginButton from "../../components/LoginButton";

import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";

import RadiusSelector from "../../components/RadiusSelector";
import DietFilters from "../../components/DietFilters";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const UserSelect = () => {
  const [userType, setUserType] = useState(0);
  const newTourist = useMutation(api.tourists.insert);
  const newLocal = useMutation(api.locals.insert);

  const [filters, setFilters] = useState([]);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    console.log(userType);
  }, [userType]);

  const onContinuePress = async () => {
    if (userType == 1) {
      await newTourist({ dietary_restrictions: filters });
    }
    if (userType == 0) {
      await newLocal({ lon: 20, lat: 20, dist: radius });
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <LoginButton text="Local" onPress={() => setUserType(0)} />
        <View style={styles.space}></View>
        <LoginButton text="Tourist" onPress={() => setUserType(1)} />
      </View>
      <View>
        {userType === 0 && (
          <RadiusSelector radius={radius} setRadius={setRadius} />
        )}
        {userType === 1 && (
          <DietFilters filters={filters} setFilters={setFilters} />
        )}
      </View>
      <LoginButton text="Continue" onPress={onContinuePress} />
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
});

export default UserSelect;
