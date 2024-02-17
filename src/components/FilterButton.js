import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const FilterButton = ({ text }) => {
  const [textWidth, setTextWidth] = useState(null);

  const handleTextLayout = (event) => {
    setTextWidth(event.nativeEvent.layout.width);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { width: textWidth ? textWidth + 60 : "auto" }]}
    >
      <Text style={styles.plus}>+</Text>
      <Text style={styles.text} onLayout={handleTextLayout}>
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
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: "center",
    // height: "12%",
  },
  plus: {
    fontSize: 30,
  },
  text: {
    fontSize: 20,
  },
});

export default FilterButton;
