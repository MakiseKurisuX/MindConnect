import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebaseConfig'; 
import { collection, query, where, onSnapshot, updateDoc, doc, getDoc, addDoc } from 'firebase/firestore';

const PeerRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(collection(db, 'Chats'), where('accepted', '==', false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedRequests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(fetchedRequests);
    });

    return () => unsubscribe();
  }, []);

  const handleAcceptRequest = async (item) => {
    Alert.alert(
      "Accept Request",
      "Do you want to accept this request?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              const peerDocRef = doc(db, 'Users', user.uid);
              const peerDoc = await getDoc(peerDocRef);

              if (peerDoc.exists()) {
                const peerData = peerDoc.data();
                const peerName = `${peerData.firstName} ${peerData.lastName}`;
                const chatDocRef = doc(db, 'Chats', item.id);

                await updateDoc(chatDocRef, {
                  accepted: true,
                  userId: Array.isArray(item.userId) ? [...item.userId, user.uid] : [user.uid],
                  peerName,
                });

                await addDoc(collection(db, 'Chats', item.id, 'messages'), {
                  _id: `system_${new Date().getTime()}`,
                  text: `${peerName} has accepted the chat request.`,
                  createdAt: new Date(),
                  system: true,
                });

                navigation.navigate('ChatPage', { chatId: item.id });
              } else {
                throw new Error("Peer document not found");
              }
            } catch (error) {
              console.error("Error accepting request: ", error);
              Alert.alert("Error", "Failed to accept the request. Please try again.");
            }
          }
        }
      ]
    );
  };

  const renderRequest = ({ item }) => (
    <TouchableOpacity onPress={() => handleAcceptRequest(item)}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>{item.topic}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.requestor}>Requestor: {item.requestor}</Text>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      renderItem={renderRequest}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  surface: {
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    borderRadius: 10, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  requestor: {
    fontSize: 14,
    color: 'darkgrey',
    marginTop: 4,
  },
});

export default PeerRequests;