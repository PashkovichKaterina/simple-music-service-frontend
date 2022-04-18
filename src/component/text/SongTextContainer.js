import React from "react"
import "../../style/SongPlayer.css"
import BackendAPI from "../../service/BackendAPI"


class SongTextContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            successRecognition: false,
            badRequest: false
        }
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
                .then(json => this.setState({song: json}))

            BackendAPI.recognizedSpeech(songId)
                .then(response => {
                    if (response.status === 202) {
                        return response.json()
                    }
                    window.location.assign("/not_founds")
                })
                .then(json => this.setState({resultUrl: json.result_url},
                    () => this.setState({timer: setInterval(() => this.checkRecognizedResult(), 5000)})))
        }
    }

    checkRecognizedResult() {
        const {resultUrl} = this.state
        BackendAPI.checkRecognizedResult(resultUrl)
            .then(response => {
                if (response.status === 200) {
                    this.setState({successRecognition: true})
                    clearInterval(this.state.timer)
                    return response.json()
                }
                if (response.status === 400) {
                    this.setState({badRequest: true})
                    clearInterval(this.state.timer)
                    return response.json()
                }
            })
            .then(json => {
                if (this.state.successRecognition) {
                    this.setState({text: json.text})
                } else if (this.state.badRequest) {
                    this.setState({text: json.detail})
                }
            })
    }

    render() {
        const {song, text} = this.state
        const songElement = song ?
            <div>
                <h2>{song.title} - {song.artist.map((a) => a.name).join(", ")}</h2>
                <audio src={song.location}
                       controls={true}
                       className="player-component"/>
            </div> : ""
        const message = text ? text : "Speech recognition in progress"
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
