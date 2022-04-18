import {useParams} from "react-router-dom"
import React from "react"
import SongTextContainer from "./SongTextContainer"

function SongTextWindow() {
    const {id} = useParams()
    return (
        <SongTextContainer songId={id}/>
    )
}

export default SongTextWindow
