import React from "react";
import authentication from "../authentication";

const trackID = '1S7rX5dnPYrlMCJ3DBvlJn'; 
let trackInfo = []
//const trackInfo = authentication.getSong(trackID).then(data => {console.log(data)})

function GetTrack(){
    return(

     authentication.getSong(trackID).then(data => {
        console.log(data)
    }), 
    <div>
        <h1>test</h1>

    </div>



    //console.log(authentication.getSong('6xU0ojuUR3dAhbnrJPQr1I'))    
    ); 
}


export default GetTrack;