/*import {Text, ScrollView, SafeAreaView} from 'react-native';
import * as React from 'react';
import { Stack, useRouter } from 'expo-router';
import { COLORS, images } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { styles, zackStyles } from '../styles';

import ChatList from './ChatList';  // Chat list component
import NewChat from '../components/chat/newchat';  // New Chat component


export default function Chat() {
  const router = useRouter();
  return (
  <SafeAreaView style={zackStyles.mainBg}>
      <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerRight: () => (
          <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: () => (
          <Text style={{ color: COLORS.oliveGreen, fontSize: 20 }}>MINDCONNECT</Text>
          ),
          }}

      />
    <NewChat/>
    <ScrollView>
    <ChatList/>
    </ScrollView>
    </SafeAreaView>
  );
}*/

import { Text, SafeAreaView } from 'react-native';
import * as React from 'react';
import { Stack, useRouter } from 'expo-router';
import { COLORS, images } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { zackStyles } from '../styles';

import ChatMain from '../components/chat/ChatMain';

export default function Chat() {
    const router = useRouter();
    return (
    <SafeAreaView style={zackStyles.mainBg}>
        <Stack.Screen
        options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerRight: () => (
        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
        ),
        headerTitle: () => (
        <Text style={{ color: COLORS.oliveGreen, fontSize: 20 }}>MINDCONNECT</Text>
        ),
        }}
        />
        <ChatMain />
    </SafeAreaView>
    );
}
