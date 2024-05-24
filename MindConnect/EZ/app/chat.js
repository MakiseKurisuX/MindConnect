import { Text, View, ScrollView, SafeAreaView, TextInput, Button, Image } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { useState } from 'react';
import * as React from 'react';

import { COLORS, icons, images, SIZES } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { styles, zackStyles } from '../styles';


//const prisma = new PrismaClient({});

export default function Page() {
  const router = useRouter();

  const YourComponent = () => {
    return (
    <View style={{ flex: 1}}>
    {/* RecyclerView equivalent in React Native is FlatList */}
     <View style = {{flexDirection: "column"}}>
      <ScrollView style={{height:500, width:360, backgroundColor: COLORS.lightWhite}}>
        <Text style = {{padding: 10}}>
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
          Here is where messages will appear in chat.
        </Text>
      </ScrollView>
      <View style = {{flexDirection: "row"}}>
        <TextInput
          style={{ height: 'auto', width: 0, flexGrow: 1 }}
          placeholder="Type a message"
        />
        <Button
          title="Send"
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

      <ScrollView>
        <View style = {{alignItems: "center"}}>
          <Text style={styles.paginationText}>
            CHAT WITH PEER
          </Text>
        </View>
        <YourComponent/>
      </ScrollView>
    </SafeAreaView>
  );
}