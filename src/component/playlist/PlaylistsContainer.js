import React from "react"
import BackendAPI from "../../service/BackendAPI"
import "../../style/SongPlayer.css"
import Playlist from "./Playlist"
import SearchPanel from "../SearchPanel"
import SortingPanel from "../SortingPanel"

class PlaylistsContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            playlists: [],
            search: "",
            sorting: ""
        }
    }

    componentDidMount() {
        this.setPlaylists()
    }

    setPlaylists() {
        const {search, sorting} = this.state
        BackendAPI.getPlaylistByUserId(search, sorting)
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

    handleSorting = (event) => {
        this.setState({sorting: event.target.id}, () => {
            this.setPlaylists()
        })
    }

    render() {
        const {playlists} = this.state
        const playlistList = playlists.length > 0
            ? playlists.map(playlist =>
                <Playlist key={playlist.id}
                          playlist={playlist}
                          handleDeletePlaylist={this.handleDeletePlaylist}/>)
            : <div>Empty list</div>
        const sortingOptions = {
            "title": "Sorting by title (A to Z)",
            "-title": "Sorting by title (Z to A)"
        }
        return (
            <div>
                <button onClick={() => window.location.assign("/create-playlist")}>Create playlist</button>
                <div>
                    <SearchPanel handleChangeInputField={this.handleChangeInputField}
                                 handleSearch={this.handleSearch}/>
                    <SortingPanel options={sortingOptions}
                                  handleSorting={this.handleSorting}/>
                </div>
                {playlistList}
            </div>
        )
    }
}

export default PlaylistsContainer
