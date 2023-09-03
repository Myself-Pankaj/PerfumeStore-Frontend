import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
const { width: windowWidth } = Dimensions.get('window');
// const Carousel = ({ images }) => {
//   const renderItem = ({ item }) => (
//     <View style={styles.imageContainer}>
//     <Image source={{ uri: item.url }} style={styles.image} key={item._id} />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={images}
        //   renderItem={renderItem}
        //   keyExtractor={(item) => item._id}
        //   horizontal
        //   pagingEnabled
        //   showsHorizontalScrollIndicator={false}
        //   snapToAlignment="center"
        //   decelerationRate="fast"
        //   snapToInterval={windowWidth}
//         contentContainerStyle={styles.contentContainer} 
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 200,
//   },
//   imageContainer: {
//     flex: 1,
//     alignSelf: 'stretch',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: Dimensions.get('screen').width,
//     height: 200,
//     resizeMode: 'contain',
//   },
  
// });


 


const Carousel = ({ images }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const Pagination = () => (
        <View style={styles.pagination} pointerEvents="none">
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex ? styles.paginationDotActive : styles.paginationDotInactive,
              ]}
            />
          ))}
        </View>
      );
      const scrollToIndex = (index) => {
        setCurrentIndex(index);
        flatListRef.current.scrollToIndex({ index, animated: true });
      };

    const renderItem = ({ item }) => (
      <View style={styles.slide}>
        <Image source={{ uri: item.url }} style={styles.image} key={item._id} />
      </View>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={windowWidth}
          onMomentumScrollEnd={(event) => {
            const { contentOffset } = event.nativeEvent;
            const index = Math.round(contentOffset.x / windowWidth);
            setCurrentIndex(index);
          }}
        />
        <Pagination />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      height: 500,
    },
    slide: {
      width: windowWidth,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '70%',
      resizeMode: 'cover',
    },
    pagination: {
        position: 'absolute',
        bottom: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 1,
        backgroundColor: 'lightblue',
      },
      paginationDotActive: {
        backgroundColor: '#f1c232',
      },
  });
  

export default Carousel;