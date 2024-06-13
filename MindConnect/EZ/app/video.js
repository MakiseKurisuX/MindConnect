import 'expo-dev-client';
import React, {useState} from 'react';
import AgoraUIKit, {PropsInterface} from 'agora-rn-uikit';

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

export default Video;