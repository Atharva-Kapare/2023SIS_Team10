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
        <div className='App-header'>
        <Box>
            <Grid container rowSpacing={{ xs: 2, sm: 3, md: 4 }} columnSpacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
                <Grid item xs={2} sm={6} md={12}>
                    <h4 className="text-style step-text">Step 1</h4>
                </Grid>
                <Grid item xs={2} sm={6} md={12}>
                    <h1 className="text-style">Select Mood</h1>
                </Grid>
                <Grid item xs={2} sm={6} md={12}>
                    <h3 className="text-style section-header">Choose a common mood you find yourself in</h3>
                </Grid>
                <Grid item xs={2} sm={6} md={12}>
                    <button className='mood-button-style new-mood-button-style' onClick={() => navigation.navigate("NewMoodScreen")}>+</button>
                </Grid>
                <Grid item xs={2} sm={6} md={12}>
                    <h3 className="section-header">Suggested</h3>
                </Grid>
                <Grid item xs={2} sm={6} md={12}>
                    {updatedList.moods.map(mood => (
                        <button className='mood-button-style' onClick={() => changeSelected(mood)}>{mood}</button>
                    ))}
                </Grid>
                
                
                <Grid item xs={2} sm={6} md={12}>
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
                </Grid>
            </Grid>
        </Box>
        </div>
    );
}

function changeSelected(name) {
    selected = name;
}

export default SelectMoodScreen;