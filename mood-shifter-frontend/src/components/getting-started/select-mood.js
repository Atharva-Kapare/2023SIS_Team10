import React, { useState } from 'react';
import './getting-started.css';
import { Box, Grid } from '@mui/material';

let selected = 'none';

function SelectMoodScreen( { route, navigation } ) {
    const defaultMood = { "moods": [
        "Happy", "Sad", "Tired",
        "Angry", "Depressed", "Nervous",
        "Bored", "Calm", "Melancholic",
        "Frustrated", "Envious", "Irritated",
        "Joyful", "Embarrased", "Elated"
    ]}

    const [ updatedList, setUpdatedList ] = useState(defaultMood);
    console.log("USESTATELIST: ", updatedList)

    return (
        <Box>
            <Grid container rowSpacing={{ xs: 2, sm: 3, md: 4 }} columnSpacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
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
                            {updatedList.moods.map(mood => (
                                <Grid item xs={1} sm={2} md={3}>
                                    <div>
                                        <button className='mood-button-style' onClick={() => changeSelected(mood)}>{mood}</button>
                                    </div>
                                </Grid>
                            ))}
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



                                let result = {"moods":[]};
                                updatedList.moods.forEach(mood => {
                                    if(mood !== selected) {
                                        result.moods.push(mood);
                                    }
                                    return result
                                })
                                setUpdatedList(result);
                                selected = 'none';
                            }
                        }}
                    >Continue</button>
                </div>
            </Grid>
        </Box>
    );
}

function changeSelected(name) {
    selected = name;
}

export default SelectMoodScreen;