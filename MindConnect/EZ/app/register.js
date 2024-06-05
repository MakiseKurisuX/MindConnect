import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import emailjs from 'emailjs-com';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleRegister = () => {
    const templateParams = {
      firstName,
      lastName,
      phoneNumber,
      email,
      age,
    };

    emailjs.send('service_dm5skog', 'template_8m7o0mg', templateParams, 'pTYwjX4ZDqcpHSaqK')
      .then((response) => {
        Alert.alert("Success", "Registration has been sent! Please wait up to 3 working days and check your email to see if you have been accepted or not!");
      })
      .catch((error) => {
        console.error("EmailJS Error:", error); // Log error to console
        Alert.alert("Error", error.text || "Failed to send registration details. Please try again."); // Display error message in alert
      });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/AppIcon.png')} 
        style={styles.logo}
      />
      <Card style={styles.card}>
        <Card.Content>
          <Title>Register to be a Counsellor</Title>
          <Paragraph>Please enter your details to register to be a counsellor.</Paragraph>
          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
            keyboardType="phone-pad"
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Age"
            value={age}
            onChangeText={setAge}
            style={styles.input}
            keyboardType="numeric"
          />
          <Button mode="contained" onPress={handleRegister} style={styles.button}>
            Register
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
    backgroundColor: '#e3ffed', // Light green background for input
  },
  button: {
    marginTop: 16,
    backgroundColor: '#006b26', // Dark green button
  },
});

export default Register;