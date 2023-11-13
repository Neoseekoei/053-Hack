import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const Edit = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleValidation = () => {
    if (!username || !email || !mobileNumber || !gender || !dateOfBirth) {
      Alert.alert("Validation Error", "Please fill in all the fields.");
    } else if (!isValidEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
    } else if (!isValidMobileNumber(mobileNumber)) {
      Alert.alert("Validation Error", "Please enter a valid mobile number.");
    } else {
      // All validations passed, you can save the data or perform other actions here
      Alert.alert("Success", "Data saved successfully!");
    }
  };

  const isValidEmail = (email) => {
    // You can implement more sophisticated email validation if needed
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  const isValidMobileNumber = (mobileNumber) => {
    // You can customize this validation according to your requirements
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobileNumber);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>
      </View>
      <Image style={styles.logo} source={require("../assets/user.png")} />

      <View style={styles.user}>
        <View style={styles.inputContainer}>
          <Image source={require("../assets/user.png")} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require("../assets/3.png")} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require("../assets/2.png")} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={(text) => setMobileNumber(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require("../assets/icons8-gender-64.png")} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={(text) => setGender(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require("../assets/icons8-birth-date-48.png")} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChangeText={(text) => setDateOfBirth(text)}
          />
        </View>

        <TouchableOpacity style={styles.submitbtn} onPress={handleValidation}>
          <Text style={{ color: "white", alignSelf: 'center' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 450,
    height: 250,
    backgroundColor: "#22719E",
    borderRadius: 15,
  },

  header: {
    fontSize: 20,
    marginLeft: 150,
    width: 116,
    height: 25,
    fontFamily: "Inter",
    color: "black",
  },

  logo: {
    height: 150,
    width: 150,
    position: "absolute",
    zIndex: 1,
    top: 50,
    marginLeft: 90,
  },

  user: {
    height: 100,
    width: 300,
    backgroundColor: "",
    position: "absolute",
    zIndex: 1,
    marginTop: 300,
    marginLeft: 50,
    paddingBottom: 450,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    paddingHorizontal: 7,
    marginVertical: 10,
    backgroundColor: "#ffff",
    width: 250,
    height: 40,
    marginLeft: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: "contain",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ffff",
  },

  submitbtn: {
    borderWidth: 1,
    width: 250,
    height: 40,
    textAlign: "center",
    paddingTop: 9,
    alignSelf: "center",
    marginTop: 40,
    backgroundColor: "#22719E",
    borderColor: "#22719E",
    color: "#ffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
});

export default Edit;
