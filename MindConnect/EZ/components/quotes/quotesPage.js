import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);

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

  const renderItem = ({ item, index, animationValue }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(animationValue.value, [-0.1, 0, 1], [0.95, 1, 1], Extrapolate.CLAMP);
      const translateX = interpolate(animationValue.value,  [-1, -0.2, 0, 1], [0, screenWidth * 0.1, 0, 0]);
      return {
        transform: [{ scale }, { translateX }, { perspective: 200 },
        {rotateY: `${interpolate(
        animationValue.value,
        [-1, 0, 0.4, 1],
        [30, 0, -25, -25],
        Extrapolate.CLAMP,
        )}deg`,}
      ],
      };
    });
  return (
    <Animated.View style={[styles.carouselItem, animatedStyle]}>
    <Image source={{ uri: item }} style={styles.image} onError={(e) => console.log(e.nativeEvent.error)} />
    </Animated.View>
  );
  };


return (
  <View>
    <View style={styles.container}>
      <Carousel
        loop
        width={screenWidth}
        height={screenHeight * 0.5}
        autoPlay={isAutoPlay}
        autoPlayInterval={3500}
        data={quotes}
        scrollAnimationDuration={3000}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={renderItem}
      />
      {pagination()}
    </View>
    <View style={{marginTop: 10, justifyContent:"center", flexDirection:"row"}}>
    <TouchableOpacity style={styles.button} onPress={() => {setIsAutoPlay(!isAutoPlay)}}>
    <Text style={{color:"white"}}>{`AUTOPLAY = ${isAutoPlay}`}</Text>
    </TouchableOpacity>
    </View>
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
  button: {
    backgroundColor:"green",
    borderRadius: 5,
    width: 150,
    height: 35,
    justifyContent:"center",
    paddingLeft:8,
  },
});

export default QuotesPage;