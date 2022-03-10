import React from "react"
import {useParams} from "react-router-dom"
import SongsContainer from "../song/SongsContainer"


function PlaylistWindow() {
    const {id} = useParams()
    return (
        <SongsContainer playlistId={id} displayedInformation="playlistSongs"/>
    )
}

export default PlaylistWindow
