import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebaseConfig'; 
import { collection, query, where, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';

const ConsultRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(collection(db, 'Consultations'), where('accepted', '==', false));

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
              const counselorDocRef = doc(db, 'Users', user.uid);
              const counselorDoc = await getDoc(counselorDocRef);
  
              if (counselorDoc.exists()) {
                const counselorData = counselorDoc.data();
                const counselorName = `${counselorData.firstName} ${counselorData.lastName}`;
                const consultationDocRef = doc(db, 'Consultations', item.id);
  
                const consultationDoc = await getDoc(consultationDocRef);
                let userIds = [];
                if (consultationDoc.exists()) {
                  const consultationData = consultationDoc.data();
                  userIds = Array.isArray(consultationData.userId) ? consultationData.userId : [consultationData.userId];
                }
  
                userIds.push(user.uid);
  
                await updateDoc(consultationDocRef, {
                  accepted: true,
                  status: 'accepted',
                  userId: userIds,
                  counselorName,
                });
  
                navigation.navigate('VideoCall', { consultationId: item.id, channelId: item.channelId });
              } else {
                throw new Error("Counselor document not found");
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
    fontSize: 16,
  },
  requestor: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
  },
});

export default ConsultRequests;