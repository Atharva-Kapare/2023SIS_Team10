import React from 'react';
import './getting-started.css';

let selected = 'none';

function SelectMoodScreen( { navigation } ) {
    return (
        <div className="login">
            <div className="header-div">
                <h4 className="text-style step-text">Step 1</h4>
                <h1 className="text-style">Select Mood</h1>
                <h3 className="text-style sub-text">Choose a common mood you find yourself in</h3>
                <button className='mood-button-style new-mood-button-style'>+</button>
            </div>

            {/* Mood List */}
            <div className='mood-div'>
                <h3 className="section-header">Suggested</h3>
                <div className='mood-row'>
                    <button className='mood-button-style' onClick={changeSelected('Happy')}>Happy</button>
                    <button className='mood-button-style' onClick={changeSelected('Sleepy')}>Sleepy</button>
                    <button className='mood-button-style' onClick={changeSelected('Stressed')}>Stressed</button>
                </div>
                <div className='mood-row'>
                    <button className='mood-button-style' onClick={changeSelected('Tired')}>Tired</button>
                    <button className='mood-button-style' onClick={changeSelected('Annoyed')}>Annoyed</button>
                    <button className='mood-button-style' onClick={changeSelected('Sad')}>Sad</button>
                </div>
                <div className='mood-row'>
                    <button className='mood-button-style' onClick={changeSelected('Jealous')}>Jealous</button>
                    <button className='mood-button-style' onClick={changeSelected('Enthusiast')}>Enthusiastic</button>
                    <button className='mood-button-style' onClick={changeSelected('Anxious')}>Anxious</button>
                    <button className='mood-button-style' onClick={changeSelected('Surprised')}>Surprised</button>
                </div>
            </div>
            {/* Mood List */}

            <button className="sign-in-button-style" onClick={() => 
                { 
                    if(selected === 'none') {
                        alert("You must select a mood to continue!");
                    } else {
                        navigation.push('TagSongsScreen', 
                            {
                                selectedMood: selected,
                            }
                        );
                    }
                }}
            >Continue</button>
        </div>
    );
}

function changeSelected(name) {
    selected = name;
}

export default SelectMoodScreen;