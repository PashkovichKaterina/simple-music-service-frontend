import React from "react"
import BackendAPI from "../../service/BackendAPI"
import "../../style/SongPlayer.css"
import Playlist from "./Playlist"
import SearchPanel from "../SearchPanel"
import SortingPanel from "../SortingPanel"
import PaginationPanel from "../PaginationPanel"

class PlaylistsContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            playlists: [],
            search: "",
            sorting: "",
            page: 1,
            pageSize: 5,
            playlistsCount: 0
        }
    }

    componentDidMount() {
        this.setPlaylists()
    }

    setPlaylists() {
        const {page, pageSize, search, sorting} = this.state
        BackendAPI.getPlaylistByUserId(page, pageSize, search, sorting)
            .then(response => response.json())
            .then(json => this.setState({
                playlists: json.results,
                playlistsCount: json.count
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

    handleChangePage = (event) => {
        const selectedPage = event.selected + 1
        this.setState({page: selectedPage}, () => {
            this.setPlaylists()
        })
    }

    handleChangePageSize = (event) => {
        const selectedPageSize = event.target.value
        this.setState({pageSize: selectedPageSize, page: 1}, () => {
            this.setPlaylists()
        })
    }

    render() {
        const {playlists, page, pageSize, playlistsCount} = this.state
        const playlistList = playlists.length > 0
            ? playlists.map(playlist =>
                <Playlist key={playlist.id}
                          playlist={playlist}
                          handleDeletePlaylist={this.handleDeletePlaylist}/>)
            : <div>Empty list</div>
        const sortingOptions = {
            "title": "Sort by title (A to Z)",
            "-title": "Sort by title (Z to A)"
        }
        const paginationOptions = [5, 10, 15, 20]
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
                <PaginationPanel options={paginationOptions}
                                 elementsCount={playlistsCount}
                                 page={page}
                                 pageSize={pageSize}
                                 handleChangePage={this.handleChangePage}
                                 handleChangePageSize={this.handleChangePageSize}/>
            </div>
        )
    }
}

export default PlaylistsContainer
