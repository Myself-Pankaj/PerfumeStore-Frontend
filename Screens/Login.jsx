import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import {  Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { login } from '../Redux/Actions/UserAction';





const Login = ({ navigation }) => {
  const { error, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error,
      });
      dispatch({ type: "clearError" });
    }
  }, [error, dispatch,alert]);

  const handleLogin = () => {
    // Handle login logic
    dispatch(login(email, password));
    
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/2.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.card}>
          <Text style={styles.title}>WELCOME BACK</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
         
          <Button
            style={styles.loginButton}
            disabled={!email || !password}
            icon="login"
            onPress={handleLogin}
            mode="contained"
            loading={loading} // Show loading indicator
          >
            Login
          </Button>

          <Text style={styles.orText}>Or</Text>

          <TouchableOpacity >
            
              
              <TouchableOpacity onPress={() => navigation.navigate('register')}>
              <Text style={styles.signupText}>Don't have an account <Text style={styles.signupButtonText}>Sign Up</Text></Text>
              </TouchableOpacity>
            
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('loader')}>
            <Text style={styles.forgetPasswordText}>Forget Password</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} />  */}
      <Toast/>
    </View>
  );
};

export default Login

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Set background color with opacity
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#ff9800',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  signupButtonText: {
    color: '#2196f3',
  },
  signupText: {
    color: '#900',
    height: 30,
    margin: 20,
  },
  forgetPasswordText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#f44336',
  },
});

