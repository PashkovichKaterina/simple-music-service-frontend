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
        const {handleEditComment} = this.props
        const commentID = this.props.comment.id

        this.setState({isEdit: false}, () => handleEditComment(commentID, message))
    }

    render() {
        const {comment, handleDeleteComment} = this.props
        const {isEdit, message} = this.state
        const commentIconBlock = comment.user.id === AuthorizationLogic.getUserId()
            ? <div className="comment-icon-block">
                <FontAwesomeIcon icon={faEdit}
                                 className="comment-icon icon"
                                 title="Edit comment"
                                 onClick={this.handleShowEditForm}/>
                <FontAwesomeIcon icon={faTrash}
                                 className="comment-icon icon"
                                 title="Delete comment"
                                 id={comment.id}
                                 onClick={handleDeleteComment}/>
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
        return (
            <div className="comment-block">
                <p className="username">{comment.user.username} - {comment.created_date}</p>
                {messageElement}
                {commentIconBlock}
            </div>
        )
    }
}

export default CommentContainer
