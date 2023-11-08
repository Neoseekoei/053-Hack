import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput, ImageBackground , TouchableOpacity} from "react-native";


const Edit = () => { 
    return (
      <View>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/user.png")}
      />

      

<View style={styles.container}>
      
      <Text style={styles.header}>Edit Profile</Text>
      <Text style={styles.save}>Save</Text>
      </View>
      <Image style={styles.logo} source={require("../assets/user.png")} />
  
      <View style={styles.user}>
        
          <Text style={styles.title}></Text>
          <View style={styles.inputContainer}>
          <Image source={require("../assets/user.png")} style={styles.icon} />
          <TextInput style={styles.input} placeholder="Username" />
        </View>
  
        <View style={styles.inputContainer}>
          <Image source={require("../assets/3.png")} style={styles.icon} />
          <TextInput style={styles.input} placeholder="Email" />
        </View>
  
        <View style={styles.inputContainer}>
          <Image source={require("../assets/2.png")} style={styles.icon} />
          <TextInput style={styles.input} placeholder="Mobile Number" />
        </View>
  
        <View style={styles.inputContainer}>
          <Image source={require("../assets/icons8-gender-64.png")} style={styles.icon} />
          <TextInput style={styles.input} placeholder="Gender" />
        </View>
  
        <View style={styles.inputContainer}>
          <Image source={require("../assets/icons8-birth-date-48.png")} style={styles.icon} />
          <TextInput style={styles.input} placeholder="Date of birth" />
        </View>
  
        <TouchableOpacity style={styles.submitbtn}>Submit</TouchableOpacity>
        
      </View>
    </View>
    );
  };
  const styles = StyleSheet.create({
    
    container: {
      width: 450,
      height: 250,
      backgroundColor: '#22719E',
      borderRadius: 15,
    },

   header: {
    fontSize: 20,
    marginLeft: 150,
    width: 116,
    height: 25,
    fontfamily: 'Inter',
    color: 'black'
   }, 

   save: {
    marginLeft: 300,
    fontSize: 20,
   },

  logo: {
    height: 150,
    width: 150,
    position: "absolute",
    zIndex: 1,
    top: 50,
    marginLeft:90
  },

  user: {
    height: 100,
    width: 300,
    backgroundColor: '',
    position: "absolute",
    zIndex: 1,
    marginTop: 300,
    marginLeft: 50,
    paddingBottom: 450,
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
    borderColor: '#ccc',
    paddingHorizontal: 7,
    marginVertical: 10,
    backgroundColor:'#ffff',
    width:250,
    height:40,
    marginLeft:24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    
    

    
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

  submitbtn:{
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

  
  });
  

export default Edit
