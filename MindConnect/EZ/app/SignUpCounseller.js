import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; 
import emailjs from 'emailjs-com';

const SignUpCounsellor = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [whyCounsellor, setWhyCounsellor] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = getAuth().currentUser;
        if (user) {
          setEmail(user.email);
          const userDoc = await getDoc(doc(db, 'Users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFirstName(data.firstName);
            setLastName(data.lastName);
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleRegister = () => {
    const templateParams = {
      firstName,
      lastName,
      phoneNumber,
      email,
      age,
      whyCounsellor,
      linkedIn,
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image 
          source={require('../assets/images/AppIcon.png')} 
          style={styles.logo}
        />
        <Card style={styles.card}>
          <Card.Content>
            <Title>Register to be a Counsellor</Title>
            <Paragraph>Thank you for your interest in registering to be a counsellor! The role of our counsellors is to help run the 'Consult' feature, and to help vet our quotes system! Our counsellors need to be vetted, so please enter your age, phone number, LinkedIn profile, and reasons for wanting to be a peer.</Paragraph>
            <TextInput
              label="Age"
              value={age}
              onChangeText={setAge}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
              keyboardType="phone-pad"
            />
            <TextInput
              label="LinkedIn Profile"
              value={linkedIn}
              onChangeText={setLinkedIn}
              style={styles.input}
            />
            <TextInput
              label="Why do you want to be a counsellor?"
              value={whyCounsellor}
              onChangeText={setWhyCounsellor}
              style={styles.textArea}
              multiline
              numberOfLines={6}
            />
            <Button mode="contained" onPress={handleRegister} style={styles.button}>
              Register
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
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
    backgroundColor: '#E0F8E0', 
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#e3ffed', 
  },
  textArea: {
    marginBottom: 16,
    backgroundColor: '#e3ffed', 
    textAlignVertical: 'top', 
  },
  button: {
    marginTop: 16,
    backgroundColor: '#006b26', 
  },
});

export default SignUpCounsellor;