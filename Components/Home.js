import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Voice from 'react-native-voice';

const Home = ({navigation}) => {



  const [messages, setMessages] = useState([
    { text: "Hi, How can I help you", isBot: true },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const requestMicrophonePermission = async () => {
    try {
      const granted = await Voice.requestPermissions({
        voice: true, // request microphone access
        voiceRecognition: true, // request voice recognition access
      });
      if (granted) {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
        // Handle the case where the user denied microphone access
      }
    } catch (error) {
      console.error('Error requesting microphone permission: ', error);
    }
  };
  useEffect(() => {
    requestMicrophonePermission();
    Voice.onSpeechEnd = handleSpeechRecognition;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const handleUserInput = () => {
    if (userInput) {
      setChat((prevChat) => [
        ...prevChat,
        { sender: 'user', message: userInput },
      ]);

      // Bot responds based on user input
      const botResponse = getBotResponse(userInput);
      setChat((prevChat) => [
        ...prevChat,
        { sender: 'bot', message: botResponse },
      ]);

      // Clear the input field
      setUserInput('');
    }
  };
  const getBotResponse = (userInput) => {
    userInput = userInput.toLowerCase();
    if (userInput.includes("discount")) {
      return "Early payment discounts are incentives offered by the municipality for prompt payment of bills. If you pay your account in full and on time, you can add up to significant savings over time.";
    } else if (userInput.includes("help")) {
      return "How can I assist you today?";
    } else {
      return "I'm sorry, I couldn't understand your request. Please try again.";
    }
  };
  const startVoiceRecording = async () => {
    try {
      await Voice.start("en-US");
      setIsRecording(true);
    } catch (e) {
      console.error(e);
    }
  };
  const stopVoiceRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      console.error(e);
    }
  };
  const handleSpeechRecognition = (e) => {
    const recognizedText = e.value;
    setUserInput(recognizedText);
    handleUserInput();
  };

  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setBotTyping] = useState(false);

  const scrollView = useRef();

  useEffect(() => {
    // Scroll to the bottom when chat changes
    scrollView.current.scrollToEnd({ animated: true });
  }, [chat]);

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
    try{
   const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "charset": "UTF-8",
      },
      body: JSON.stringify({ "sender": name, "message": message }),
    })

    if (!response.ok) {
      console.error(`Server responded with status ${response.status}`);
    }

    const responseData = await response.json();

    
    if (responseData && responseData.length > 0) {
      const temp = responseData[0];
      const recipient_id = temp["recipient_id"];
      const recipient_message = temp["text"];

      const response_temp = { sender: "bot", recipient_id: recipient_id, message: recipient_message };
      setBotTyping(false);

      setChat((prevChat) => [...prevChat, response_temp]);
    }
  } catch(error){
    console.error("Error in fetch: ", error.message)
  }

  console.log(response);
  }

  console.log(chat);







  const [message, setMessage] = useState("Hi, How can I help you");

  const handleUserIconPress = () => {
    setMessage("I need help regarding water & sanitation");
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = { sender: 'user', message: inputMessage };
      setChat((prevChat) => [...prevChat, newMessage]);
      setInputMessage('');
      // Call the function to send the message to the chatbot server
      rasaAPI("Kabelo", inputMessage);
    }
  }

  const sendToChatbot = async (message) => {
    try {
      const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "charset": "UTF-8",
        },
        body: JSON.stringify({ sender: 'user', message }),
      });
      const data = await response.json();
      const botResponse = { sender: 'bot', message: data.text };
      setChat((prevChat) => [...prevChat, botResponse]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }
  };
 

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Muni-Solve Bot</Text>
      <Icon name="user" size={24} color="#007AFF" />
    </View>
    <View style={styles.chatContainer}>
{/*<ScrollView ref={scrollView}>
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
      </ScrollView> */}

<ScrollView ref={scrollView}>
  {chat.map((message, index) => (
    <View key={index} style={message.sender === 'bot' ? styles.botMessage : styles.userMessage}>
      <Text>{message.message}</Text>
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
        value={inputMessage}
        onChangeText={(text) => setInputMessage(text)}
        onSubmitEditing={handleUserInput}
      />
      <TouchableOpacity onPress={handleSendMessage}>
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
    width: "auto", // Set maxWidth to auto
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
    color: "#000",
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

  botmessageIcon: {
    marginRight: 5,
    alignSelf: "flex-start"
  },

  usermessageIcon: {
    marginRight: 5,
    alignSelf: "flex-start",
  }

});

export default Home;
