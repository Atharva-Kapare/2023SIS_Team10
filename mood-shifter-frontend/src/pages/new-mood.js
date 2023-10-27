import React, { useEffect, useState } from "react";
import './css/new-mood.css'
import SearchIcon from '../assets/icons/search-icon.png'
import authentication from '../authentication'

function NewMoodScreen() {

    let songsAdded = 0;
    const [ searchResults, setSearchResults ] = useState([]);
    const [ searchTerm, setSearch ] = useState("");
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
    }

    useEffect(() => {        

        if(!searchTerm) return setSearchResults([]);

        const searchRes = authentication.SearchSpotify(searchTerm);
        console.log("tracks: ",searchRes.tracks)
        
        setSearchResults(searchRes.tracks.items.map(song => {
            const smallestImage = song.album.images.reduce(
                (smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, song.album.images[0])

            return {
                cover: smallestImage.url,
                title: song.name,
                uri: song.uri,
                artist: song.artist[0].name
            }
        }));
        
    }, [searchTerm])

    return (
        <div className="page-body">
            <h1 className="page-title">Making a new Mood</h1>
            <input className="mood-input" type="text" placeholder="type your custom mood..."></input>
            
            {/* Added header */}
            <div className="added-header">
                <p className="sub-text">Added</p>
                <p className="sub-text">0/3</p>
            </div>

            {/* List of added songs */}
            <div>

            </div>

            {/* search bar */}
            <div className="search-div">
                <img className="icon-style" alt="search icon" src={SearchIcon}></img>
                <input className="mood-input" placeholder="enter a song name..." type="text" onChange={e => setSearch(e.target.value)}></input>
            </div>

            {/* Song search list */}
            <p className="sub-text">Suggested</p>
            <div>

            </div>

            {/* Create Button */}
            <div className="button-div">
                <button className="create-button-style" onClick={createNewMood()}>Create</button>
            </div>
        </div>
    );
}

function createNewMood() {

}

async function GetSearchResults(searchTerm) {
    console.log("SearchTerm: ", searchTerm)
    await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}`, 
    {   method: 'GET',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data;
    })
    .catch(error => console.error(error));
}

export default NewMoodScreen;