import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login';
import GettingStartedScreen from './components/getting-started/getting-started';
import SelectMoodScreen from './components/getting-started/select-mood';
import TagSongsScreen from './components/getting-started/tag-songs';
import CongratulationsScreen from './components/getting-started/congratulations';
import Authentication from './authentication';
import MyPlaylist from './pages/my-playlists';
import {NavigationContainer} from '@react-navigation/native';
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import songPlayerScreen from './components/song-player/song-player';
import GetTrackScreen from './pages/gettrackscreen.js';
import SettingsScreen from './pages/settings';
import Footer from './components/footer';
import NewPlaylist from './pages/new-playlist';
import SongListScreen from './pages/song-list';

const clientId = "8165af06e3a44a32ac86aa3d998761cd";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
var accessToken;

const Stack = createNativeStackNavigator();

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="PlaylistScreen">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Overview' }}
      />
        {/* Getting Started Pages */}
        <Stack.Screen name="GettingStartedScreen" component={GettingStartedScreen} />
        <Stack.Screen name="SelectMoodScreen" component={SelectMoodScreen} />
        <Stack.Screen name="TagSongsScreen" component={TagSongsScreen} />
        <Stack.Screen name="CongratulationsScreen" component={CongratulationsScreen} />
        {/* Getting Started Pages */}

        {/* Playlist Screen - where all playlists the user has are shown (mood and mood-shifter) */}
        <Stack.Screen name="PlaylistScreen" component={MyPlaylist} />

        {/* Song Player where individual songs are pulled and played */}
        <Stack.Screen name="SongPlayerScreen" component={songPlayerScreen} />

        {/* Settings Page */}
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />

        {/* Screen to create a new playlist and add to firebase */}
        <Stack.Screen name="NewPlaylistScreen" component={NewPlaylist} />

        {/* Footer component */}
        <Stack.Screen name="Footer" component={Footer} />

        {/* Display all songs in a playlist screen */}
        <Stack.Screen name="SongListScreen" component={SongListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </React.StrictMode>
);

async function AuthCheck({navigation}) {
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

      localStorage.setItem("UID", profile.id);
      await Authentication.getPlaylistData(profile.id)
            
    };
    runAuth();
    navigation.navigate("GettingStartedScreen");
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