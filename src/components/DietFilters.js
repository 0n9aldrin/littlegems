import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, StyleSheet } from 'react-native';
import FilterButton from "./FilterButton";
import { useState, useEffect } from "react";

const DietFilters = ({ filters, setFilters, navigation}) => {
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
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalSubContainer}>
            <TextInput
              style={styles.newFilter}
              onChangeText={(inputText) => setNewFilter(inputText)}
              value={newFilter}
              placeholder="Enter new filter"
              placeholderTextColor="grey"
            />
            <View style={styles.subButtonContainer}>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => addFilterHandler()}
              >
                <Text style={styles.addFilterText}>Add Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButtonContainer}>
                <Text
                  style={styles.cancelButtonText}
                  onPress={() => cancelHandler()}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        
      </View>
      <ScrollView
        contentContainerStyle={styles.subContainer} // Apply flexWrap here
        horizontal={false}
        maintainVisibleContentPosition={{
            autoscrollToTopThreshold: 1,
            minIndexForVisible: 1,
          }}
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
    justifyContent: 'center', // Optional: align items in the center horizontally
    // borderWidth: 1,
    maxHeight: 70,
  },
  buttonContainer: {
    backgroundColor: "black",
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
    height: "30%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
  },
  newFilter: {
    backgroundColor: "white",
    width: "80%",
    borderBottomWidth: 2,
    marginTop: "20%",
  },
  subButtonContainer: {
    marginTop: "35%",
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "20%",
    alignItems: "center",
  },
  addButtonContainer: {
    borderWidth: 1,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  cancelButtonContainer: {
    borderWidth: 2,
    borderRadius: 10,
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
