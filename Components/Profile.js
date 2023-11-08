import React from "react";
import { StyleSheet, Text, View, Image, TextInput, ImageBackground , TouchableOpacity} from "react-native";


const Profile = ({navigation}) => {

  return (
    <View>
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/user.png")}
    />

<View style={styles.blue}>
<Text style={styles.hello}>Hello</Text>
<Text style={styles.ui}>Kabelo Gaotlhaelwe</Text>
<TouchableOpacity>
<View style={styles.pencil}>
        <Image  source={require("../assets/icons8-edit-24.png")} style={styles.icon} /></View>
</TouchableOpacity>
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

      <TouchableOpacity ><Text style={styles.submitbtn}>Submit</Text></TouchableOpacity>
      
    </View>
  </View>
  );
};

const styles = StyleSheet.create({

  hello: {
    marginLeft: 150,
    fontSize: 30,
    color: 'white',
    marginTop: 45
  },

  ui: {
    marginLeft:150,
    fontSize: 20,
    color: 'white',
    marginTop: 50
  },

blue: {
  width: 450,
      height: 250,
      backgroundColor: '#22719E',
},

pencil: {
  marginLeft: 350,
  width: 29,
  height: 29,
  borderRadius: 15,
  color: 'white',
  marginTop:-20
},

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
  top:{
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    backgroundColor: 'lightblue'
  },
  icon: {
    width: 100,
    height:100,
    borderRadius: 50,
  },

  
  logo: {
    height: 100,
    width: 100,
    position: "absolute",
    zIndex: 1,
    top: 50,
    marginLeft:45
  },

  user: {
    height: 100,
    width: 300,
    backgroundColor: '#CBD6DD',
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

export default Profile;
