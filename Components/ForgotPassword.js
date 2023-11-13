import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, Image,TextInput,TouchableOpacity } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";


const ForgotPassword = ({navigation}) =>{

 
  const [email, setEmail] = useState(''); 
 

  const [errors, setErrors] = useState({}); 
  const [isFormValid, setIsFormValid] = useState(false); 

  useEffect(() => { 

    // Trigger form validation when name,  
    // email, or password changes 
    validateForm(); 
}, [email]); 

const validateForm = () => { 
    let errors = {}; 

    // Validate name field 


    // Validate email field 
    if (!email) { 
        errors.email = 'Email is required.'; 
    } else if (!/\S+@\S+\.\S+/.test(email)) { 
        errors.email = 'Email is invalid.'; 
    } 

 


   // {errors.password && <span style={{color: 'red'}} className="error">{errors.password.message}</span>}
    // Set the errors and update form validity 
    setErrors(errors); 
    setIsFormValid(Object.keys(errors).length === 0); 
}; 

const handleSubmit = () => { 
    if (isFormValid) {
      sendPasswordResetEmail(auth, email)
          .then(() => {
            alert('check your email');
            navigation.navigate("Login");
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
          source={require("../assets/UntitledDesign(1).png")}
        />
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.arrow}
              source={require("../assets/icons8-back-50.png")}
            />
            <Text style={styles.name}>MUNI-SOLve</Text>
          </View>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.paragraph}>
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password
          </Text>

          <View style={styles.inputContainer}>
            <Image source={require("../assets/3.png")} style={styles.icon} />
            <TextInput style={styles.input} placeholder="Email"
            value={email}
            onChangeText={setEmail} />
          </View>
          <Text style={{ color: 'red', marginLeft:60,  }}>{errors.email}</Text>
            
          <TouchableOpacity  onPress={handleSubmit}><Text  style={styles.Reset} ><Text>Rest Password</Text></Text> </TouchableOpacity>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  backgroundImage: {
    height: 855,
    width: 392,
  },

  container: {
    position: "absolute",
    zIndex: 1,
    
  },

  arrow: {
    width: 40,
    height: 40,
    marginRight: 190,
    marginTop:8
  },

  name: {
    fontSize: 24,
    fontWeight: 500,
    color: "#ffff",
    marginTop:10
  },

  title: {
    marginTop: 150,
    fontWeight: 700,
    fontSize: 30,
    marginLeft: 20,
  },

  paragraph: {
    width: 200,
    fontWeight: 500,
    color: "gray",
    marginLeft: 20,
    marginTop: 10,
  },

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
    marginLeft:60,
    marginTop:60
    
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain', 
  },
  input: {
    flex: 1,
    height: 40,
    borderColor:'#ffff',
    color:'gray'
  },

  Reset:{
    borderWidth:1,
    width:250,
    height:50,
    textAlign:'center',
    paddingTop:15,
    alignSelf:'center',
    marginTop:100,
    backgroundColor:'#22719E',
    borderColor:'#22719E',
    color:'#ffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    borderRadius:25,
  },
});


export default ForgotPassword;