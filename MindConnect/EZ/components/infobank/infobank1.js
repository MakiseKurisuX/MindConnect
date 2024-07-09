import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { fetchEntries } from './infobankData';
import { useNavigation } from '@react-navigation/native';
import filter from "lodash.filter";

const InfoBank = () => {
  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const loadEntries = async () => {
      const fetchedEntries = await fetchEntries();
      setEntries(fetchedEntries);
      setAllEntries(fetchedEntries);
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

  const handleSearch = (query) => {
    setSearch(query);
    const formatted = query.toLowerCase();
    const filtered = filter(allEntries, (user) => {
      return contains(user, formatted); //check against the formatted version
    });
    setEntries(filtered); //change the displayed to only the filtered ones
  }

  const contains = ({title, author, description}, query) => {
    if (title.toLowerCase().includes(query) ||
    author.toLowerCase().includes(query) ||
    description.toLowerCase().includes(query)) {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <View>
    <View style={{borderWidth: 1, margin: 10, justifyContent: "space-between"}}>
    <TextInput style={{marginLeft: 5}}
    placeholder="Search"
    clearButtonMode="always"
    value={search}
    onChangeText={(query) => handleSearch(query)}/>
    </View>
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}
      renderItem={renderEntry}
      contentContainerStyle={styles.container}
    />
    </View>
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