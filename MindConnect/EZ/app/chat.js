import { Text, View, SafeAreaView, TextInput, Button, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import * as React from 'react';

import { COLORS, icons, images } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { styles, zackStyles } from '../styles';

// MessageList Component.
const MessageList = ({ messages }) => {
  const renderItem = ({ item }) => (
  //This denotes the style of each message.
  <View style={{
    alignSelf: 'flex-end',
    maxWidth: '60%',
    margin: 10,
    padding: 6,
    backgroundColor: COLORS.oliveGreen,
    borderRadius: 10
  }}>
  <Text style={{ color: COLORS.lightWhite }}>{item}</Text>
  </View>
  );

  //This part determines the UI of the area the messages appear.
  return (
    <FlatList
    data={messages}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()}
    style={{ flex: 1, backgroundColor: COLORS.lightWhite }}
    contentContainerStyle={{ padding: 10 }}
    />
  );
};

// InputSection Component. 3 params which are needed to change the states.
const InputSection = ({ inputMessage, setInputMessage, handleSend }) => {
  return (
    <View style={{ flexDirection: "row", padding: 10 }}>
      <TextInput
      style={{ flex: 1, height: 'auto' }}
      placeholder="Type a message"
      value={inputMessage}
      onChangeText={setInputMessage}
      />
      <Button
      title="Send"
      onPress={handleSend}
      />
    </View>
  );
};

// Main Page Component
export default function Page() {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = useCallback(() => {
    if (inputMessage.trim().length > 0) {
    setMessages(prevMessages => [...prevMessages, inputMessage]);
    setInputMessage('');
    }
  }, [inputMessage]);

  return (
    <SafeAreaView style={zackStyles.mainBg}>
      <Stack.Screen
      options={{
      headerStyle: { backgroundColor: COLORS.lightWhite },
      headerShadowVisible: false,
      headerLeft: () => (<ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />),
      headerRight: () => (<ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />),
      headerTitle: () => (<Text style={{ color: COLORS.oliveGreen, fontSize: 20 }}>MINDCONNECT</Text>),
      }}
      />

      <View style={{ alignItems: "center" }}>
        <Text style={styles.paginationText}>
        CHAT WITH PEER
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <MessageList messages={messages} />
        <InputSection
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSend={handleSend}
        />
      </View>
    </SafeAreaView>
  );
}