import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute, useNavigation } from '@react-navigation/native';
import { COLORS, images } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { styles, zackStyles } from '../styles';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js';


const ChatPage = () => {
    const route = useRoute();
    const { chatId, chatName } = route.params;

    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const collectionRef = collection(db, 'Chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, snapshot => {
            setMessages(snapshot.docs.map(doc => ({
                _id: doc.id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
            })))
        });
        return unsubscribe;
    }, []);

    const handleSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const{ _id, createdAt, text, user } = messages[0];
        addDoc(collection(db, 'Chats'), {
            _id,
            createdAt,
            text,
            user
            });
    }, []);

    return (
        <SafeAreaView style={zackStyles.mainBg}>
        <Stack.Screen
        options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerRight: () => (<ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />),
        headerTitle: () => (<Text style={{ color: COLORS.oliveGreen, fontSize: 20 }}>{chatName}</Text>),
        }}
        />

        <GiftedChat
        messages={messages}
        onSend={(messages) => handleSend(messages)}
        user={{
            _id: auth?.currentUser?.email,
        }}
        />
        </SafeAreaView>
    );
};

export default ChatPage;