//this .js will be the component used repeatedly to show a list of songs for a playlist. 
//the component will include song title and singer. using the dislike, like buttons can apear on this line too
import React from 'react';
import '../getting-started/getting-started.css';
import SearchIcon from '../../assets/icons/search-icon.png'
import SongCoverIcon from '../../assets/icons/placeholder-song-cover.png'

function SongItem() {
    return (
        <div>
            <div className='song-div'>
                <div className='song-item'>
                    <div className='song-wrapper'>
                        <img className='song-img' alt="" src={SongCoverIcon}></img>
                        <div className='song-item-title-div'>
                            <h2 className='text-style song-text-title'>Song Title</h2>
                            <h3 className='text-style song-text-subtitle'>Artist</h3>
                        </div>
                    </div>
                    <div className='song-wrapper'>
                        <p className='song-add-button'>+</p>
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
                        <p className='song-add-button'>+</p>
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
                        <p className='song-add-button'>+</p>
                    </div>
                </div>
            </div>
            {/* Song List */}
        </div>
    );
}

export default SongItem;