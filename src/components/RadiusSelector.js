import Slider from '@react-native-community/slider';

import { View, StyleSheet, Text } from 'react-native';
import { useState } from 'react';

const RadiusSelector = () => {
    const [radius, setRadius] = useState(0);

    return (
        <View style={styles.container}>
            <Slider 
                style={styles.slider}
                minimumValue={0}
                maximumValue={50}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                onValueChange={(value)=>setRadius(value)}
            />
            <View style={styles.textWrapper}>
                <Text style={styles.minVal}>0 mi</Text>
                <Text style={styles.maxVal}>50 mi</Text>
            </View>
            <View style={styles.radiusWrapper}>
                <Text style={styles.radiusText}>{Math.round(radius)} mi</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    slider: {
        marginTop: "10%",
        width: "80%",
    },
    minVal: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
    },
    maxVal : {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
    },
    textWrapper: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between"
    },
    radiusText: {
        marginTop: "5%",
        fontSize: 40,
        fontFamily: "Poppins-Bold",
    }

})

export default RadiusSelector;