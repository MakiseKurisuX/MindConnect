import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchConsults } from './consultData'; 

const ConsultHistory = () => {
  const [consults, setConsults] = useState([]);

  useEffect(() => {
    const loadConsults = async () => {
      const consultData = await fetchConsults();
      setConsults(consultData);
    };

    loadConsults();
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