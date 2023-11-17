import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAuth } from 'firebase/auth';


const Home = ({navigation}) => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  useEffect(() => {
    const addDocument = async () => {
      try {
        const authUser = getAuth().currentUser;
        if (authUser) {
          const docRef = await addDoc(collection(db, formattedDate + authUser.uid), {
            owner_uid: authUser.uid,
            messages: chat,
            timestamp: serverTimestamp(),
          });

          console.log('Document written with ID: ', docRef.id);
          navigation.navigate('User');
        } else {
          console.error('User not authenticated');
        }
      } catch (e) {
        console.error('Error adding document: ', e);
      }

      rasaAPI("Kabelo" , "KB")

      
    };

    addDocument(); // Move this line outside the try-catch block

    return () => {
      // Cleanup function if needed
    };
  }, [chat, formattedDate]);

  const Signout = () => {
    signOut(auth)
      .then(() => {
        alert('Log out successful');
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const rasaAPI = async function handleClick(name, message) {
    try {
      const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "charset": "UTF-8",
        },
        credentials: "same-origin",
        body: JSON.stringify({ "sender": name, "message": message }),
      });

      const responseData = await response.json();
      console.log(responseData)

      if (responseData && responseData.length > 0) {
        const temp = responseData[0];
        const recipient_id = temp["recipient_id"];
        const recipient_message = temp["text"];
        const response_temp = { sender: "bot", recipient_id: recipient_id, message: recipient_message };
       
       console.log(response)
        setChat((prevChat) => [...prevChat, response_temp]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(chat);

  const handleUserInput = () => {
    if (userInput.trim() !== "") {
      setChat((prevChat) => [...prevChat, { sender: "user", message: userInput }]);
      rasaAPI("Kabelo", userInput);
      setUserInput("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <AntDesign name="user" size={34} color="#007AFF" style={styles.usermessageIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Muni-Solve Bot</Text>
        <TouchableOpacity onPress={Signout}>
          <FontAwesome name="sign-out" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.chatContainer}>
        <ScrollView>
          {chat.map((message, index) => (
            <View key={index} style={styles.messageContainer}>
              {message.sender === "bot" ? (
                <FontAwesome5 name="robot" size={24} color="#007AFF" style={styles.botmessageIcon} />
              ) : (
                <AntDesign name="user" size={24} color="#007AFF" style={styles.usermessageIcon} />
              )}
              <View
                style={[
                  message.sender === "bot" ? styles.botMessage : styles.userMessage,
                  styles.textContainer,
                ]}
              >
                <Text style={styles.messageText}>{message.message}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        
        <TextInput
          style={styles.inputField}
          placeholder="Type your message..."
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
        />
        <TouchableOpacity onPress={handleUserInput}>
        <FontAwesome name="send" size={24} color="#007AFF" />
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
