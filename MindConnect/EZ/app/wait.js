import React from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, images } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { styles, zackStyles } from '../styles';
import WaitPage from '../components/consult/wait';

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
          headerLeft: () => null,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollView}>
          <WaitPage />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
