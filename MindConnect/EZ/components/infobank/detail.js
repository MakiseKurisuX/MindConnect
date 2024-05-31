import React from 'react';
import { View, StyleSheet, Image, Linking } from 'react-native';
import { Text, Surface } from 'react-native-paper';

const Detail = ({ entry }) => {
  const descriptionLines = entry.description.split('\n');

  const renderContentIfNotEmpty = (content, key) => {
    if (content && content.trim().length > 1) {
      const isUrl = content.startsWith('http://') || content.startsWith('https://');
      if (isUrl) {
      return (
        <Text
        key={key}
        style={[styles.content, styles.link]}
        onPress={() => Linking.openURL(content)}
        >
        {content}
        </Text>
      );
      } else {
      return <Text key={key} style={styles.content}>{content}</Text>;
      }
    }
    return null;
    };

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
        {renderContentIfNotEmpty(entry.content, 'content')}
        {renderContentIfNotEmpty(entry.content1, 'content1')}
        {renderContentIfNotEmpty(entry.content2, 'content2')}
        {renderContentIfNotEmpty(entry.content3, 'content3')}
        {renderContentIfNotEmpty(entry.content4, 'content4')}
        {renderContentIfNotEmpty(entry.content5, 'content5')}
        {renderContentIfNotEmpty(entry.content6, 'content6')}
        {renderContentIfNotEmpty(entry.final, 'final')}
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
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 8, 
  },
  content: {
    fontSize: 16,
    paddingBottom: 8,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  }
});

export default Detail;