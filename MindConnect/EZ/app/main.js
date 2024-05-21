import { Text, View, ScrollView, SafeAreaView, Image } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { useState } from 'react';
import * as React from 'react';

import { COLORS, icons, images, SIZES } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { styles, zackStyles } from '../styles';


//const prisma = new PrismaClient({});

export default function Page() {
  const router = useRouter();

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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollView}>
          <Text style={styles.paginationText}>
            Welcome! Introducing MindConnect or MC, an application that gives people struggling
            with mental-health related issues a platform at their fingertips to reach out to someone
            to talk with and seek help and guidance.
          </Text>
          <Text style={styles.paginationText}>
            {"\n"}
            MindConnect boasts 4 prominent features, namely an information bank, a place to chat with peers,
            a story tab and video consults with certified counsellors. Furthermore, there are two more supporting
            features, the ability to sign up as a counsellor or peer and voice consultations with counsellors.
          </Text>
        </View>
        <Image 
          source={{ uri: "https://img.freepik.com/premium-photo/beautiful-nature-images-nature-wallpaper-landscapes-nature-pictures_859052-430.jpg" }}
          style={{ height: 300, width: 400 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}