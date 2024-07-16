import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../../firebaseConfig';
import { doc, onSnapshot, deleteDoc, getDoc } from 'firebase/firestore';

const WaitPage = () => {
  const route = useRoute();
  const { consultationId } = route.params;
  const navigation = useNavigation();
  const [status, setStatus] = useState('waiting');
  const [channelId, setChannelId] = useState('');

  useEffect(() => {
    const consultationDocRef = doc(db, 'Consultations', consultationId);
    
    const timer = setTimeout(async () => {
      try {
        const docSnap = await getDoc(consultationDocRef);
        if (docSnap.exists() && docSnap.data().status === 'waiting') {
          await deleteDoc(consultationDocRef);
          Alert.alert("Request Timeout", "No counselor accepted your request within 15 minutes. Please try again.");
          navigation.navigate('Consult'); 
        }
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }, 900000); 

    const unsubscribe = onSnapshot(consultationDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setStatus(data.status);
        setChannelId(data.channelId);
        if (data.status === 'accepted') {
          clearTimeout(timer); 
          navigation.navigate('VideoCall', { consultationId: data.id, channelId: data.channelId });
        }
      }
    });

    return () => {
      clearTimeout(timer); 
      unsubscribe();
    };
  }, [consultationId]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please wait while we connect you with a counselor. Please do not leave this page. </Text>
      <ActivityIndicator size="large" color="#32CD32" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default WaitPage;