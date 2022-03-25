import {useParams} from "react-router-dom"
import React from "react"
import CommentsContainer from "./CommentsContainer"

function SongCommentWindow() {
    const {id} = useParams()
    return (
        <CommentsContainer songId={id}/>
    )
}

export default SongCommentWindow
