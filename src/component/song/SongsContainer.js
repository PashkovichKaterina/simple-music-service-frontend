import React from "react"
import BackendAPI from "../../service/BackendAPI"
import Song from "./Song"
import "../../style/SongPlayer.css"
import SearchPanel from "../SearchPanel"

class SongsContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            songs: [],
            playSong: "",
            search: ""
        }
    }

    componentDidMount() {
        this.setSongs()
    }

    setSongs() {
        const {displayedInformation, playlistId} = this.props
        const {search} = this.state
        // eslint-disable-next-line
        switch (displayedInformation) {
            case "allSongs":
                BackendAPI.getAllSongs(search)
                    .then(response => response.json())
                    .then(json => this.setState({
                        songs: json
                    }))
                break
            case "userSongs":
                BackendAPI.getSongsByUserId(search)
                    .then(response => response.json())
                    .then(json => this.setState({
                        songs: json
                    }))
                break
            case "playlistSongs":
                BackendAPI.getPlaylistSong(playlistId)
                    .then(response => response.json())
                    .then(json => this.setState({
                        playlistTitle: json.title,
                        songs: json.song
                    }))
                break
        }
    }

    handleOnPlay = (event) => {
        const {playSong} = this.state
        if (playSong.length > 0 && playSong !== event.target.id) {
            const audio = document.getElementById(playSong)
            audio.pause()
        }
        this.setState({playSong: event.target.id})
    }

    handleOnEnded = (event) => {
        const audios = Array.from(document.getElementsByTagName("audio"))
        const index = audios.indexOf(event.target)
        if (index + 1 < audios.length) {
            audios[index + 1].play()
        }
    }

    handleShowPlaylistList = (event) => {
        const songId = event.target.id ? event.target.id : event.target.parentElement.id
        const dropdown = document.getElementById(`dropdown-${songId}`)
        dropdown.style.display = "block"
        document.onmouseup = () => {
            dropdown.style.display = "none"
        }
        BackendAPI.getPlaylistByUserId()
            .then(response => response.json())
            .then(json => this.setState({
                userPlaylists: json
            }))
    }

    handleAddToPlaylist = (event) => {
        const {songs, userPlaylists} = this.state
        const songId = event.target.parentElement.id.replace(/[^0-9]/g, "")
        const addedSong = songs.find(song => song.id === parseInt(songId))
        const playlistId = event.target.id
        const playlist = userPlaylists.find(playlist => playlist.id = parseInt(playlistId))
        const newPlaylistSong = playlist.song
        newPlaylistSong.push(addedSong)
        const updatedPlaylist = {id: playlistId, song: newPlaylistSong}
        BackendAPI.updatePlaylist(updatedPlaylist)
    }

    handleDeleteFromPlaylist = (event) => {
        const songId = event.target.id ? event.target.id : event.target.parentElement.id
        const newPlaylistSong = this.state.songs.filter(song => song.id !== parseInt(songId))
        const playlist = {id: this.props.playlistId, song: newPlaylistSong}
        BackendAPI.updatePlaylist(playlist)
            .then(response => response.json())
            .then(json => this.setState({songs: json.song}))
    }

    handleChangeInputField = (event) => {
        this.setState({search: event.target.value})
    }

    handleSearch = () => {
        this.setSongs()
    }

    render() {
        const {songs, playlistTitle, userPlaylists} = this.state
        const {displayedInformation} = this.props
        const button = displayedInformation === "userSongs"
            ? <button onClick={() => window.location.assign("/upload")}>Add song</button> : ""
        const songList = songs.length > 0
            ? songs.map(song =>
                <Song key={song.id}
                      song={song}
                      userPlaylists={userPlaylists}
                      isPlaylist={playlistTitle && playlistTitle.length > 0}
                      onPlay={this.handleOnPlay}
                      onEnded={this.handleOnEnded}
                      handleShowPlaylistList={this.handleShowPlaylistList}
                      handleAddToPlaylist={this.handleAddToPlaylist}
                      handleDeleteFromPlaylist={this.handleDeleteFromPlaylist}/>)
            : <div>Empty list</div>
        const searchPanel = displayedInformation !== "playlistSongs"
            ? <SearchPanel handleChangeInputField={this.handleChangeInputField}
                           handleSearch={this.handleSearch}/> : ""
        return (
            <div>
                <h2>{playlistTitle}</h2>
                {button}
                {searchPanel}
                {songList}
            </div>
        )
    }
}

export default SongsContainer
