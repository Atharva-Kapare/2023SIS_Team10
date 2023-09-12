import React, { useEffect, useState } from "react";
import axios from 'axios'


const GET_TRACK_ENDPOINT = "https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl"
const ACCESS_TOKEN = "1POdFZRZbvb...qqillRxMr2z"

function GetTrack(){
    const [token, setToken] = useState('');
    const [data, setData] = useState({});
    
    const handleGetTrack = () => {

    axios.get(GET_TRACK_ENDPOINT, {
        headers: {
            Authorization: "Bearer " + ACCESS_TOKEN,
        }
    } ).then((response) => {
        setData(response.data);
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });

};

    return(
        <button onClick={handleGetTrack}>Get Track</button>
)}

export default GetTrack;