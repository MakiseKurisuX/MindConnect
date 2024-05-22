import { Text, View, ScrollView, SafeAreaView, Image } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { useState } from 'react';
import * as React from 'react';
import MentalHealth from '../components/infobank/mentalhealth';

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
          <MentalHealth />
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}