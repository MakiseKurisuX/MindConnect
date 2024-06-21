import React, { useState } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { View, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(true);
  const route = useRoute();
  const { channelId } = route.params;
  const navigation = useNavigation();

  const rtcCallbacks = {
    EndCall: () => {
      setVideoCall(false);
      navigation.goBack();
    },
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
    <View>
      {videoCall && (
        <AgoraUIKit
          connectionData={rtcProps.connectionData}
          rtcCallbacks={rtcCallbacks}
          videoEncoderConfig={rtcProps.videoEncoderConfig}
          style={styles.video}
        />
      )}
    </View>
  );
};

export default VideoCall;