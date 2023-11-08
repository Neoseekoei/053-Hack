import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';




const Login = ({navigation}) => {




    const [text, onChangeText] = React.useState('');

     // State variable to hold the password
	const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')

	// State variable to track password visibility
	const [showPassword, setShowPassword] = useState(false);

	// Function to toggle the password visibility state
	const toggleShowPassword = ({navigation}) => {
		setShowPassword(!showPassword);
	};

  const Create =(() =>{
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        alert("You Have Successfully Logged In!!!")
        navigation.navigate("Profile")
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    })

    return (
      <View>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/background.png")}
        />
        <Image style={styles.logo} source={require("../assets/BotIcon.gif")} />

        <View style={styles.signup}>
          
            <Text style={styles.title}>SIGN IN</Text>
            <View style={styles.inputContainer}>
            <Image source={require("../assets/3.png")} style={styles.icon} />
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail}/>
          </View>

          <View style={styles.inputContainer}>
            <Image source={require("../assets/MUNI.png")} style={styles.icon} />
            <TextInput 
            style={styles.input} 
            placeholder="Password"
            value={password}
            onChangeText={setPassword} />
          </View>

          
            <TouchableOpacity  onPress={Create}><Text style={styles.Loginbtn}>SIGN IN</Text></TouchableOpacity>
          
          <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate("Signup")}>SIGN UP</TouchableOpacity>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  backgroundImage: {
    height: 855,
    width: 392,
  },

  logo: {
    height: 200,
    width: 200,
    position: "absolute",
    zIndex: 1,
    top: 50,
    alignSelf: "center",
  },

  signup: {
    height: 100,
    width: 300,
    backgroundColor: "#F0F1F1",
    position: "absolute",
    zIndex: 1,
    marginTop: 300,
    marginLeft: 50,
    paddingBottom: 450,
  },

  title: {
    color: "#22719E",
    textAlign: "center",
    marginTop: 20,
    fontSize: 28,
    fontWeight: 700,
    marginBottom:60
  },

  //   user:{
  //     alignSelf:'center',
  //     marginTop:50,
  //     borderWidth:1,
  //     height:70,
  //     backgroundColor:'#ffff',
  //     padding:7,
  //     paddingLeft:80,
  //     borderColor:'#ffff'

  //   }

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 7,
    marginVertical: 10,
    backgroundColor:'#ffff',
    width:250,
    height:40,
    marginLeft:24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,

    
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain', // Adjust the image content mode as needed
  },
  input: {
    flex: 1,
    height: 40,
    borderColor:'#ffff'
    // Other input styles
  },

  Loginbtn:{
    borderWidth:1,
    width:250,
    height:40,
    textAlign:'center',
    paddingTop:9,
    alignSelf:'center',
    marginTop:40,
    backgroundColor:'#22719E',
    borderColor:'#22719E',
    color:'#ffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },

  btn2:{
    textAlign:'center',
    marginTop:10,
    color:'#22719E',
    fontWeight:700,
    
  }
});

export default Login;
