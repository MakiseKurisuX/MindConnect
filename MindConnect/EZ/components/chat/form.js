import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Form = () => {
  const navigation = useNavigation();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (topic && description) {
      // Handle the submission logic here, if any
      Alert.alert("Success", "Your issue has been submitted!");
      navigation.navigate('ChatPage');
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
            <Title>Are you okay?</Title>
            <Paragraph>Please speak more about the issue so our peers can assist you further.</Paragraph>
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
    backgroundColor: '#E0F8E0', // Light lime green background
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#e3ffed', // Light green background for input
  },
  textArea: {
    marginBottom: 16,
    backgroundColor: '#e3ffed', // Light green background for input
    textAlignVertical: 'top', // Align text at the top of the TextInput
  },
  button: {
    marginTop: 16,
    backgroundColor: '#006b26', // Dark green button
  },
});

export default Form;