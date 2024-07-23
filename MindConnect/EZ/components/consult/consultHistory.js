import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig'; 

const ConsultHistory = () => {
  const [consults, setConsults] = useState([]);

  useEffect(() => {
    const fetchConsults = (callback) => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("No authenticated user found");
        }

        const consultsRef = collection(db, 'Consultations');
        const q = query(consultsRef, where('userId', 'array-contains', user.uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const consultData = querySnapshot.docs
            .filter(doc => doc.data().status === 'accepted' && doc.data().endCall) 
            .map(doc => ({ id: doc.id, ...doc.data() }));
          callback(consultData);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    const unsubscribe = fetchConsults(setConsults);

    return () => unsubscribe();
  }, []);

  const formatDuration = (start, end) => {
    const startTime = new Date(start.seconds * 1000);
    const endTime = new Date(end.seconds * 1000);
    const duration = (endTime - startTime) / 1000; 

    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    return `${minutes}m ${seconds}s`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.consultItem}>
      <Text style={styles.consultName}>{item.topic}</Text>
      {item.status === 'accepted' && item.endCall && (
        <Text style={styles.consultDuration}>Duration: {formatDuration(item.createdAt, item.endCall)}</Text>
      )}
      <Text style={styles.consultDescription}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={consults}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  consultItem: {
    paddingLeft: 10,
    paddingBottom: 6,
    paddingTop: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  consultName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  consultDuration: {
    fontSize: 16,
    color: 'black',
    marginTop: 4,
  },
  consultDescription: {
    fontSize: 16,
    color: 'dimgray',
    marginTop: 4,
  },
});

export default ConsultHistory;