import React, { useEffect, useState } from 'react';
import './getting-started.css';
import SearchIcon from '../../assets/icons/search-icon.png'
import SongCoverIcon from '../../assets/icons/placeholder-song-cover.png'
import Authentication from '../../authentication'
import Song from './song'

let tagCount = localStorage.getItem('tagCount') || 0;
let songList = [];

function TagSongsScreen( { route, navigation } ) {
    const { selectedMood } = route.params;
    const [ searchTerm, setSearch ] = useState("");
    const [ searchResults, setSearchResults ] = useState([]);
    console.log(searchResults);

    useEffect(() => {
        if(!searchTerm) return setSearchResults([]);

        let cancel = false;

        if(cancel) return 
        Authentication.fetchWebApi(`v1/search?q=${searchTerm}&type=track&limit=10`, 'GET').then(res => {
            console.log(res)
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
                <h3 className="text-style sub-text">Search for 3 songs that align with the mood '{selectedMood}'.</h3>
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
                    <h3 className="section-header">0/3</h3>
                </div>
            </div>
            <div className="song-div">
                <h3 className="section-header">Suggested</h3>
            </div>
            
            <div className='song-div'>
                <li>
                    {searchResults.map(song => {
                        <Song 
                            songCoverIcon={song.cover}
                            songTitle={song.title}
                            songArtist={song.artist}
                        />
                    })}
                </li>
            </div>
            {/* Song List */}

            <button className="sign-in-button-style" 
                onClick={() => {
                    const selectFinish = checkTagged();
                    if(selectFinish) {
                        navigation.navigate('CongratulationsScreen')
                    } else {
                        navigation.navigate('SelectMoodScreen')
                    }
                }}
            >Continue</button>

        </div>
    );
}

function checkTagged() {
    tagCount += 1;
    localStorage.setItem('tagCount', tagCount);
    if(tagCount >= 3) {
        return true;
    }
    return false;
}

function selectSong() {
    console.log("Hit");
}

export default TagSongsScreen;