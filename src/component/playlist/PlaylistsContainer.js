import React from "react"
import BackendAPI from "../../service/BackendAPI"
import "../../style/SongPlayer.css"
import Playlist from "./Playlist"

class PlaylistsContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            playlists: []
        }
    }

    componentDidMount() {
        this.setPlaylists()
    }

    setPlaylists() {
        BackendAPI.getPlaylistByUserId()
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
                {playlistList}
            </div>
        )
    }
}

export default PlaylistsContainer
