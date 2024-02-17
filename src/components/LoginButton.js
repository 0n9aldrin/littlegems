import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LoginButton = ({text}) => {
    return(
        <TouchableOpacity style={styles.container}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        borderRadius: "100%",
        width: "70%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default LoginButton;