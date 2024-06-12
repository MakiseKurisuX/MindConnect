import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchChats } from './ChatData';

const ChatList = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadChats = async () => {
      const chatData = await fetchChats();
      setChats(chatData);
    };

    loadChats();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ChatPage', { chatId: item.id, chatName: item.topic })}>
      <View style={styles.chatItem}>
        <Text style={styles.chatName}>{item.topic}</Text>
        <Text style={styles.chatDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chats}
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
  chatItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
});

export default ChatList;