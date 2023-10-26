

export async function getLikedSongs(token) {
    let offset = 0

    let songsResp = await spotifyLikedSongs(token, offset);
    console.log("SongResp: ", songsResp);
    let songs = songsResp.items.map(item => {
        let song = {}
        song.id = item.track.id;
        song.name = item.track.name;
        song.artist = item.track.artists[0].name;
        song.uri = item.track.uri;
        song.image = item.track.album.images.pop();

        return song;
    })

    console.log(songs);

    for (let i = 0; i <= Math.floor((songsResp.total / 50)); i++) {
        offset += 50;
        let tempSongs = await spotifyLikedSongs(token, offset);
        tempSongs.items.map(item => {
            let song = {};
            song.id = item.track.id;
            song.name = item.track.name;
            song.artist = item.track.artists[0].name
            song.uri = item.track.uri;
            song.image = item.track.album.images.pop();

            songs.push(song);
        })
    }

    console.log(songs);
    console.log(songs.length);

    return songs;
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

async function getTrackData(token, songs){
    const res = await fetch("https://api.spotify.com/v1/tracks?" + new URLSearchParams({
        ids: songs.toString()
    }), {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        method: "GET"
    });
    let response = await res.json();

    // Need: ID, Name, Artist, URI, Image



    // return response;
}

async function getRecommendations(token, songs) {
    const res = await fetch("https://api.spotify.com/v1/recommendations?" + new URLSearchParams({
        seed_tracks: songs.toString(),
        limit: 50
    }), {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        method: "GET"
    });
    let response = await res.json();

    // Need: ID, Name, Artist, URI, Image



    // return response;
}