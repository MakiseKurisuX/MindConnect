import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const quotesSnapshot = await getDocs(collection(db, 'Quotes'));
        const quotesData = quotesSnapshot.docs.map(doc => doc.data().url);
        setQuotes(quotesData);
      } catch (error) {
        console.error("Error fetching quotes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#32CD32" />
      </View>
    );
  }

  const pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {quotes.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={screenWidth}
        height={screenHeight * 0.5}
        autoPlay={true}
        data={quotes}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={{ uri: item }} style={styles.image} onError={(e) => console.log(e.nativeEvent.error)} />
          </View>
        )}
      />
      {pagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    width: screenWidth,
    height: screenHeight * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#32CD32',
  },
  inactiveDot: {
    backgroundColor: '#C0C0C0',
  },
});

export default QuotesPage;