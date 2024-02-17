import LoginButton from "../../components/LoginButton";

import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";

const UserSelect = () => {
    // add function prop to LoginButton and change name to just Button
    // 0 = local, 1 = tourist
    const [userType, setUserType] = useState(0);

    useEffect(() => {
        console.log(userType);
      }, [userType]);


    return (
        <View style={styles.container}>
            <LoginButton text="Local"/>
            <View style={styles.space}></View>
            <LoginButton text="Tourist"/>
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