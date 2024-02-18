import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const FilterButton = ({ text, add, remove }) => {
  const [textWidth, setTextWidth] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleTextLayout = (event) => {
    setTextWidth(event.nativeEvent.layout.width);
  };

  const pressHandler = () => {
    if (!isActive) {
        add(text);
    } else {
        remove(text);
    }
    setIsActive(!isActive)
  }

  return (
    <TouchableOpacity
        onPress={() => pressHandler()}
      style={[styles.container, { width: textWidth ? textWidth + 60 : "auto" }, isActive ? {backgroundColor: "black", borderColor: "black"} : {backgroundColor: "white"},]}
    >
      <Text style={[styles.plus, isActive ? {color: "white"} : {color: "black"},]}>+</Text>
      <Text style={[styles.text, isActive ? {color: "white"} : {color: "black"},]} onLayout={handleTextLayout}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#d3d3d3",
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 2,
    marginVertical: 5,
    justifyContent: "center",
    marginRight: 12,
    height: 60,
  },
  plus: {
    fontSize: 30,
    marginHorizontal: 10,
    fontFamily: "Poppins-Regular",
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
});

export default FilterButton;
