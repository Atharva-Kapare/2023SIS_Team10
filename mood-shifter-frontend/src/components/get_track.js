import React, { useEffect, useState } from "react";
import authentication from "../authentication";

const trackID = '1S7rX5dnPYrlMCJ3DBvlJn'; 

//const trackInfo = authentication.getSong(trackID).then(data => {console.log(data)})

/* 
 function returnInfo(){
    return(
        authentication.getSong(trackID).then(data => {
            //console.log("Raw Data", data)
            //console.log("The album name is", data.album.name)
            //console.log("The Song name is:" ,data.name)
            //console.log("The Song URI is:" ,data.uri)
            //const test = data.name
            
                return{
                    songName: data.name,
                    albumName: data.album.name,
                    uri: data.uri,
                }
                
        })
    );
} */


//const songData = returnInfo();

function GetTrack(){
    const [songData, setSongData ] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
       setData()
},[])

const setData = () => {
    setLoading(true)
    setSongData(authentication.getSong(trackID).then(data=> {
        return {
            songName: data.name,
            albumName: data.album.name,
            uri: data.uri,
        }
    }))
    setLoading(false)
}


    return(
    console.log(songData),
    <div>
        {songData.map(item => (
            <h1>{songData.songName}</h1>
        ))}
        

    </div>

    //console.log(authentication.getSong('6xU0ojuUR3dAhbnrJPQr1I'))    
    ); 
}

export default GetTrack;
