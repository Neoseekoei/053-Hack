import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Signup from './Components/Signup'
import Edit from './Components/Edit';
import Home from './Components/Home'
import ForgotPassword from './Components/ForgotPassword';
import Test from './Components/Test';
import History from './Components/Chathistory';



const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>

    <Stack.Navigator initialRouteName='Login'  >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Reset" component={ForgotPassword} />
      <Stack.Screen name="edit" component={Edit} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="History" component={History} />      

    </Stack.Navigator>
  </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
