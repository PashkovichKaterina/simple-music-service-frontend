import React from "react";
import BackendAPI from "../../service/BackendAPI";
import Song from "./Song";
import AuthorizationLogic from "../../service/AuthorizationLogic";
import "../../style/SongPlayer.css"

class SongsContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            playSong: "",
            isUserPage: window.location.pathname === "/songs"
        };
    }

    componentDidMount() {
        const {isUserPage} = this.state
        if (isUserPage) {
            BackendAPI.getSongsByUserId(AuthorizationLogic.getUserId())
                .then(response => response.json())
                .then(json => this.setState({
                    songs: json
                }))
        } else {
            BackendAPI.getAllSongs()
                .then(response => response.json())
                .then(json => this.setState({
                    songs: json
                }))
        }
    }

    handleOnPlay = (event) => {
        const {playSong} = this.state
        if (playSong.length > 0) {
            const audio = document.getElementById(playSong)
            audio.pause()
        }
        this.setState({playSong: event.target.id})
    }

    render() {
        const {songs, isUserPage} = this.state
        const songList = songs.length > 0
            ? songs.map(song =>
                <Song key={song.id}
                      song={song}
                      onPlay={this.handleOnPlay}/>)
            : <div>Empty list</div>
        const button = isUserPage ? <button onClick={() => window.location.assign("/upload")}>Add song</button> : ""
        return (
            <div>
                {button}
                {songList}
            </div>
        )

    }
}

export default SongsContainer;
