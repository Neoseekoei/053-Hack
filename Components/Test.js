
import React, { useState, useEffect } from 'react'; 
import { View, TextInput, TouchableOpacity,  
    Text, StyleSheet } from 'react-native'; 
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '../config/firebase';    
  
const Test= () => { 
  
    // State variables to store form inputs,  
    // errors, and form validity 
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
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
        <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={{ color: 'red' }}>{errors.name}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={{ color: 'red' }}>{errors.email}</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={{ color: 'red' }}>{errors.password}</Text> {/* Display password error message */}
        <TouchableOpacity
          style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
          disabled={!isFormValid}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    ); 
}; 
  
// Styles for the components 
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        padding: 16, 
        justifyContent: 'center', 
    }, 
    input: { 
        height: 60, 
        borderColor: '#ccc', 
        borderWidth: 1, 
         
        paddingHorizontal: 10, 
        borderRadius: 8, 
        fontSize: 16, 
        marginTop: 12,
    }, 
    button: { 
        backgroundColor: 'green', 
        borderRadius: 8, 
        paddingVertical: 10, 
        alignItems: 'center', 
        marginTop: 16, 
        marginBottom: 12, 
    }, 
    buttonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 16, 
    }, 
    error: { 
        color: 'red', 
        fontSize: 20, 
        marginBottom: 12, 
    }, 
}); 
  
export default Test;