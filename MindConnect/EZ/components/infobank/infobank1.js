import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { fetchEntries } from './infobankData';
import { useNavigation } from '@react-navigation/native';

const InfoBank = () => {
  const [entries, setEntries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadEntries = async () => {
      const fetchedEntries = await fetchEntries();
      setEntries(fetchedEntries);
    };

    loadEntries();
  }, []);

  const renderEntry = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EntryDetail', { entry: item })}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>by {item.author}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}
      renderItem={renderEntry}
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
  description: {
    fontSize: 14,
  },
});

export default InfoBank;