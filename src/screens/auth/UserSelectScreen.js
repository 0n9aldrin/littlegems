import LoginButton from "../../components/LoginButton";

import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";

import RadiusSelector from "../../components/RadiusSelector";
import DietFilters from "../../components/DietFilters";

const UserSelect = () => {
    const [userType, setUserType] = useState(0);

    useEffect(() => {
        console.log(userType);
      }, [userType]);

    return (
        <View>
            <View style={styles.container}>
                <LoginButton text="Local" onPress={() => setUserType(0)}/>
                <View style={styles.space}></View>
                <LoginButton text="Tourist" onPress={() => setUserType(1)}/>
            </View>
            <View>
                {userType === 0 && <RadiusSelector />}
                {userType === 1 && <DietFilters />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: "30%",
        alignItems: "center",
        justifyContent: "space-between"
    },
    space: {
        height: 15,
    }
})

export default UserSelect;