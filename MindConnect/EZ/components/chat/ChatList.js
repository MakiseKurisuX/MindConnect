import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchChats } from '../../app/ChatData';
//https://i.seadn.io/gae/gctNTZKmTRG5z7A56d1GOfh4pxaM_b-XtVrmFN4FE6269fZoIOhc5dtr4YVHaOGRiXkRBVTta91iuz344f6YpjCTda7sfOWC5qlp?auto=format&dpr=1&w=3840

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
    <TouchableOpacity onPress={() => navigation.navigate('ChatPage', { chatId: item.id, chatName: item.name })}>
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
    <Text style={{ fontSize: 18 }}>{item.name}</Text>
    </View>
    </TouchableOpacity>
    );

    return (

            <FlatList
            data={chats}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />

        );
};

export default ChatList;