import { Text, View, SafeAreaView, Image } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { useState } from 'react';
import * as React from 'react';
import { COLORS, icons, images, SIZES } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { zackStyles } from '../styles';
import 'expo-dev-client';
import AgoraUIKit, {PropsInterface} from 'agora-rn-uikit';
import ConsultMain from '../components/consult/consultMain';

//const prisma = new PrismaClient({});

export default function Page() {
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
        <View style={{flex: 1, padding:10}}>
          <ConsultMain />
        </View>
    </SafeAreaView>
  );
}