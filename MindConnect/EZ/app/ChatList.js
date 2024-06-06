import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatList = () => {
    const navigation = useNavigation();
//https://i.seadn.io/gae/gctNTZKmTRG5z7A56d1GOfh4pxaM_b-XtVrmFN4FE6269fZoIOhc5dtr4YVHaOGRiXkRBVTta91iuz344f6YpjCTda7sfOWC5qlp?auto=format&dpr=1&w=3840
    const chats = [
        { id: '1', name: 'Chat 1' },
        { id: '2', name: 'Chat 2' },
        { id: '3', name: 'Chat 3' },
        { id: '4', name: 'Chat 4' },
        { id: '5', name: 'Chat 5' },
        { id: '6', name: 'Chat 6' },
        { id: '7', name: 'Chat 7' },
        { id: '8', name: 'Chat 8' },
        { id: '9', name: 'Chat 9' },
    ];

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