export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000");
    params.append("scope", "user-read-private user-read-email playlist-modify-private user-library-read app-remote-control streaming");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
  
export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000");
    params.append("code_verifier", verifier);

    let result;

    try {
        result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });
    } catch (e) {
        console.log(e);
    }

    const { access_token } = await result.json();
    console.log(access_token)
    return access_token;
}
  
async function fetchProfile() {

    return fetchWebApi("v1/me", "GET");
}

async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    method,
    body:JSON.stringify(body)
    });
    return await res.json();
}

async function createPlaylist(tracksUri) {
    const { id: user_id } = await fetchWebApi('v1/me', 'GET')
    const name = "Mood Shifter playlist"
    const description = "Playlist created by Mood Shifter"

    const playlist = await fetchWebApi(
        `v1/users/${user_id}/playlists`, 'POST', {
        "name": name,
        "description": description,
        "public": false
    })

    await fetchWebApi(
        `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
        'POST'
    );
    return playlist;
}

async function getLikedSongs() {
    return (await fetchWebApi('v1/me/tracks?limit=5', 'GET')).items;
}

async function getRecommendedSongs(trackIDs) {
    return (await fetchWebApi(`v1/recommendations?limit=5&seed_tracks=${trackIDs.join(',')}`, 'GET')).tracks;
}

async function getSong(trackID) {
    return (await fetchWebApi(`v1/tracks/${trackID}`, 'GET'));
}
  
async function getPlaylistData(profile) {
    const method = 'POST';
    const accessToken = localStorage.getItem("accessToken");

    const playlistData = await fetch(`http://localhost:8000/login`, {
        header: {
            "content-type": "application/json"
        },
        method,
        body: {
            "accessToken": accessToken,
            "UID": profile
        }
    }).then((res) => res.json());
    return await playlistData;
}

export default {
    redirectToAuthCodeFlow,  
    getAccessToken, 
    fetchProfile,
    createPlaylist,
    getLikedSongs,
    getRecommendedSongs,
    getSong,
    getPlaylistData, 
    fetchWebApi
};