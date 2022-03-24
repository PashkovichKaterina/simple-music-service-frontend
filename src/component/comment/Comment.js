import React from "react"
import "../../style/SongPlayer.css"


const Comment = (props) => {
    const {comment} = props
    return (
        <div className="comment-block">
            <p className="username">{comment.user.username} - {comment.created_date}</p>
            <p>{comment.message}</p>
        </div>
    )
}

export default Comment
