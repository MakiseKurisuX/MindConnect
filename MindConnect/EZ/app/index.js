import React from 'react';
import { Image, Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import InfobankScreen from './infobank';
import Chat from './chat';
import Consult from './consult';
import StoryScreen from './story';
import Login from './login';
import Register from './register';
import Main from './main';
//import { Main } from 'next/document';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../assets/images/AppIcon.png')
              : require('../assets/images/AppIcon.png');
          } else if (route.name === 'InfoBank') {
            iconSource = focused
              ? require('../assets/images/Info_Bank.png')
              : require('../assets/images/Info_Bank.png');
          } else if (route.name === 'Chat') {
            iconSource = focused
              ? require('../assets/images/Chat.png')
              : require('../assets/images/Chat.png');
          } else if (route.name === 'Consult') {
            iconSource = focused
              ? require('../assets/images/Video_Consult.png')
              : require('../assets/images/Video_Consult.png');
          } else if (route.name === 'Story') {
            iconSource = focused
              ? require('../assets/images/Story.png')
              : require('../assets/images/Story.png');
          }

          return <Image source={iconSource} style={{ width: size, height: size }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="InfoBank" component={InfobankScreen} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Consult" component={Consult} />
      <Tab.Screen name="Story" component={StoryScreen} />
    </Tab.Navigator>
  );
}

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Main Screen</Text>
      <Button title="Go to Another Screen" onPress={() => navigation.navigate('AnotherScreen')} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen 
          name="AppTabs" 
          component={AppTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register"
          component={Register} 
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});