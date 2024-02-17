import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native"
import FilterButton from "./FilterButton"
import LoginButton from "./LoginButton"

import { useState } from "react"

const DietFilters = () => {
    const [filters, setFilters] = useState(["Vegan", "Vegetarian"]);
    const renderItem = ({ item }) => <FilterButton text={item} />

    const addFilter = (item) => {
        setFilters([...filters, item])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dietary Restrictions</Text> 
            <TouchableOpacity style={styles.buttonContainer} onPress={() => addFilter("yogurt")}>
                <Text style={styles.plus}>+</Text>
                <Text style={styles.buttonText}> Add a dietary restriction</Text>
            </TouchableOpacity>
            <View style={styles.subContainer}>
                {filters.map((filter, index) => (
                    <FilterButton key={index} text={filter} />
                ))}
            </View>
            <View style={styles.continueContainer}>
                <LoginButton text="continue" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: "12%"
    },
    subContainer :{ 
        flexDirection: "row",
        flexWrap: "wrap",
        // borderWidth: 1,
    },
    title : {
        fontSize: 20,
    },
    buttonContainer: {
        backgroundColor: "black",
        borderRadius: 12,
        width: "75%",
        // height: "17%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginVertical: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        // borderWidth: 1,
        // borderColor: "red",
    },
    plus: {
        color: "white",
        fontSize: 30,
        // borderWidth: 1,
        // borderColor: "red",
        justifyContent: "center",
        textAlign: "center"
    },
    continueContainer: {
        alignItems: "center",
    }
})

export default DietFilters;