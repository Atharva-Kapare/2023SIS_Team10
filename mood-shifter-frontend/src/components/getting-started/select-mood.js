import React from 'react';
import './getting-started.css';

function SelectMoodScreen( { navigation } ) {
    return (
        <div className="login">
            <div className="header-div">
                <h4 className="text-style step-text">Step 1</h4>
                <h1 className="text-style">Select Mood</h1>
                <h3 className="text-style sub-text">Choose a common mood you find yourself in</h3>
                <button className='mood-button-style new-mood-button-style'><p className="mood-item new-mood-item">+</p></button>
            </div>

            
            
            {/* Mood List */}
            <div className='mood-div'>
                <h3 className="section-header">Suggested</h3>
                <div className='mood-row'>
                    <button className='mood-button-style'><p className="mood-item">Happy</p></button>
                    <button className='mood-button-style'><p className="mood-item">Sleepy</p></button>
                    <button className='mood-button-style'><p className="mood-item">Stressed</p></button>
                </div>
                <div className='mood-row'>
                    <button className='mood-button-style'><p className="mood-item">Tired</p></button>
                    <button className='mood-button-style'><p className="mood-item">Annoyed</p></button>
                    <button className='mood-button-style'><p className="mood-item">Sad</p></button>
                </div>
                <div className='mood-row'>
                    <button className='mood-button-style'><p className="mood-item">Jealous</p></button>
                    <button className='mood-button-style'><p className="mood-item">Enthusiastic</p></button>
                    <button className='mood-button-style'><p className="mood-item">Anxious</p></button>
                    <button className='mood-button-style'><p className="mood-item">Surprised</p></button>
                </div>
            </div>
            {/* Mood List */}

            <button className="sign-in-button-style" onClick={() => navigation.navigate('TagSongsScreen')}>Continue</button>
        </div>
    );
}

export default SelectMoodScreen;