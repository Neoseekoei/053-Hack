import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Voice from 'react-native-voice';

const Home = ({ navigation }) => {
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
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userInput, isBot: false },
      ]);
  
      // Bot responds based on user input
      const botResponse = getBotResponse(userInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, isBot: true },
      ]);
  
      // Clear the input field
      setUserInput("");
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
