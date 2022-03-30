import React from "react"
import moment from "moment-timezone"
import "../../style/SongPlayer.css"
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import AuthorizationLogic from "../../service/AuthorizationLogic"
import FormValidator from "../../service/FormValidator"


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
        if (FormValidator.isValidCommentMessage(message)) {
            this.setState({isEdit: false}, () => handleEditComment(comment.id, message, songId))
        }
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
                          placeholder="Write your comment"
                          value={message}
                          onChange={this.handleChangeTextareaField}/>
                <p className="error-data"
                   hidden={FormValidator.isValidCommentMessage(message)}>
                    {`Message length must be from ${process.env.REACT_APP_MIN_COMMENT_LENGTH} 
                    to ${process.env.REACT_APP_MAX_COMMENT_LENGTH} characters`}
                </p>
                <button className="add-comment-button" onClick={this.handleEditComment}>Save</button>
            </div>
            : <p>{comment.message}</p>
        const username = comment.user ? comment.user.username : "User was deleted"
        const createdDateTime = moment(comment.created_date_time)
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const createdDateTimeString = createdDateTime.tz(userTimeZone).format(process.env.REACT_APP_DATETIME_FORMAT)
        const title = comment.song
            ? <div>
                <p className="title">{comment.song.title} - {comment.song.artist.map((a) => a.name).join(", ")}</p>
                <p className="username">{createdDateTimeString}</p>
            </div>
            : <p className="username">{username} - {createdDateTimeString}</p>
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
