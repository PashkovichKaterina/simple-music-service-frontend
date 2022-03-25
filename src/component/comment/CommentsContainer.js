import React from "react"
import BackendAPI from "../../service/BackendAPI"
import CommentContainer from "./CommentContainer"
import AuthorizationLogic from "../../service/AuthorizationLogic"
import WritableComment from "./WritableComment"
import PaginationPanel from "../PaginationPanel"

class CommentsContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            newComment: "",
            comments: [],
            page: 1,
            pageSize: 5,
            commentsCount: 0
        }
    }

    componentDidMount() {
        const {songId} = this.props
        if (songId) {
            BackendAPI.getSongById(songId)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    window.location.assign("/not_founds")
                })
                .then(json => this.setState({song: json}))
        }
        this.setComments()
    }

    setComments() {
        const {songId} = this.props
        const {page, pageSize} = this.state
        if (songId) {
            BackendAPI.getSongComments(songId, page, pageSize)
                .then(response => response.json())
                .then(json => this.setState({
                    comments: json.results,
                    commentsCount: json.count
                }))
        } else {
            BackendAPI.getUserComments(page, pageSize)
                .then(response => response.json())
                .then(json => this.setState({
                    comments: json.results,
                    commentsCount: json.count
                }))
        }
    }

    handleChangeTextareaField = (event) => {
        this.setState({
            newComment: event.target.value
        })
    }

    handleCreateComment = () => {
        const {songId} = this.props
        const {newComment, pageSize, commentsCount} = this.state
        BackendAPI.createComment(songId, newComment)
            .then(() => this.setState({
                newComment: "",
                page: Math.ceil((commentsCount + 1) / pageSize)
            }, () => this.setComments()))
    }

    handleChangePage = (event) => {
        const selectedPage = event.selected + 1
        this.setState({page: selectedPage}, () => {
            this.setComments()
        })
    }

    handleChangePageSize = (event) => {
        const selectedPageSize = event.target.value
        this.setState({pageSize: selectedPageSize, page: 1}, () => {
            this.setComments()
        })
    }

    handleDeleteComment = (songId, commentId) => {
        songId = songId ? songId : this.props.songId
        BackendAPI.deleteComment(songId, commentId)
            .then(() => this.setComments())
    }

    handleEditComment = (commentID, message, songId) => {
        songId = songId ? songId : this.props.songId
        BackendAPI.editComment(songId, commentID, message)
            .then(() => this.setComments())
    }

    render() {
        const {song, comments, newComment, commentsCount, page, pageSize} = this.state
        const songElement = song ?
            <div>
                <h2>{song.title} - {song.artist.map((a) => a.name).join(", ")}</h2>
                <audio src={song.location}
                       controls={true}
                       className="player-component"/>
            </div> : ""
        const commentList = comments && comments.length > 0
            ? comments.map(comment =>
                <CommentContainer key={comment.id}
                                  comment={comment}
                                  handleEditComment={this.handleEditComment}
                                  handleDeleteComment={this.handleDeleteComment}/>) : ""
        const writableCommentElement = AuthorizationLogic.isUserSignIn() && song
            ? <WritableComment value={newComment}
                               handleCreateComment={this.handleCreateComment}
                               handleChangeTextareaField={this.handleChangeTextareaField}/> : ""
        const paginationOptions = [5, 10, 15, 20]
        return (
            <div>
                {songElement}
                {commentList}
                <PaginationPanel options={paginationOptions}
                                 elementsCount={commentsCount}
                                 page={page}
                                 pageSize={pageSize}
                                 handleChangePageSize={this.handleChangePageSize}
                                 handleChangePage={this.handleChangePage}/>
                {writableCommentElement}
            </div>
        )
    }
}

export default CommentsContainer
