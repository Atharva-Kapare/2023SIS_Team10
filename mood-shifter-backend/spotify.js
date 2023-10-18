

export async function getLikedSongs(token) {
    const res = await fetch("https://api.spotify.com/v1/me/tracks", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      method: "GET"
    });
    return await res.json();
}