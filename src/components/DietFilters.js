import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import FilterButton from "./FilterButton";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Octicons";
import IconAnt from "react-native-vector-icons/AntDesign";

const DietFilters = ({ filters, setFilters, navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState(["Vegan", "Vegetarian"]);
  const [newFilter, setNewFilter] = useState("");

  const addFilterHandler = () => {
    setFilterOptions([...filterOptions, newFilter]);
    setIsModalVisible(false);
    setNewFilter("");
  };

  const cancelHandler = () => {
    setIsModalVisible(false);
    setNewFilter("");
  };

  const addFilter = (param) => {
    setFilters([...filters, param]);
  };

  const removeFilter = (param) => {
    setFilters(filters.filter((item) => item !== param));
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.plus}>+</Text>
        <Text style={styles.buttonText}> Add a dietary restriction</Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        // onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalSubContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Icon size={25} color={"black"} name="diff-added" />
              <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
                Add a Dietary Restriction
              </Text>
              <TouchableOpacity onPress={cancelHandler}>
                <IconAnt size={25} color={"black"} name="close" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.newFilter}
              onChangeText={(inputText) => setNewFilter(inputText)}
              value={newFilter}
              placeholder="Enter new restriction"
              placeholderTextColor="grey"
            />
            <View style={styles.subButtonContainer}>
              <TouchableOpacity style={styles.cancelButtonContainer}>
                <Text style={styles.cancelButtonText} onPress={cancelHandler}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => addFilterHandler()}
              >
                <Text style={styles.addFilterText}>Add Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={styles.subContainer} // Apply flexWrap here
        // horizontal={false}
      >
        {filterOptions.map((filter, index) => (
          <FilterButton
            key={index}
            text={filter}
            remove={removeFilter}
            add={addFilter}
          />
        ))}
      </ScrollView>
    </View>
  );
};

//if new filter is added make it automatically black

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    // borderWidth: 1,
    alignItems: "center",
    maxWidth: "90%",
    // marginBottom: "-10%",
  },
  subContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Apply flexWrap here
    justifyContent: "center", // Optional: align items in the center horizontally
    // borderWidth: 1,
    maxHeight: 70,
  },
  buttonContainer: {
    backgroundColor: "#28637D",
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 5,
    height: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
  plus: {
    color: "white",
    fontSize: 30,
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  modalContent: {
    backgroundColor: "grey",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalSubContainer: {
    width: "75%",
    height: "27%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  newFilter: {
    backgroundColor: "white",
    width: "92%",
    borderBottomWidth: 2,
    marginTop: 30,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  subButtonContainer: {
    marginTop: 30,
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "20%",
    alignItems: "center",
  },
  addButtonContainer: {
    backgroundColor: "#28637D",
    padding: 10,
    borderRadius: 100,
    width: "45%",
    alignItems: "center",
  },
  cancelButtonContainer: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#28637D",
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  addFilterText: {
    textAlign: "left",
    color: "white",
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
});

export default DietFilters;
