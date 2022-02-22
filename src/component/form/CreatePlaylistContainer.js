import React from "react"
import "../../style/SignForm.css"
import Select from "react-select"
import BackendAPI from "../../service/BackendAPI"
import FormValidator from "../../service/FormValidator"

class CreatePlaylistContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            song: [],
            errorList: [],
            availableSongs: [],
            formValidator: true
        }
        this.fileInput = React.createRef()
    }

    componentDidMount() {
        BackendAPI.getAllSongs()
            .then(response => response.json())
            .then(json => {
                this.setState({availableSongs: json})
            })
    }

    handleChangeInputField = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSelectChange = (selectedOption) => {
        const newSong = []
        selectedOption.map(option => newSong.push(option.value))
        this.setState({song: newSong})
    }

    handleSubmitSignupForm = (event) => {
        event.preventDefault()
        const {title, song} = this.state
        if (FormValidator.isValidTitle(title)) {
            const playlist = {
                title: title,
                song: song
            }
            BackendAPI.savePlaylist(playlist)
                .then(response => {
                    this.setState({isSuccessCreated: response.ok})
                    return response.json()
                })
                .then(json => {
                    if (!this.state.isSuccessCreated) {
                        const errors = []
                        for (let key in json) {
                            errors.push(json[key])
                        }
                        this.setState({errorList: errors})
                    }
                })
        } else {
            this.setState({formValidator: false})
        }
    }

    render() {
        const {errorList, availableSongs, title, formValidator, isSuccessCreated} = this.state
        const errorMessage = errorList.map((error) => <p>{error}</p>)
        const songOptions = []
        availableSongs.map(song => songOptions.push({
            value: song,
            label: `${song.title} - ${song.artist.map((a) => a.name).join(", ")}`
        }))

        if (isSuccessCreated) {
            return (
                <div className="auth-form">
                    <h1>Successfully created</h1>
                    <p>
                        Click <a href="/playlists">here</a> to see all your playlists.
                    </p>
                </div>
            )
        } else {
            return (
                <div className="auth-form">
                    <form onSubmit={this.handleSubmitSignupForm}>
                        <h1>Create playlist</h1>

                        <div className="input-element">
                            <label htmlFor="title"><b>Title</b></label>
                            <input type="text" placeholder="Enter playlist title" name="title"
                                   onChange={this.handleChangeInputField}/>
                            <p className="error-data"
                               hidden={FormValidator.isValidTitle(title) || formValidator}>
                                Title field length must be from 1 to 50 characters
                            </p>
                        </div>

                        <div className="input-element">
                            <label><b>Song</b></label>
                            <Select options={songOptions} isMulti="true"
                                    onChange={this.handleSelectChange}/>
                        </div>

                        <div className="error-message">{errorMessage}</div>

                        <button type="submit" className="submit">Create</button>
                        <button type="button" className="cancel"
                                onClick={() => window.location.assign("/playlists")}>
                            Cancel
                        </button>
                    </form>
                </div>
            )
        }
    }
}

export default CreatePlaylistContainer
