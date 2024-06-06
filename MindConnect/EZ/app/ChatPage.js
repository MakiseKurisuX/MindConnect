import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute, useNavigation } from '@react-navigation/native';
import { COLORS, images } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { styles, zackStyles } from '../styles';

const ChatPage = () => {
    const route = useRoute();
    const { chatId, chatName } = route.params;

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Load initial messages or chat history if available
        // Example: fetchMessages(chatId).then(setMessages);
    }, [chatId]);

    const handleSend = useCallback((newMessages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        // You can also send messages to your backend or update the chat history
        // Example: sendMessage(newMessages);
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
            _id: 1,
            name: 'Chat 1', // You can replace this with dynamic user data
        }}
        />
        </SafeAreaView>
    );
};

export default ChatPage;