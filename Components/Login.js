import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useForm } from "react-hook-form";

const Login = ({ navigation }) => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('') 
  const [errors, setErrors] = useState({}); 
  const [isFormValid, setIsFormValid] = useState(false); 

  useEffect(() => { 

      // Trigger form validation when name,  
      // email, or password changes 
      validateForm(); 
  }, [name, email, password]); 

  const validateForm = () => { 
      let errors = {}; 

      // Validate name field 

      // Validate email field 
      if (!email) { 
          errors.email = 'Email is required.'; 
      } else if (!/\S+@\S+\.\S+/.test(email)) { 
          errors.email = 'Email is invalid.'; 
      } 

      // Validate password field 
      if (!password) { 
          errors.password = 'Password is required.'; 
      } else if (password.length < 6) { 
          errors.password = 'Password must be at least 6 characters.'; 
      }


     // {errors.password && <span style={{color: 'red'}} className="error">{errors.password.message}</span>}
      // Set the errors and update form validity 
      setErrors(errors); 
      setIsFormValid(Object.keys(errors).length === 0); 
  }; 

  const handleSubmit = () => { 
      if (isFormValid) {
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              alert('Log in successfully');
              navigation.navigate("Home");
            })
            .catch((error) => {
              alert(error.message);
            });
        }
  }; 

  return (
    <View>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/background.png")}
      />
      <Image style={styles.logo} source={require("../assets/BotIcon.gif")} />
        <Text  style={styles.name}>MUNI-SOLve</Text>
      <View style={styles.signup}>
        <Text style={styles.title}>SIGN IN</Text>
        <View style={styles.inputContainer}>
          <Image source={require("../assets/3.png")} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
          />
        </View>
        <Text style={{ color: 'red', marginLeft:24,  }}>{errors.email}</Text>


       
        <View style={styles.inputContainer}>
          <Image source={require("../assets/MUNI.png")} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Text style={{ color: 'red', marginLeft:24,  }}>{errors.password}</Text>
         <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate("Reset")}><Text style={styles.forgotpassword}>ForgotPassword?</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.Loginbtn}>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.btn2}>SIGN UP</Text>
          
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    height: 855,
    width: 392,
  },

  name:{
   position:'absolute',
   zIndex:1,
   marginLeft:130,
   fontSize:25,
   marginTop:180,
   color:"#22719E",
   fontStyle:'Jacques Francois Shadow',
  },


  logo: {
    height: 200,
    width: 200,
    position: "absolute",
    zIndex: 1,
    top: 10,
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
    
  },

  forgot:{
   alignItems: 'flex-end',
   marginRight: 40,
    marginTop:10,
    fontWeight:700,
    color:'#22719E',
  },
  forgotpassword: {
    color: '#22719E',
    
  }
  

});
export default Login;
