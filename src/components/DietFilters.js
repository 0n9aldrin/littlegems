import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import FilterButton from "./FilterButton";
import { useState, useEffect } from "react";

const DietFilters = ({ filters, setFilters }) => {
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
      <Text style={styles.title}>Dietary Restrictions</Text>
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
      <View style={styles.subContainer}>
        {filterOptions.map((filter, index) => (
          <FilterButton
            key={index}
            text={filter}
            remove={removeFilter}
            add={addFilter}
          />
        ))}
      </View>
      <View style={styles.continueContainer}>
        <TouchableOpacity style={styles.continueSubContainer} onPress={{}}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: "17%",
  },
  subContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    backgroundColor: "black",
    borderRadius: 12,
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 5,
    height: "17%",
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
  continueContainer: {
    alignItems: "center",
  },
  newFilter: {
    backgroundColor: "white",
    width: "80%",
    borderBottomWidth: 2,
    marginTop: "20%",
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
  addFilterText: {
    textAlign: "left",
    color: "white",
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
  addButtonContainer: {
    borderWidth: 1,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  subButtonContainer: {
    marginTop: "35%",
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "20%",
    alignItems: "center",
  },
  cancelButtonContainer: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
  continueSubContainer: {
    backgroundColor: "black",
    borderRadius: "100%",
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
  },
});

export default DietFilters;
