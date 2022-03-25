import React from "react"
import "../../style/SongPlayer.css"
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import AuthorizationLogic from "../../service/AuthorizationLogic"


class CommentContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            message: this.props.comment.message
        }
    }

    handleShowEditForm = () => {
        this.setState({isEdit: true})
    }

    handleChangeTextareaField = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    handleEditComment = () => {
        const {message} = this.state
        const {comment, handleEditComment} = this.props
        const songId = comment.song ? comment.song.id : ""

        this.setState({isEdit: false}, () => handleEditComment(comment.id, message, songId))
    }

    handleDeleteComment = () => {
        const {comment, handleDeleteComment} = this.props
        const songId = comment.song ? comment.song.id : ""
        handleDeleteComment(songId, comment.id)
    }

    render() {
        const {comment} = this.props
        const {isEdit, message} = this.state
        const commentIconBlock = (comment.user && comment.user.id === AuthorizationLogic.getUserId()) || comment.song
            ? <div className="comment-icon-block">
                <FontAwesomeIcon icon={faEdit}
                                 className="comment-icon icon"
                                 title="Edit comment"
                                 onClick={this.handleShowEditForm}/>
                <FontAwesomeIcon icon={faTrash}
                                 className="comment-icon icon"
                                 title="Delete comment"
                                 id={comment.id}
                                 onClick={this.handleDeleteComment}/>
            </div> : ""
        const messageElement = isEdit
            ? <div>
                <textarea className="comment-message-block"
                          placeholder="vmessageElementWrite your comment"
                          value={message}
                          onChange={this.handleChangeTextareaField}/>
                <button className="add-comment-button" onClick={this.handleEditComment}>Save</button>
            </div>
            : <p>{comment.message}</p>
        const title = comment.user
            ? <p className="username">{comment.user.username} - {comment.created_date}</p>
            : <div>
                <p className="title">{comment.song.title} - {comment.song.artist.map((a) => a.name).join(", ")}</p>
                <p className="username">{comment.created_date}</p>
            </div>
        return (
            <div className="comment-block">
                {title}
                {messageElement}
                {commentIconBlock}
            </div>
        )
    }
}

export default CommentContainer
