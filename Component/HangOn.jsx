import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const HangOn = () => {
    const rotation = new Animated.Value(0);

    useEffect(() => {
        animateRotation();
    }, []);

    const animateRotation = () => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    
  return (
    <View style={styles.container}>
            {/* First Loader */}
            <View style={styles.box}>
                <Animated.View style={[styles.circle, { transform: [{ rotate: spin }] }]} />
                <Text style={styles.loaderText}>HANG ON ...</Text>
            </View>
       </View>
  )
}

export default HangOn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    box: {
        // width: 90,
        // height: 90,
        // backgroundColor: 'white',
        // borderRadius: 8,
        // justifyContent: 'center',
        // alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.4,
        // shadowRadius: 4,
        // elevation: 8,
        marginBottom: 10,
    },
    fill: {
        height: '100%',
        backgroundColor: '#fff',
    },
    box_2: {
        width: 200,
        height: 20,
        // backgroundColor: 'black',
        borderRadius: 2,
        overflow: 'hidden',
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderWidth: 6,
        borderColor: 'black',
        borderStyle: 'dotted',
    },
    fill: {
        height: '100%',
        backgroundColor: 'black',
    },
    loaderText: {
        color: 'black',
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: 10,
        marginTop: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    loaderText1: {
        color: 'black',
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: 15,
        textAlign:'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

});