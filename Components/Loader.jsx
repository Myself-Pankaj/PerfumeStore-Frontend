import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const Loader = () => {
    
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

   
    const fillAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animateFill();
    }, []);

    const animateFill = () => {
        Animated.loop(
            Animated.timing(fillAnimation, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false,
            })
        ).start();
    };

    const fillWidth = fillAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <View style={styles.box_2}>
                <Text style={styles.loaderText1}>LOADING ...</Text>
                <Animated.View style={[styles.fill, { width: fillWidth }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    box: {
        marginBottom: 10,
    },
    fill: {
        height: '100%',
        backgroundColor: '#fff',
    },
    box_2: {
        width: 200,
        height: 20,
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

export default Loader;
