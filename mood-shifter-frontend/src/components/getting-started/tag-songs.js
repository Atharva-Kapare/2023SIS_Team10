import React, { useEffect, useState } from 'react';
import './getting-started.css';
import SearchIcon from '../../assets/icons/search-icon.png'
import SongCoverIcon from '../../assets/icons/placeholder-song-cover.png'
import Authentication from '../../authentication'
import Song from './song'

let tagCount = localStorage.getItem('tagCount') || 0;
let songsAdded = 0;

function TagSongsScreen( { route, navigation } ) {
    const { selectedMood } = route.params;
    let moodPlaylistData = [];
    const [ searchTerm, setSearch ] = useState("");
    const [ searchResults, setSearchResults ] = useState([]);
    const [ addedSongs, setAddedSongs ] = useState([]);
    
    const addSong = (song) => {
        
        let exists = false;
        addedSongs.forEach(item => {
            if(song.uri === item.uri) {
                exists = true;
            }
        })

        if(!exists) {
            setAddedSongs([
                ...addedSongs,
                { 
                    cover: song.cover, 
                    title: song.title, 
                    uri: song.uri, 
                    artist: song.artist 
                }
            ])
            ++songsAdded;
        }

        console.log(addedSongs);
    
    }

    function removeSong(song) {

        let tempList = [];
        addedSongs.forEach(item => {
            if(item !== song) {
                tempList.push(item);
            }
        })
        --songsAdded;
        setAddedSongs(tempList);
        console.log(addedSongs);

    }

    useEffect(() => {
        if(!searchTerm) return setSearchResults([]);

        let cancel = false;

        if(cancel) return 
        Authentication.fetchWebApi(`v1/search?q=${searchTerm}&type=track&limit=10`, 'GET').then(res => {
            setSearchResults(res.tracks.items.map(song => {
                const smallestAlbumImage = song.album.images.reduce(
                    (smallest, image) => {
                        if(image.height < smallest.height) return image;
                        return smallest;
                    }, song.album.images[0]
                )
                return {
                    cover: smallestAlbumImage.url,
                    title: song.name,
                    uri: song.uri,
                    artist: song.artists[0].name
                }
            }));
        });

        return () => cancel = true;
    }, [searchTerm])

    return (
        <div className="login">
            <div className="header-div">
                <h4 className="text-style step-text">Step 2</h4>
                <h1 className="text-style">Tag 3 Songs</h1>
                <div className="iconic-banner">
                    <h1 className="text-style mood-text-style">{selectedMood}</h1>
                </div>
                <h3 className="text-style sub-text">Search for 3 or more songs that align with the mood '{selectedMood}'. The more songs you tag the better the results!</h3>
            </div>

            {/* Search Bar */}
            <div className='search-bar-div'>
                <img className="search-icon-style" src={SearchIcon} alt=""></img>
                <input className="search-bar-style" name="searchbar" id="searchbar" placeholder="search..." onKeyUp={(e) => setSearch(e.target.value)}></input>
            </div>
            {/* Search Bar */}
            
            {/* Song List */}
            <div className='song-div'>
                <div className="section-div">
                    <h3 className="section-header">Added</h3>
                    <h3 className="section-header">Selected: {songsAdded}</h3>
                </div>
            </div>

            {/* Added Song List */}
            <div className='song-div' style={{ overflowY: "scroll", minHeight: "200px"}}>
                <li>
                    {addedSongs.map(song => (
                        <div  style={{ cursor: "pointer"}} onClick={() => removeSong(song)}>
                            <Song 
                                track={song}
                                key={song.uri}
                            />
                        </div>
                    ))}
                </li>
            </div>
            {/* Added Song List */}

            <div className="song-div">
                <h3 className="section-header">Suggested</h3>
            </div>
            
            <div className='song-div' style={{ overflowY: "scroll"}}>
                <li>
                    {searchResults.map(song => (
                        <div  style={{ cursor: "pointer" }} onClick={() => addSong(song)}>
                            <Song 
                                track={song}
                                key={song.uri}
                            />
                        </div>
                    ))}
                </li>
            </div>
            {/* Song List */}

            <button className="sign-in-button-style" 
                onClick={() => {
                    if(songsAdded < 3) {
                        alert("Make sure you select at least 3 songs before continuing!");
                        return false;
                    }  else {
                        const selectFinish = checkTagged();
                        
                        sendUserSongDataToFirebase(selectedMood, addedSongs);

                        if(selectFinish) {
                            navigation.navigate('CongratulationsScreen')
                        } else {
                            
                            
                            navigation.navigate('SelectMoodScreen')
                        }
                    }
                }}
            >Continue</button>

        </div>
    );
}

async function sendUserSongDataToFirebase(selectedMood, addedSongs) {
    const method = 'POST';
    const params = new URLSearchParams();
    params.append(`${selectedMood}`, addedSongs);

    const playlistData = await fetch(`${process.env.BACKEND_URL}/login`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method,
        body:params
    });
    return await playlistData.json();
}

function checkTagged() {
    tagCount += 1;
    localStorage.setItem('tagCount', tagCount);
    if(tagCount >= 3) {
        return true;
    }
    return false;
}

export default TagSongsScreen;