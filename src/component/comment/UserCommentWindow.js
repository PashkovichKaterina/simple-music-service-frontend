import {useParams} from "react-router-dom"
import React from "react"
import CommentsContainer from "./CommentsContainer"
import AuthorizationLogic from "../../service/AuthorizationLogic";

function UserCommentWindow() {
    const {id} = useParams()
    if (parseInt(id) === AuthorizationLogic.getUserId()) {
        return (<CommentsContainer/>)
    } else {
        window.location.assign("/not_found")
        return null
    }
}

export default UserCommentWindow
