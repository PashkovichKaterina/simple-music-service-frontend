import React from "react"
import "../../style/SongPlayer.css"

const WritableComment = (props) => {
    const {value, isValidMessage, handleCreateComment, handleChangeTextareaField} = props
    return (
        <div className="writable-comment-block">
            <textarea className="comment-message-block"
                      placeholder="Write your comment"
                      value={value}
                      onChange={handleChangeTextareaField}/>
            <p className="error-data"
               hidden={isValidMessage}>
                Message length must be from 1 to 100 characters
            </p>
            <button className="add-comment-button" onClick={handleCreateComment}>Save</button>
        </div>
    )
}

export default WritableComment
