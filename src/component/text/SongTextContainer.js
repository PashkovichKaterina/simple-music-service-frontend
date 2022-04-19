import React from "react"
import "../../style/SongPlayer.css"
import BackendAPI from "../../service/BackendAPI"


class SongTextContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const {songId} = this.props
        if (songId) {
            BackendAPI.getSongById(songId)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    window.location.assign("/not_founds")
                })
                .then(json => this.setState({song: json}, () => this.getRecognizedSpeech()))
        }
    }

    getRecognizedSpeech() {
        const {song} = this.state
        if (!song.lyrics) {
            BackendAPI.recognizedSpeech(song.id)
                .then(response => {
                    if (response.status === 202) {
                        this.setState({interval: setInterval(() => this.checkRecognizedResult(), 5000)})
                    }
                })
        }
    }

    checkRecognizedResult() {
        const {songId} = this.props
        BackendAPI.getSongById(songId)
            .then(response => response.json())
            .then(json => {
                if (json.lyrics) {
                    this.setState({song: json})
                    clearInterval(this.state.interval)
                }
            })
    }

    render() {
        const {song} = this.state
        const songElement = song ?
            <div>
                <h2>{song.title} - {song.artist.map((a) => a.name).join(", ")}</h2>
                <audio src={song.location}
                       controls={true}
                       className="player-component"/>
            </div> : ""
        const message = song && song.lyrics
            ? song.lyrics.length > 0 ? song.lyrics : "Unable to recognize this speech"
            : "Speech recognition in progress"
        return (
            <div>
                {songElement}
                <p className="recognized-title">Recognized text:</p>
                <div className="recognized-text">
                    {message}
                </div>
            </div>
        )
    }
}

export default SongTextContainer
