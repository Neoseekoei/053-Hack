import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const History = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const authUser = auth.currentUser;

        if (authUser) {
          const querySnapshot = await getDocs(
            query(collection(db, formattedDate + authUser.uid), where('owner_uid', '==', authUser.uid))
          );

          const historyData = [];

          querySnapshot.forEach((doc) => {
            historyData.push(doc.data());
          });

          setChatHistory(historyData);
        } else {
          console.error('User not authenticated');
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []); // Empty dependency array to fetch history only once when the component mounts

  return (
    <View>
      <Text>Chat History</Text>
      {chatHistory.map((entry, index) => (
        <View key={index}>
          {/* Display chat history data here */}
          <Text>{formattedDate}</Text>
        </View>
      ))}
    </View>
  );
};

export default History;
