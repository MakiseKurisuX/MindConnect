import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Surface } from 'react-native-paper';

const Detail = ({ entry }) => {
  const descriptionLines = entry.description.split('\n');

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.author}>by {entry.author}</Text>
        {entry.img && <Image source={{ uri: entry.img }} style={styles.image} />}
        {/* Render each line of the description */}
        {descriptionLines.map((line, index) => (
          <Text key={index} style={styles.description}>
            {line}
          </Text>
        ))}
        <Text style={styles.content}>{entry.content}</Text>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  surface: {
    padding: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 18,
    color: 'gray',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 8, // Add margin to separate lines
  },
  content: {
    fontSize: 16,
  },
});

export default Detail;