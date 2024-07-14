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
          const consultData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

  const renderItem = ({ item }) => (
    <View style={styles.consultItem}>
      <Text style={styles.consultName}>{item.topic}</Text>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  consultName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  consultDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
});

export default ConsultHistory;