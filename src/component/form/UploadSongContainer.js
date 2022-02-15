import React from "react";
import "../../style/SignForm.css"
import Select from "react-select";
import BackendAPI from "../../service/BackendAPI";

class UploadSongContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            releaseDate: "",
            song: "",
            artist: [],
            errorList: [],
            artistList: [],
        };
        this.fileInput = React.createRef();
    }

    componentDidMount() {
        console.log("fdgf")
        BackendAPI.getAllArtist()
            .then(response => response.json())
            .then(json => {
                this.setState({artistList: json});
                console.log("kij", json)
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
        selectedOption.map(option => newArtist.push({name: option.value}))
        this.setState({artist: newArtist})
    }

    handleSubmitSignupForm = (event) => {
        event.preventDefault()
        const {title, releaseDate, artist} = this.state

        const data = new FormData()
        data.set("title", title)
        data.set("year", releaseDate)
        data.set("location", this.fileInput.current.files[0])
        data.set("artist", artist)

        BackendAPI.saveSong(data)
    }

    render() {
        const options = []
        const {errorList, artistList} = this.state;
        artistList.map(artist => options.push({value: artist.name, label: artist.name}))
        const errorMessage = errorList.map((error) => <p>{error}</p>);
        return (
            <div className="auth-form">
                <form onSubmit={this.handleSubmitSignupForm}>
                    <h1>Upload song</h1>

                    <div className="input-element">
                        <label htmlFor="title"><b>Title</b></label>
                        <input type="text" placeholder="Enter song title" name="title"
                               onChange={this.handleChangeInputField}/>
                    </div>

                    <div className="input-element">
                        <label htmlFor="releaseDate"><b>Release date</b></label>
                        <input type="date" name="releaseDate"
                               onChange={this.handleChangeInputField}/>
                    </div>

                    <div className="input-element">
                        <label htmlFor="title"><b>Artist</b></label>
                        <Select options={options} isMulti="true"
                                onChange={this.handleSelectChange}/>
                    </div>

                    <div className="input-element">
                        <label htmlFor="location"><b>Song</b></label>
                        <input type="file" name="song"
                               ref={this.fileInput}/>
                    </div>

                    <div className="error-message">{errorMessage}</div>

                    <button type="submit" className="submit">Upload</button>
                    <button type="button" className="cancel"
                            onClick={() => window.location.assign("/")}>
                        Cancel
                    </button>
                </form>
            </div>
        )
    }
}

export default UploadSongContainer;
