import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icons from "react-native-vector-icons/MaterialIcons";

const PhotoVerification = ({navigation}) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitVerification = () => {
    // Submit the image URI to your backend
    Alert.alert(
      "Image Submitted",
      "Your image has been submitted for verification."
    );
  };

  const pop = () => {
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={pop}>
            <Icons name="arrow-back-ios" size={20} color="#000" />
          </TouchableOpacity>
          <Image
            source={{
              uri: "https://s3-alpha-sig.figma.com/img/fd16/f7c0/f7413b2e46fd5b05c964dd658938cd24?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kGuzGIOB9ol9Vbu8w-W47Gyk7nKDWUWhkjjYdCyeWep4IAptjL-JPwxafzQkabUDDGVJZcZuZu8WCsQWKliOmhNVCsQUGPLfolSzpBhFBVlr~RP~8o~uQWjqOlA0-oya-~L6Ytcyrb2ufynAHcvViB~RQOS4XpdOkXVC71LzISDtpggjkwWycXJWrQyrzyMvEtu9FghZjyOJRYitP0L3-Iu0VHbo~6tZIph8zzOVbOPOvpuj71SUtwhA2uUO9-PsKhyao9TYfJ0k1mUrg8WN40~fCeH4tNAj70m~B0H0qQEi79-FJB20B8yazYq5g3Y23OhI7vT0uQDSo1L6bv-CAw__",
            }}
            style={styles.profileImage}
          />
          <Icons name="arrow-back-ios" size={20} color="transparent" />
        </View>
        <Text style={styles.date}>01/01/24 11:00 AM</Text>
        <Text style={styles.address}>69 Ur Mums Street, CA, 10001</Text>
      </View>
      <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.uploadText}>
            Drag & drop the receipt or select from photos
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={submitVerification}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topHeader: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  date: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    marginTop: 5,
  },
  address: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    marginTop: 5,
  },
  header: {
    // flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    // backgroundColor: "#EAEAEA", // Or any other color you want for the header
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    // alignSelf: "center",
  },
  uploadArea: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  uploadText: {
    textAlign: "center",
    color: "#888",
  },
  submitButton: {
    backgroundColor: "#28637D",
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "70%",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    alignSelf: "center",
  },
});

export default PhotoVerification;
