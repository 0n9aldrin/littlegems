import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import FilterButton from "./FilterButton"

const DietFilters = () => {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Dietary Restrictions</Text> */}
            {/* <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.plus}>+</Text>
                <Text style={styles.buttonText}> Add a dietary restriction</Text>
            </TouchableOpacity> */}
            <FilterButton text={"Vegan"} />
            <FilterButton text={"Vegetarian"} />
            <FilterButton text={"Vegetarian"} />
            <FilterButton text={"no beans"} />
            <FilterButton text={"Vegetarian"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container :{ 
        padding: 20,
        paddingTop: 40,
        flexDirection: "row",
        flexWrap: "wrap",
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
    }
})

export default DietFilters;