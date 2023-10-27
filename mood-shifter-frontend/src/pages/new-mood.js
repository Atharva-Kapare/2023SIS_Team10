import React, { useEffect, useState } from "react";
import './css/new-mood.css'
import SearchIcon from '../assets/icons/search-icon.png'
import authentication from '../authentication'
import Song from "../components/getting-started/song";

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

    // useEffect(() => {        

    //     if(!searchTerm) return setSearchResults([]);

    //     const searchRes = authentication.SearchSpotify(searchTerm);
    //     console.log("tracks: ",searchRes.tracks)
        
    //     setSearchResults(searchRes.tracks.items.map(song => {
    //         const smallestImage = song.album.images.reduce(
    //             (smallest, image) => {
    //                 if (image.height < smallest.height) return image
    //                 return smallest
    //             }, song.album.images[0])

    //         return {
    //             cover: smallestImage.url,
    //             title: song.name,
    //             uri: song.uri,
    //             artist: song.artist[0].name
    //         }
    //     }));
        
    // }, [searchTerm])

    useEffect(() => {
        if(!searchTerm) return setSearchResults([]);

        let cancel = false;

        if(cancel) return 
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                accessToken: localStorage.getItem("accessToken"),
                searchTerm: searchTerm,
            }),
        };

        fetch("http://localhost:8000/api/search", options).then((response) => response.json()).then(res => {
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
    })

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
                {searchResults.map((song) => (
                    <div  style={{ cursor: "pointer" }} onClick={() => addSong(song)}>
                        <Song 
                            track={song}
                            key={song.uri}
                        />
                    </div>
                ))}
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


export default NewMoodScreen;