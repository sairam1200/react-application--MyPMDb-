/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { authentication } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] =  useState('');
  const [password, setPassword] =  useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  function navigate(){
    console.log(authentication);
  }

  const RegisterUser = ()=>{
    createUserWithEmailAndPassword(authentication, email, password)
    .then((result)=>{
      console.log(result);
      setIsSignedIn(true);
    })
    .catch((result)=>{
      console.log(result);
    })
  }
  return (
    
    <View style={styles.container} behavior="padding">
       <View style={styles.titleContainer}>
         <Text style={styles.signUpText}>Sign up to</Text>
         <Text style={styles.myPMDbUpText}>My PMDb</Text>
       </View>
       <View style={styles.inputContainer}>
           <Text style={styles.headerText}>Email</Text>
         <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
         />
        <Text style={styles.headerText}>New Password</Text>
        <TextInput
          placeholder="Enter your New Password"
          value={ password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
         />
        <Text style={styles.headerText}>Confirm New Password</Text>
        <TextInput
          placeholder="Confirm New Password"
          value={ password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
         />


       </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={RegisterUser}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>      
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F4ECE8',
  },
  titleContainer: {
    alignItems: 'flex-start',
    width: '80%',
    marginTop: 60,
  },
  signUpText: {
    fontSize: 25,
    fontWeight: '900',
    fontFamily: 'Poppins',
    color: 'black',
    marginBottom: 30,
  },
  myPMDbUpText:{
    color: 'black',
    fontSize: 36,
    fontWeight: '900',
    fontFamily: 'Poppins',
    marginBottom: 50,
  },
  headerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
    marginTop: 30,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#6B3A2A',
    width: '100%',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

});
