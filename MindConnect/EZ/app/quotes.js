import React, { useEffect } from 'react';
import { Text, View, ScrollView, SafeAreaView, Alert, ImageBackground } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, images } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { styles, zackStyles } from '../styles';
import QuotesPage from '../components/quotes/quotesPage';
import * as Notifications from 'expo-notifications'; 

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    requestPermissions().then((hasPermission) => {
      if (hasPermission) {
        scheduleDailyNotification();
      } else {
        Alert.alert('Permission not granted for notifications!');
      }
    });
  }, []);

  const requestPermissions = async () => {
    const settings = await Notifications.requestPermissionsAsync();
    return settings.granted;
  };

  const scheduleDailyNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Good Morning",
        body: "Quotes have been refreshed! Check in again to see your daily quote.",
      },
      trigger: {
        hour: 8,
        minute: 0,
        repeats: true,
      },
    });
  };

  return (
  <SafeAreaView style={zackStyles.mainBg}>
  <ImageBackground
  source={require('../assets/images/bg.png')}
  style={{flex:1}}
  >


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
          <Text style={{color:"white", fontSize:24, textAlign:"center", fontWeight:'bold'}}>QUOTES OF THE DAY</Text>
          <QuotesPage />
        </View>
      </ScrollView>
</ImageBackground>
</SafeAreaView>
  );
}