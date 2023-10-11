import React from 'react';
import './getting-started.css';
import SearchIcon from '../../assets/icons/search-icon.png'
import SongCoverIcon from '../../assets/icons/placeholder-song-cover.png'
import Authentication from '../../authentication'

let tagCount = localStorage.getItem('tagCount') || 0;

function TagSongsScreen( { route, navigation } ) {
    const { selectedMood } = route.params;
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
                <input className="search-bar-style" name="searchbar" id="searchbar" placeholder="search..." onKeyUp={() => fetchSongs()}></input>
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

                    <div className='song-item'>
                        <div className='song-wrapper'>
                            <img className='song-img' alt="" src={SongCoverIcon}></img>
                            <div className='song-item-title-div'>
                                <h2 className='text-style song-text-title'>Song Title</h2>
                                <h3 className='text-style song-text-subtitle'>Artist</h3>
                            </div>
                        </div>
                        <div className='song-wrapper'>
                            <button className="song-button" onClick={() => {selectSong()}}>
                                <p className='song-add-button'>+</p>
                            </button>
                        </div>
                    </div>
                    <div className='song-item'>
                        <div className='song-wrapper'>
                            <img className='song-img' alt="" src={SongCoverIcon}></img>
                            <div className='song-item-title-div'>
                                <h2 className='text-style song-text-title'>Song Title</h2>
                                <h3 className='text-style song-text-subtitle'>Artist</h3>
                            </div>
                        </div>
                        <div className='song-wrapper'>
                            <button className="song-button" onClick={() => {selectSong()}}>
                                <p className='song-add-button'>+</p>
                            </button>
                        </div>
                    </div>
                    <div className='song-item'>
                        <div className='song-wrapper'>
                            <img className='song-img' alt="" src={SongCoverIcon}></img>
                            <div className='song-item-title-div'>
                                <h2 className='text-style song-text-title'>Song Title</h2>
                                <h3 className='text-style song-text-subtitle'>Artist</h3>
                            </div>
                        </div>
                        <div className='song-wrapper'>
                            <button className="song-button" onClick={() => {selectSong()}}>
                                <p className='song-add-button'>+</p>
                            </button>
                        </div>
                    </div>
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

async function fetchSongs() {
    let searchTerm = document.getElementById('searchbar').value 
    searchTerm = searchTerm.toLowerCase(); 
    Authentication.fetchWebApi(`v1/search?q=${searchTerm}&type=track&limit=5`, 'GET').then((e) => {
        console.log(e);
    });
}

function selectSong() {
    console.log("Hit");
}

export default TagSongsScreen;