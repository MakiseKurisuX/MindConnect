import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute, useNavigation } from '@react-navigation/native';
import { COLORS, images } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { zackStyles } from '../styles';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js';

const ChatPage = () => {
    const route = useRoute();
    const { chatId, chatName } = route.params;

    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const messagesRef = collection(db, 'Chats', chatId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, snapshot => {
            setMessages(snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    _id: doc.id,
                    createdAt: data.createdAt.toDate(),
                    text: data.text,
                    user: data.user,
                    system: data.system || false, // handle system messages
                };
            }));
        });

        return unsubscribe;
    }, [chatId]);

    const handleSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(db, 'Chats', chatId, 'messages'), {
            _id,
            createdAt,
            text,
            user
        });
    }, [chatId]);

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
                renderSystemMessage={(props) => (
                    <View style={styles.systemMessageContainer}>
                        <Text style={styles.systemMessageText}>{props.currentMessage.text}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    systemMessageContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        alignSelf: 'center',
    },
    systemMessageText: {
        color: '#555',
        fontSize: 14,
    },
});

export default ChatPage;