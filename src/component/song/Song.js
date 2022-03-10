import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus, faClose} from "@fortawesome/free-solid-svg-icons"
import AuthorizationLogic from "../../service/AuthorizationLogic"

const Song = (props) => {
    const {
        onPlay, song, onEnded, handleShowPlaylistList, userPlaylists, isPlaylist,
        handleDeleteFromPlaylist, handleAddToPlaylist
    } = props
    const artistList = song.artist.map((a) => a.name).join(", ")
    const playlistList = userPlaylists && userPlaylists.length > 0
        ? userPlaylists.map(playlist => <li key={playlist.id} id={playlist.id}
                                            onClick={handleAddToPlaylist}>{playlist.title}</li>)
        : <li>You don't have playlists yet</li>
    const playlistButton = isPlaylist
        ? <FontAwesomeIcon icon={faClose}
                           id={song.id}
                           className="add-to-playlist icon"
                           title="Delete from playlist"
                           onClick={handleDeleteFromPlaylist}/>
        : AuthorizationLogic.isUserSignIn()
            ? <div>
                <FontAwesomeIcon icon={faPlus}
                                 id={song.id}
                                 className="add-to-playlist icon"
                                 title="Add to playlist"
                                 onClick={handleShowPlaylistList}/>
                <ul id={`dropdown-${song.id}`} className="dropdown-content">
                    {playlistList}
                </ul>
            </div> : ""
    return (
        <div className="song-player">
            {playlistButton}
            <p className="title">{song.title}</p>
            <p className="artist">{artistList}</p>
            <audio src={song.location}
                   controls={true}
                   className="player-component"
                   id={`audio${song.id}`}
                   onPlay={onPlay}
                   onEnded={onEnded}/>
        </div>
    )
}

export default Song
