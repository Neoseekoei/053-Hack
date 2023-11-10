import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const Home = ({navigation}) => {
  const [message, setMessage] = useState("Hi, How can I help you");

  const handleUserIconPress = () => {
    setMessage("I need help regarding water & sanitation");
  };

  const handleChoicePress = () => {
    setMessage("Please choose from the following options/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.muni}>Muni-Solve Bot</Text>
        <TouchableOpacity onPress={handleUserIconPress}>
          <View style={styles.user}>
            <Image source={require("../assets/user.png")} style={styles.userIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Image source={require("../assets/icons8-m-64.png")} style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={handleChoicePress}>
          <Text style={styles.choiceText}>View Choices</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
      },
      top: {
        height: 50,
        backgroundColor: "#F8F3F3",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        width: 450
      },
      muni: {
        marginLeft: 90,
        fontSize: 24,
      },
      user: {
        marginLeft: "auto",
      },
      userIcon: {
        width: 30,
        height: 30,
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        backgroundColor: "#ffff",
        width: 250,
        height: 40,
        marginLeft: 24,
        marginTop: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
      },
      icon: {
        width: 30,
        height: 30,
        marginRight: 10,
        resizeMode: "contain",
      },

      hi: {
        borderRadius: 10,
        backgroundColor: '#F8F3F3',
        width: 150,
        height:40,
        marginTop: 20,
        textAlign: 'center'
      },

      hi1: {
        borderRadius: 10,
        backgroundColor: 'blue',
        width: 150,
        height:40,
        color: 'white',
      },

      hi2: {
        borderRadius: 10,
        backgroundColor: '#F8F3F3',
        width: 150,
        height:40,
        marginTop: 20
      },

    });
    
    export default Home;
