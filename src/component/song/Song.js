import React from "react";

const Song = (props) => {
    const {onPlay, song} = props
    const artistList = song.artist.map((a) => a.name).join(", ")
    return (
        <div className="song-player">
            <p className="title">{song.title}</p>
            <p className="artist">{artistList}</p>
            <audio src={song.location}
                   controls={true}
                   className="player-component"
                   id={`audio${song.id}`}
                   onPlay={onPlay}/>
        </div>
    )
}

export default Song;
