

export async function getLikedSongs(token) {
    let offset = 0

    let songsResp = await spotifyLikedSongs(token, offset);
    console.log("SongResp: ", songsResp);
    let songs = songsResp.items.map(item => {
        return item.track.id;
    })

    console.log(songs);

    for (let i = 0; i <= Math.floor((songsResp.total/50)); i++) {
        offset += 50;
        let tempSongs = await spotifyLikedSongs(token, offset);
        tempSongs.items.map(item => {
            songs.push(item.track.id);
        })
    }

    // console.log(songsResp);
    // console.log(songs.length);

    return songsResp;
}

async function spotifyLikedSongs(token, offset) {
    const res = await fetch("https://api.spotify.com/v1/me/tracks?" + new URLSearchParams({
        limit: 50,
        offset: offset
    }), {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      method: "GET"
    });
    let response = await res.json();
    return response;
}