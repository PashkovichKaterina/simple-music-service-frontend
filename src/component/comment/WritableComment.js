import React from "react"
import "../../style/SongPlayer.css"

const WritableComment = (props) => {
    const {value, handleCreateComment, handleChangeTextareaField} = props
    return (
        <div className="writable-comment-block">
            <textarea className="comment-message-block"
                      placeholder="Write your comment"
                      value={value}
                      onChange={handleChangeTextareaField}/>
            <button className="add-comment-button" onClick={handleCreateComment}>Save</button>
        </div>
    )
}

export default WritableComment
