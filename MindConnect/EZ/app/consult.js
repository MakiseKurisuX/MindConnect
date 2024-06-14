import { Text, View, ScrollView, SafeAreaView, Image } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { useState } from 'react';
import * as React from 'react';
import { COLORS, icons, images, SIZES } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { styles, zackStyles } from '../styles';
import 'expo-dev-client';
import AgoraUIKit, {PropsInterface} from 'agora-rn-uikit';

//const prisma = new PrismaClient({});

export default function Page() {
  const router = useRouter();

  const Video = () => {
    const [videoCall, setVideoCall] = useState(true);
    const props: AgoraUIKitProps = {
      connectionData: {
        appId: 'e7785caf48a64492b8199d2f45903f87',
        channel: 'test',
      },
      rtcCallbacks: {
        EndCall: () => setVideoCall(false),
      },
    };

    return videoCall ? (
    <AgoraUIKit connectionData={props.connectionData} rtcCallbacks={props.rtcCallbacks} />
    ) : null;
  };

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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollView}>
          <Text style={styles.paginationText}>
            THIS IS THE CONSULT PAGE
          </Text>
        </View>
      </ScrollView>
      <Video/>
    </SafeAreaView>
  );
}