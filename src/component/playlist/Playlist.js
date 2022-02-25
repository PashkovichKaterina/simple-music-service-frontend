import React from "react"
import "../../style/SongPlayer.css"

const Playlist = (props) => {
    const {playlist, handleDeletePlaylist} = props
    return (
        <div className="song-player" id={`playlist-${playlist.id}`}>
            <p className="title">{playlist.title}</p>
            <p className="song-count">{`Songs count: ${playlist.song.length}`}</p>
            <button className="listen-playlist-button"
                    onClick={() => window.location.assign(`/playlists/${playlist.id}`)}>Listen
            </button>
            <button className="delete-playlist-button"
                    onClick={handleDeletePlaylist}>
                Delete
            </button>
        </div>
    )
}

export default Playlist
