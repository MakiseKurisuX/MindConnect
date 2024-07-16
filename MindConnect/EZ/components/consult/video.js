import React, { useState } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { View, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(true);
  const route = useRoute();
  const { channelId, consultationId } = route.params;
  const navigation = useNavigation();

  const rtcCallbacks = {
    EndCall: async () => {
      setVideoCall(false);
      await endCall();
      navigation.navigate('Consult');
    },
  };

  const endCall = async () => {
    try {
      const consultationDocRef = doc(db, 'Consultations', consultationId);
      await updateDoc(consultationDocRef, {
        endCall: new Date(), 
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const connectionData = {
    appId: 'e7785caf48a64492b8199d2f45903f87',
    channel: channelId,
  };

  const rtcProps = {
    connectionData,
    rtcCallbacks,
    videoEncoderConfig: {
      dimensions: { width: 720, height: 1280 },
      frameRate: 30,
      bitrate: 1,
      orientationMode: 'fixedPortrait',
    },
  };

  return (
    <View style={{flex:1}}>
      {videoCall && (
        <AgoraUIKit
          connectionData={rtcProps.connectionData}
          rtcCallbacks={rtcCallbacks}
          videoEncoderConfig={rtcProps.videoEncoderConfig}
        />
      )}
    </View>
  );
};

export default VideoCall;