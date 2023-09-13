import React from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';

const ProductFooter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
        <Text style={styles.text}>Genuine</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.imageContainer}>
        <Image source={require('../assets/original.png')} style={styles.image} />
        <Text style={styles.text}>Certified</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#f5f5f5',
      },
      imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      separator: {
        width: 1,
        height: '80%',
        backgroundColor: 'black',
      },
      image: {
        width: 100,
        height: 30,
        resizeMode: 'contain',
      },
      text: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
      },
});

export default ProductFooter;
