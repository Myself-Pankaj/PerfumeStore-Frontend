import React, {  useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import mime from 'mime';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { register } from '../Redux/Actions/UserAction';

const Register = ({ navigation, route }) => {
  const { error, loading,message } = useSelector(state => state.auth);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleImage = () => {
    navigation.navigate('rcamera', {
      updateProfile: false,
    });
  };

  const registerHandler = async () => {
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('avatar', {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split('/').pop(),
    });
   
    try {
      await dispatch(register(myForm));
     // Navigating to the verification screen after a successful registration
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (route.params && route.params.image) {
      setAvatar(route.params.image);
    }
  }, [route]);



  return (
    <View style={styles.container}>
  
      <ImageBackground source={require('../assets/2.jpg')} style={styles.backgroundImage}>
        <View style={styles.card}>
          <Text style={styles.title}>REGISTRATION</Text>
          <View style={styles.avatarContainer}>
            <Avatar.Image size={100} source={{ uri: avatar ? avatar : null }} style={styles.avatar} />
            <TouchableOpacity onPress={handleImage}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
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
          </View>

          <Button
            disabled={!email || !password || !name}
            icon='account-plus'
            style={styles.registerbtn}
            onPress={registerHandler}
            loading={loading}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.loginText}>Have an Account? <Text style={styles.loginButtonText}>Login</Text></Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Toast/>

    </View>
  );
};



export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
 
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#900',
  },
  changePhotoText: {
    color: '#900',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  registerbtn: {
    backgroundColor: '#ff9800',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#900',
    height: 30,
    margin: 20,
  },
  loginButtonText:{
    color: '#2196f3',
  }
});
