export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000");
    params.append("scope", "user-read-private user-read-email");
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
    
    return access_token;
}
  
async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}
  
function populateUI(profile) {
    if(document.getElementById("displayName") != null) {
        document.getElementById("displayName").innerHTML = profile.display_name;
    }
    if(profile.images != null) {
        if (profile.images[0]) {
            const profileImage = new Image(200, 200);
            profileImage.src = profile.images[0].url;
            if(document.getElementById("avatar") != null) {
                document.getElementById("avatar").appendChild(profileImage);
            }
            if(document.getElementById("imgUrl") != null) {
                document.getElementById("imgUrl").innerText = profile.images[0].url;
            }
        }
    }
    document.addEventListener("id", function(event){
        document.getElementById("id").innerText = profile.id;
    });
    
    document.addEventListener("email", function(event) {
        document.getElementById("email").innerText = profile.email;
    });
    
    document.addEventListener("uri", function(event) {
        document.getElementById("uri").innerText = profile.uri;
        if(profile.external_urls.spotify !== undefined) {
            document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
        }
        document.getElementById("url").innerText = profile.href;
        document.getElementById("url").setAttribute("href", profile.href);
    });
}
  

export default {
    redirectToAuthCodeFlow,  
    getAccessToken, 
    fetchProfile, 
    populateUI, 
};