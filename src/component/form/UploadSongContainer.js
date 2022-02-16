import React from "react";
import "../../style/SignForm.css"
import Select from "react-select";
import BackendAPI from "../../service/BackendAPI";
import FormValidator from "../../service/FormValidator";

class UploadSongContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            releaseDate: "",
            artist: [],
            errorList: [],
            availableArtists: [],
            formValidator: true
        };
        this.fileInput = React.createRef();
    }

    componentDidMount() {
        BackendAPI.getAllArtist()
            .then(response => response.json())
            .then(json => {
                this.setState({availableArtists: json});
            })
    }

    handleChangeInputField = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSelectChange = (selectedOption) => {
        const newArtist = []
        selectedOption.map(option => newArtist.push(option.value))
        this.setState({artist: newArtist})
    }

    handleSubmitSignupForm = (event) => {
        event.preventDefault()
        const {title, releaseDate, artist} = this.state
        if (FormValidator.isValidUploadSongForm(title, artist, releaseDate, this.fileInput.current)) {
            const data = new FormData()
            data.set("title", title)
            data.set("year", releaseDate)
            data.set("location", this.fileInput.current.files[0])
            for (let i = 0; i < artist.length; i++) {
                data.set(`artist_list[${i}]`, artist[i])
            }

            BackendAPI.saveSong(data)
                .then(response => {
                    this.setState({isSuccessUpload: response.ok});
                    return response.json();
                })
                .then(json => {
                    if (!this.state.isSuccessUpload) {
                        const errors = []
                        for (let key in json) {
                            errors.push(json[key])
                        }
                        this.setState({errorList: errors});
                    }
                })
        } else {
            this.setState({formValidator: false})
        }
    }

    render() {
        const {errorList, availableArtists, title, formValidator, artist, releaseDate, isSuccessUpload} = this.state;

        const options = []
        availableArtists.map(artist => options.push({value: artist.name, label: artist.name}))

        const errorMessage = errorList.map((error) => <p>{error}</p>)
        if (isSuccessUpload) {
            return (
                <div className="auth-form">
                    <h1>Successful upload</h1>
                    <p>
                        Click <a href="/songs">here</a> to see all your songs.
                    </p>
                </div>
            )
        } else {
            return (
                <div className="auth-form">
                    <form onSubmit={this.handleSubmitSignupForm}>
                        <h1>Upload song</h1>

                        <div className="input-element">
                            <label htmlFor="title"><b>Title</b></label>
                            <input type="text" placeholder="Enter song title" name="title"
                                   onChange={this.handleChangeInputField}/>
                            <p className="error-data"
                               hidden={FormValidator.isValidTitle(title) || formValidator}>
                                Title field length must be from 1 to 50 characters
                            </p>
                        </div>

                        <div className="input-element">
                            <label htmlFor="releaseDate"><b>Release date</b></label>
                            <input type="date" name="releaseDate"
                                   onChange={this.handleChangeInputField}/>
                            <p className="error-data"
                               hidden={FormValidator.isValidDate(releaseDate) || formValidator}>
                                Invalid format for date field
                            </p>
                        </div>

                        <div className="input-element">
                            <label htmlFor="title"><b>Artist</b></label>
                            <Select options={options} isMulti="true"
                                    onChange={this.handleSelectChange}/>
                            <p className="error-data"
                               hidden={FormValidator.isValidArtist(artist) || formValidator}>
                                You must select at least one artist
                            </p>
                        </div>

                        <div className="input-element">
                            <label htmlFor="location"><b>Song</b></label>
                            <input type="file" name="song"
                                   ref={this.fileInput}/>
                            <p className="error-data"
                               hidden={FormValidator.isValidSong(this.fileInput.current) || formValidator}>
                                The file extension must be "mp3" and the maximum file size is 100 MB
                            </p>
                        </div>

                        <div className="error-message">{errorMessage}</div>

                        <button type="submit" className="submit">Upload</button>
                        <button type="button" className="cancel"
                                onClick={() => window.location.assign("/songs")}>
                            Cancel
                        </button>
                    </form>
                </div>
            )
        }
    }
}

export default UploadSongContainer;
