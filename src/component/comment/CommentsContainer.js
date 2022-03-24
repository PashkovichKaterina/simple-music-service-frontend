import React from "react"
import BackendAPI from "../../service/BackendAPI"
import Comment from "./Comment"
import AuthorizationLogic from "../../service/AuthorizationLogic"
import WritableComment from "./WritableComment"
import PaginationPanel from "../PaginationPanel";

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
        BackendAPI.getSongById(songId)
            .then(response => response.json())
            .then(json => this.setState({song: json}, () => this.setSongComments()))
    }

    setSongComments() {
        const {songId} = this.props
        const {page, pageSize} = this.state
        BackendAPI.getSongComments(songId, page, pageSize)
            .then(response => response.json())
            .then(json => this.setState({
                comments: json.results,
                commentsCount: json.count
            }))
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
            }, () => this.setSongComments()))
    }

    handleChangePage = (event) => {
        const selectedPage = event.selected + 1
        this.setState({page: selectedPage}, () => {
            this.setSongComments()
        })
    }

    handleChangePageSize = (event) => {
        const selectedPageSize = event.target.value
        this.setState({pageSize: selectedPageSize, page: 1}, () => {
            this.setSongComments()
        })
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
                <Comment key={comment.id}
                         comment={comment}/>) : ""
        const writableCommentElement = AuthorizationLogic.isUserSignIn()
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
