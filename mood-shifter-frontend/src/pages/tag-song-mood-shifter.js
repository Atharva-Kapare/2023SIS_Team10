import react from 'react';
import '../App.css';
import './css/tag-song.css'
import Song from '../components/song-list/song.js'

function TagSongMoodShifterScreen( {navigation, route} ) {

    const songData = route?.params;

    return (
        <div class="App page-body">
            <div>
                <h1>Tag a song</h1>
                <p>Select a playlist to tag this song to.</p>
            </div>

            {/* Song Display */}
            <div>
                <Song>

                </Song>
            </div>

            {/* Playlist List */}
            <div>

            </div>

        </div>
    )
}

export default TagSongMoodShifterScreen