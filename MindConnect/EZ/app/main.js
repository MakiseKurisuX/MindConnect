import React from 'react';
import { Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { COLORS, icons, images } from '../constants';
import { ScreenHeaderBtn } from '../components';
import { styles, zackStyles } from '../styles';
import Surf from '../components/main/surf';

export default function Page() {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[zackStyles.mainBg, enhancedStyles.safeArea]}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: () => (
            <Text style={enhancedStyles.headerTitle}>MINDCONNECT</Text>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={enhancedStyles.scrollView}>
        <Text>{"\n"}</Text>
        <Surf style={enhancedStyles.surf}/>
        <Text>{"\n"}</Text>
        <View style={enhancedStyles.container}>
          <Text style={enhancedStyles.introText}>
            Welcome! Introducing MindConnect or MC, an application that gives people struggling with mental-health related issues a platform at their fingertips to reach out to someone to talk with and seek help and guidance.
          </Text>
          <Text style={enhancedStyles.featuresText}>
            MindConnect boasts 4 prominent features:
          </Text>
          <View style={enhancedStyles.featuresList}>
            <Text style={enhancedStyles.featureItem}>1. An information bank</Text>
            <Text style={enhancedStyles.featureItem}>2. A place to chat with peers</Text>
            <Text style={enhancedStyles.featureItem}>3. A story tab</Text>
            <Text style={enhancedStyles.featureItem}>4. Video consults with certified counsellors</Text>
          </View>
          <Text style={enhancedStyles.additionalFeaturesText}>
            Furthermore, there are two more supporting features, the ability to sign up as a counsellor or peer and voice consultations with counsellors.
          </Text>
        </View>
        <Image 
          source={{ uri: "https://img.freepik.com/premium-photo/beautiful-nature-images-nature-wallpaper-landscapes-nature-pictures_859052-430.jpg" }}
          style={enhancedStyles.image}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const enhancedStyles = {
  surf: {
    marginBottom: 20,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  container: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    color: COLORS.oliveGreen,
    fontSize: 20,
    fontWeight: 'bold',
  },
  introText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  featuresText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  additionalFeaturesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  image: {
    height: 300,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
};