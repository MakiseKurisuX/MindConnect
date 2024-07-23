import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const ChatList = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const chatsRef = collection(db, 'Chats');
    const q = query(chatsRef, where('userId', 'array-contains', user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChats(chatData);
    });

    return () => unsubscribe();
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
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatDescription: {
    fontSize: 16,
    color: 'dimgray',
    marginTop: 4,
  },
});

export default ChatList;