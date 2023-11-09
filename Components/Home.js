import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const Home = ({navigation}) => {

  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    console.log("called");
    const objDiv = document.getElementById("messageArea");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat])

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = "Kabelo";
    const request_temp = {sender: "user", sender_id: name, message: inputMessage};

    if (inputMessage !== "") {
      setChat(chat => [...chat, request_temp]);
      setBotTyping(true);
      setInputMessage("");
      rasaAPI(name, inputMessage);
    } else {
      window.alert("Please enter valid message");
    }
  }

  const rasaAPI = async function handleClick(name, message) {
    await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "charset": "UTF-8",
      },
      credentials: "same-origin",
      body: JSON.stringify({ "sender": name, "message": message }),
    })
    .then(response => response.json())
    .then((response) => {
      if (response) {
        const temp = response[0];
        const recipient_id = temp["recipient_id"];
        const recipient_message = temp["text"];

        const response_temp = {sender: "bot", recipient_id : recipient_id,message: recipient_message};
        setBotTyping(false);

        setChat(chat => [...chat, response_temp]);
      }
    })
  }

  console.log(chat);







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
