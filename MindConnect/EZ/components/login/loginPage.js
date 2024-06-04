<<<<<<< Updated upstream
/*import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
=======
import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, Image } from 'react-native';
>>>>>>> Stashed changes
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; 
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Success", "Logged in successfully!");
        navigation.navigate('Home');
      })
      .catch((error) => {
        Alert.alert("Error", "Your email or password is incorrect. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../images/AppIcon.png')} 
        style={styles.logo}
      />
      <Card style={styles.card}>
        <Card.Content>
          <Title>Login</Title>
          <Paragraph>Please enter your credentials to login.</Paragraph>
          <TextInput
            label="Email"
            textColor='black'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            theme={{ colors: { primary: '#32CD32' } }} // Lime green underline
          />
          <TextInput
            label="Password"
            textColor='black'
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            theme={{ colors: { primary: '#32CD32' } }} // Lime green underline
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#E0F8E0', // Light lime green background
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#e3ffed',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#006b26', 
  }
});

export default LoginPage;*/

import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; 
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Success", "Logged in successfully!");
        navigation.navigate('Home');
      })
      .catch((error) => {
        Alert.alert("Error", "Your email or password is incorrect. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.text}>Login</Title>
          <Paragraph style={styles.text}>Please enter your credentials to login.</Paragraph>
          <TextInput
            label="Email"
            textColor='black'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            theme={{ colors: { primary: '#32CD32' } }} // Lime green underline
          />
          <TextInput
            label="Password"
            textColor='black'
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            theme={{ colors: { primary: '#32CD32' } }} // Lime green underline
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    padding: 16,
    backgroundColor: '#E0F8E0', // Light lime green background
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#e3ffed',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#006b26',
  },
  text: {
    color: "black",
  }
});

export default LoginPage;