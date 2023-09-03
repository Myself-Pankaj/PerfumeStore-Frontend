import { View, Text, StyleSheet, TextInput, ImageBackground } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, verify } from '../Redux/Actions/UserAction';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


const Verify = () => {
  const [otp, setOtp] = useState('');

  const { error, message } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const otpInputs = useRef([]);

  const verifyHandler = async () => {
    await dispatch(verify(otp));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error,
      });
      dispatch({ type: 'clearError' });
    }
  }, [error, dispatch]);

  const focusNextInput = (index) => {
    if (otpInputs.current[index + 1]) {
      otpInputs.current[index + 1].focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (otpInputs.current[index - 1]) {
      otpInputs.current[index - 1].focus();
    }
  };

  const updateOtp = (value, index) => {
    const otpArray = otp.split('');
    otpArray[index] = value;
    setOtp(otpArray.join(''));
    if (value === '' && index > 0) {
      focusPreviousInput(index);
    } else {
      focusNextInput(index);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/1.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.spacing} />
        <View style={styles.boxContainer}>
          <Text style={styles.title}>Verification</Text>
          <View style={styles.otpContainer}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                maxLength={1}
                value={otp[index]}
                onChangeText={(value) => updateOtp(value, index)}
                keyboardType="number-pad"
                ref={(ref) => (otpInputs.current[index] = ref)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    updateOtp('', index);
                  }
                }}
              />
            ))}
          </View>
          <Button style={styles.btn} onPress={verifyHandler}>
            <Text style={styles.buttonText}>Verify</Text>
          </Button>
        </View>
        <View style={styles.spacing} />
      </View>
      <Toast/>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  spacing: {
    flex: 1,
  },
  boxContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  otpInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b5b5b5',
    padding: 10,
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 25,
    fontSize: 20,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#ff9800',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Verify;

