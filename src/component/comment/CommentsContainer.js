import React from "react"
import BackendAPI from "../../service/BackendAPI"
import Comment from "./Comment"
import AuthorizationLogic from "../../service/AuthorizationLogic"
import WritableComment from "./WritableComment"

class CommentsContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            newComment: "",
            comments: []
        }
    }

    componentDidMount() {
        const {songId} = this.props
        BackendAPI.getSongById(songId)
            .then(response => response.json())
            .then(json => this.setState({song: json}, () => this.setSongComments()))
    }

    setSongComments() {
        const {songId} = this.props
        BackendAPI.getSongComments(songId)
            .then(response => response.json())
            .then(json => this.setState({
                comments: json
            }))
    }

    handleChangeTextareaField = (event) => {
        this.setState({
            newComment: event.target.value
        })
    }

    handleCreateComment = () => {
        const {songId} = this.props
        const {newComment} = this.state
        BackendAPI.createComment(songId, newComment)
            .then(() => this.setState({newComment: ""}, () => this.setSongComments()))
    }

    render() {
        const {song, comments, newComment} = this.state
        const songElement = song ?
            <div>
                <h2>{song.title} - {song.artist.map((a) => a.name).join(", ")}</h2>
                <audio src={song.location}
                       controls={true}
                       className="player-component"/>
            </div> : ""
        const commentList = comments && comments.length > 0
            ? comments.map(comment =>
                <Comment key={comment.id}
                         comment={comment}/>) : ""
        const writableCommentElement = AuthorizationLogic.isUserSignIn()
            ? <WritableComment value={newComment}
                               handleCreateComment={this.handleCreateComment}
                               handleChangeTextareaField={this.handleChangeTextareaField}/> : ""
        return (
            <div>
                {songElement}
                {commentList}
                {writableCommentElement}
            </div>
        )
    }
}

export default CommentsContainer
