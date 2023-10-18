import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import Login from './components/login/login';
import GettingStartedScreen from './components/getting-started/getting-started';
import SelectMoodScreen from './components/getting-started/select-mood';
import TagSongsScreen from './components/getting-started/tag-songs';
import CongratulationsScreen from './components/getting-started/congratulations';
import Authentication from './authentication';
import Navbar from './components/navbar';
import MyPlaylist from './pages/my-playlists';
import {NavigationContainer} from '@react-navigation/native';
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import songPlayerScreen from './components/song-player/song-player';
import GetTrackScreen from './pages/gettrackscreen.js';

const clientId = "8165af06e3a44a32ac86aa3d998761cd";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
var accessToken;

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
        <Stack.Screen name="GettingStartedScreen" component={GettingStartedScreen} />
        <Stack.Screen name="SelectMoodScreen" component={SelectMoodScreen} />
        <Stack.Screen name="TagSongsScreen" component={TagSongsScreen} />
        <Stack.Screen name="CongratulationsScreen" component={CongratulationsScreen} />
        <Stack.Screen name="MyPlaylist" component={MyPlaylist} />
        {/* <Stack.Screen name="GetTrackScreen" component={GetTrackScreen} /> */}
        <Stack.Screen name="PlaylistScreen" component={songPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </React.StrictMode>
);

async function AuthCheck() {
  if (!code) {
    localStorage.clear();
    Authentication.redirectToAuthCodeFlow(clientId);
  } else {
    async function runAuth() {
      accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
          accessToken = await Authentication.getAccessToken(clientId, code);
          localStorage.setItem("accessToken", accessToken);
      }
      const profile = await Authentication.fetchProfile(accessToken);
      Authentication.populateUI(profile);
    };
    runAuth();
  }

  if(!code) {
    return false;
  } else {
    return true;
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default AuthCheck;