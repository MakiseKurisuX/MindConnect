import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InfobankScreen from './infobank';  // Ensure the correct path
import Chat from './chat';  // Ensure the correct path
import Consult from './consult';  // Ensure the correct path
import StoryScreen from './story';  // Ensure the correct path
import MainScreen from './main';  // Ensure the correct path

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource = focused
                ? require('../assets/images/AppIcon.png')        // focused
                : require('../assets/images/AppIcon.png');
            } else if (route.name === 'InfoBank') {
              iconSource = focused
                ? require('../assets/images/Info_Bank.png')    // focused
                : require('../assets/images/Info_Bank.png');
            } else if (route.name === 'Chat') {
              iconSource = focused
                ? require('../assets/images/Chat.png')       // focused
                : require('../assets/images/Chat.png');
            } else if (route.name === 'Consult') {
              iconSource = focused
                ? require('../assets/images/Video_Consult.png')       // focused
                : require('../assets/images/Video_Consult.png');
            } else if (route.name === 'Story') {
              iconSource = focused
                ? require('../assets/images/Story.png')       // focused
                : require('../assets/images/Story.png');
            }

            // You can return any component that you like here!
            return <Image source={iconSource} style={{ width: size, height: size }} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={MainScreen} />
        <Tab.Screen name="InfoBank" component={InfobankScreen} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Consult" component={Consult} />
        <Tab.Screen name="Story" component={StoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}