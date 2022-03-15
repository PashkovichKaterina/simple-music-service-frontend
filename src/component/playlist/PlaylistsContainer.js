import React from "react"
import BackendAPI from "../../service/BackendAPI"
import "../../style/SongPlayer.css"
import Playlist from "./Playlist"
import SearchPanel from "../SearchPanel"

class PlaylistsContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            playlists: [],
            search: ""
        }
    }

    componentDidMount() {
        this.setPlaylists()
    }

    setPlaylists() {
        const {search} = this.state
        BackendAPI.getPlaylistByUserId(search)
            .then(response => response.json())
            .then(json => this.setState({
                playlists: json
            }))
    }

    handleDeletePlaylist = (event) => {
        const playlistId = event.target.parentElement.id.split("-").pop()
        BackendAPI.deletePlaylist(playlistId)
            .then(() => this.setPlaylists())
    }

    handleChangeInputField = (event) => {
        this.setState({search: event.target.value})
    }

    handleSearch = () => {
        this.setPlaylists()
    }

    render() {
        const {playlists} = this.state
        const playlistList = playlists.length > 0
            ? playlists.map(playlist =>
                <Playlist key={playlist.id}
                          playlist={playlist}
                          handleDeletePlaylist={this.handleDeletePlaylist}/>)
            : <div>Empty list</div>
        return (
            <div>
                <button onClick={() => window.location.assign("/create-playlist")}>Create playlist</button>
                <SearchPanel handleChangeInputField={this.handleChangeInputField}
                             handleSearch={this.handleSearch}/>
                {playlistList}
            </div>
        )
    }
}

export default PlaylistsContainer
