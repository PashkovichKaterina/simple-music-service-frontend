import React from "react"
import BackendAPI from "../../service/BackendAPI"
import Song from "./Song"
import "../../style/SongPlayer.css"
import SearchPanel from "../SearchPanel"
import SortingPanel from "../SortingPanel"
import PaginationPanel from "../PaginationPanel"

class SongsContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            songs: [],
            playSong: "",
            search: "",
            sorting: "",
            page: 1,
            pageSize: 5,
            songsCount: 0
        }
    }

    componentDidMount() {
        this.setSongs()
    }

    setSongs() {
        const {displayedInformation, playlistId} = this.props
        const {page, pageSize, search, sorting} = this.state
        // eslint-disable-next-line
        switch (displayedInformation) {
            case "allSongs":
                BackendAPI.getAllSongs(page, pageSize, search, sorting)
                    .then(response => response.json())
                    .then(json => this.setState({
                        songs: json.results,
                        songsCount: json.count
                    }))
                break
            case "userSongs":
                BackendAPI.getSongsByUserId(page, pageSize, search, sorting)
                    .then(response => response.json())
                    .then(json => this.setState({
                        songs: json.results,
                        songsCount: json.count
                    }))
                break
            case "playlistSongs":
                BackendAPI.getPlaylistSong(playlistId)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        }
                        window.location.assign("/not_found")
                    })
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

    handleSorting = (event) => {
        this.setState({sorting: event.target.id}, () => {
            this.setSongs()
        })
    }

    handleChangePage = (event) => {
        const selectedPage = event.selected + 1
        this.setState({page: selectedPage}, () => {
            this.setSongs()
        })
    }

    handleChangePageSize = (event) => {
        const selectedPageSize = event.target.value
        this.setState({pageSize: selectedPageSize, page: 1}, () => {
            this.setSongs()
        })
    }

    handleRateSong = (event) => {
        const selectedRating = event.target.value
        const ratingId = event.target.id.split("-").pop()
        const songId = event.target.parentElement.id.split("-").pop()
        if (ratingId) {
            BackendAPI.updateSongRating(songId, ratingId, selectedRating)
                .then(() => this.setSongs())
        } else {
            BackendAPI.saveSongRating(songId, selectedRating)
                .then(() => this.setSongs())
        }

    }

    render() {
        const {songs, playlistTitle, userPlaylists, songsCount, page, pageSize} = this.state
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
                      handleDeleteFromPlaylist={this.handleDeleteFromPlaylist}
                      handleRateSong={this.handleRateSong}/>)
            : <div>Empty list</div>
        const sortingOptions = {
            "-year": "Sort by release date (newest to oldest)",
            "year": "Sort by release date (oldest to newest)",
            "-avg_rating": "Sort by rating (highest to lowest)",
            "avg_rating": "Sort by rating (lowest to highest)",
            "title": "Sort by title (A to Z)",
            "-title": "Sort by title (Z to A)"
        }
        const panels = displayedInformation !== "playlistSongs"
            ? <div>
                <SearchPanel handleChangeInputField={this.handleChangeInputField}
                             handleSearch={this.handleSearch}/>
                <SortingPanel options={sortingOptions}
                              handleSorting={this.handleSorting}/>
            </div> : ""
        const paginationOptions = [5, 10, 15, 20]
        const paginationPanel = displayedInformation !== "playlistSongs"
            ? <PaginationPanel options={paginationOptions}
                               elementsCount={songsCount}
                               page={page}
                               pageSize={pageSize}
                               handleChangePageSize={this.handleChangePageSize}
                               handleChangePage={this.handleChangePage}/> : ""
        return (
            <div>
                <h2>{playlistTitle}</h2>
                {button}
                {panels}
                {songList}
                {paginationPanel}
            </div>
        )
    }
}

export default SongsContainer
