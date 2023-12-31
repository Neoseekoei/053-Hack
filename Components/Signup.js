
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
const Signup = ({navigation}) => {
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
      if (!name) { 
          errors.name = 'Name is required.'; 
      } 

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
      if (!number) { 
        errors.number = 'Number is required.'; 
    } else if (number.length < 10) { 
        errors.number = 'Number must be at least 10 characters.'; 
    }  

     // {errors.password && <span style={{color: 'red'}} className="error">{errors.password.message}</span>}
      // Set the errors and update form validity 
      setErrors(errors); 
      setIsFormValid(Object.keys(errors).length === 0); 
  }; 

  const handleSubmit = () => { 
      if (isFormValid) {
          createUserWithEmailAndPassword(auth, email, password)
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
        <View style={styles.signup}>
            <Text style={styles.title}>SIGN IN</Text>
            <View style={styles.inputContainer}>
            <Image source={require("../assets/user.png")} style={styles.icon} />
            <TextInput
            style={styles.input}
            placeholder="Username"
            value={name}
            onChangeText={setName}
             />
          </View>
          <Text style={{ color: 'red', marginLeft:24,  }}>{errors.name}</Text>

          <View style={styles.inputContainer}>
            <Image source={require("../assets/3.png")} style={styles.icon} />
            <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}/>
          </View>
          <Text style={{ color: 'red', marginLeft:24,  }}>{errors.email}</Text>

          <View style={styles.inputContainer}>
            <Image source={require("../assets/2.png")} style={styles.icon} />
            <TextInput 
            style={styles.input} 
            placeholder="Mobile Number"
            value={number}
            onChangeText={setNumber} />
          </View>
          <Text style={{ color: 'red', marginLeft:24,  }}>{errors.number}</Text>

          <View style={styles.inputContainer}>
            <Image source={require("../assets/MUNI.png")} style={styles.icon} />
            <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword} /> 
          </View>
          <Text style={{ color: 'red', marginLeft:24,  }}>{errors.password}</Text>
          <TouchableOpacity onPress={handleSubmit}> <Text style={styles.Loginbtn} >SIGN UP</Text> </TouchableOpacity>
          
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
    height: 480,
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
    marginBottom:30
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
    marginTop:10,
    backgroundColor:'#22719E',
    borderColor:'#22719E',
    color:'#ffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
});
export default Signup;
