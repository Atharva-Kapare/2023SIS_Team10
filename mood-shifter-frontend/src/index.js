import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import Login from './components/login/login';
import GettingStarted from './components/getting-started/getting-started';
import Authentication from './authentication';
import Navbar from './components/navbar';
import {NavigationContainer} from '@react-navigation/native';
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const clientId = "8165af06e3a44a32ac86aa3d998761cd";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
var accessToken;

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ title: 'Overview' }}
    />
        <Stack.Screen name="GettingStarted" component={GettingStarted} />
      </Stack.Navigator>
    </NavigationContainer>
  </React.StrictMode>
);

function AuthCheck({ navigation }) {
  if (!code) {
      localStorage.clear();
      Authentication.redirectToAuthCodeFlow(clientId);
      } else {
      window.onload = async function runAuth() {
          accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
              accessToken = await Authentication.getAccessToken(clientId, code);
              localStorage.setItem("accessToken", accessToken);
          }
          const profile = await Authentication.fetchProfile(accessToken);
          const likedSongs = await Authentication.getLikedSongs(accessToken);
          console.log(profile);
          console.log(likedSongs);
          Authentication.populateUI(profile);
          navigation.navigate('GettingStarted')
        
      };
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default AuthCheck;