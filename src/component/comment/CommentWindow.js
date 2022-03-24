import {useParams} from "react-router-dom"
import React from "react"
import CommentsContainer from "./CommentsContainer"

function CommentWindow() {
    const {id} = useParams()
    return (
        <CommentsContainer songId={id}/>
    )
}

export default CommentWindow
