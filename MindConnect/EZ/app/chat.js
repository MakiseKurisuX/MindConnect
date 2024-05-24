import { Text, View, ScrollView, SafeAreaView, TextInput, Button, FlatList, Image } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { useState } from 'react';
import * as React from 'react';

import { COLORS, icons, images, SIZES } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { styles, zackStyles } from '../styles';


//const prisma = new PrismaClient({});

export default function Page() {
  const router = useRouter();

  //list for all messages
  const [messages, setMessages] = useState([]);
  //default string for each message
  const [inputMessage, setInputMessage] = useState('');

  //when there is an input msg, add to messages. Then set the input msg back to default empty string
  const handleSend = () => {
    if (inputMessage.trim().length > 0) {
      setMessages([...messages, inputMessage]);
      setInputMessage('');
    }
  };

  //This is for each msg
  const renderItem = ({ item }) => (
    //flex-end to make it only take up the necessary space and start from the end
    //maxWidth so that it look more like chat
    <View style={{
    alignSelf: 'flex-end',
    maxWidth: '60%',
    margin: 10,
    padding:6,
    backgroundColor: COLORS.oliveGreen,
    borderRadius: 10}}>
    <Text style={{color: COLORS.lightWhite}}>{item}</Text>
    </View>
  );

  //This is the whole chat part, containing the area where msgs appear and the text input and button
  const YourComponent = () => {
    return (
    <View style={{flex: 1}}>
     <View style = {{flexDirection: "column", flex: 1}}>
      <FlatList
      data = {messages}
      renderItem = {renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={{flex: 1, backgroundColor: COLORS.lightWhite}}
      contentContainerStyle={{ padding: 10 }}
      />
      <View style = {{flexDirection: "row", padding: 10}}>
        <TextInput
          style={{ flex: 1, height: 'auto', flexGrow: 1 }}
          placeholder="Type a message"
          value={inputMessage}
          onChangeText={text => setInputMessage(text)}
        />
        <Button
          title="Send"
          onPress={handleSend}
        // Add your Button props here
        />
      </View>
      </View>
    </View>
    );
  };



  return (
    <SafeAreaView style={zackStyles.mainBg}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: () => (
            <Text style={{ color: COLORS.oliveGreen, fontSize: 20 }}>MINDCONNECT</Text>
          ),
        }}
      />

        <View style = {{alignItems: "center"}}>
          <Text style={styles.paginationText}>
            CHAT WITH PEER
          </Text>
        </View>
      <YourComponent/>
    </SafeAreaView>
  );
}