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

  const handleSpeechRecognition = (e) => {
    const recognizedText = e.value;
    setUserInput(recognizedText);
    handleUserInput();
  };

 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Muni-Solve Bot</Text>
        <Icon name="user" size={24} color="#007AFF" />
      </View>
      <View style={styles.chatContainer}>
  <ScrollView>
    {messages.map((message, index) => (
      <View key={index} style={styles.messageContainer}>
        {message.isBot ? (
          <FontAwesome5 name="robot" size={24} color="#007AFF" style={styles.botmessageIcon} />
        ) : (
          <Icon name="user" size={24} color="#007AFF" style={styles.usermessageIcon} />
        )}
        <View
          style={[
            message.isBot ? styles.botMessage : styles.userMessage,
            styles.textContainer,
          ]}
        >
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
      </View>
    ))}
  </ScrollView>
</View>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={isRecording ? stopVoiceRecording : startVoiceRecording}>
          <Icon name={isRecording ? "stop-circle" : "microphone"} size={24} color="#007AFF" style={styles.microphoneIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.inputField}
          placeholder="Type your message..."
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
          onSubmitEditing={handleUserInput}
        />
        <TouchableOpacity onPress={handleUserInput}>
          <Icon name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  textContainer: {
      flex: 1,
      maxWidth: "70%",
      padding: 10,
      marginVertical: 8,
      borderRadius: 8,
    
  },

  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F3F3",
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    color: "#22719E"
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "70%",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#22719E",
  },
  messageIcon: {
    marginHorizontal: 8,
    color: "#22719E"
  },
  messageText: {
    fontSize: 16,
    color: "#22719E",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  inputField: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  microphoneIcon: {
    marginHorizontal: 8,
  },
});

export default Home;
