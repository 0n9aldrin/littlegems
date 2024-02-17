import LoginButton from "../../components/LoginButton";

import { StyleSheet, View } from "react-native";

const Login = () => {
    return (
        <View style={styles.container}>
            <LoginButton />
        </View>

    );  
}

const styles = StyleSheet.create({
    container : {
        marginTop: "150%",
        width: "100%",
        height: "12%",
        alignItems: "center",
        // borderWidth: 1,
        justifyContent: 'center',
    }
})

export default Login;