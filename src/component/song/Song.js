import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus, faClose, faStar} from "@fortawesome/free-solid-svg-icons"
import AuthorizationLogic from "../../service/AuthorizationLogic"

const Song = (props) => {
    const {
        onPlay, song, onEnded, handleShowPlaylistList, userPlaylists, isPlaylist,
        handleDeleteFromPlaylist, handleAddToPlaylist, handleRateSong
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
    const rating = song.average_rating
        ? <span> {song.average_rating} <span className="reviews-count">({song.reviews_count} reviews)</span></span>
        : "not rated yet"
    const user_mark = song.user_mark ? song.user_mark.mark : "-"
    const mark_id = song.user_mark ? `rating-${song.user_mark.id}` : ""
    const ratingButton = AuthorizationLogic.isUserSignIn()
        ? <select className="rating-button" title="Rate this song" id={mark_id}
                  onChange={handleRateSong}>
            <option>Your mark: {user_mark}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select> : ""
    return (
        <div className="song-player" id={`song-player-${song.id}`}>
            {playlistButton}
            <p className="title">{song.title}</p>
            <p className="artist">{artistList}</p>
            <p className="icon-block">
                <FontAwesomeIcon icon={faStar}
                                 id={song.id}
                                 className="rating-icon icon"
                                 title="Song rating"/>
                {rating}
            </p>
            {ratingButton}
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
