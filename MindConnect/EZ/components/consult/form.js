import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebaseConfig'; 
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

const Form = () => {
  const navigation = useNavigation();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [requestorName, setRequestorName] = useState('');

  useEffect(() => {
    const fetchRequestorName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'Users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setRequestorName(`${data.firstName} ${data.lastName}`);
          }
        }
      } catch (error) {
        console.error("Error fetching requestor name: ", error);
      }
    };

    fetchRequestorName();
  }, []);

  const handleSubmit = async () => {
    if (topic && description) {
      try {
        const user = auth.currentUser;

        const consultationDocRef = await addDoc(collection(db, 'Consultations'), {
          userId: user.uid,
          topic,
          description,
          accepted: false,
          createdAt: new Date(),
          requestor: requestorName,
          status: 'waiting'
        });

        const channelId = consultationDocRef.id;

        await updateDoc(doc(db, 'Consultations', channelId), {
          channelId
        });

        Alert.alert("Success", "Your consultation request has been submitted!");
        navigation.navigate('WaitPage', { consultationId: channelId, channelId });

      } catch (error) {
        console.error("Error adding document: ", error);
        Alert.alert("Error", "Failed to submit your request. Please try again.");
      }
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image 
          source={require('../../assets/images/AppIcon.png')} 
          style={styles.logo}
        />
        <Card style={styles.card}>
          <Card.Content>
            <Title>Need Help?</Title>
            <Paragraph>Please provide more details about your issue so our counselors can assist you further.</Paragraph>
            <TextInput
              label="Topic"
              value={topic}
              onChangeText={setTopic}
              style={styles.input}
            />
            <TextInput
              label="More details on the Topic"
              value={description}
              onChangeText={setDescription}
              style={styles.textArea}
              multiline
              numberOfLines={6}
            />
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              Submit
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

export default Form;