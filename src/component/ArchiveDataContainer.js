import React from "react"
import BackendAPI from "../service/BackendAPI"

class ArchiveDataContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isArchivingInProgress: false,
            fromDate: "",
            toDate: ""
        }
    }

    getArchiveData = () => {
        this.setState({isArchivingInProgress: true})
        const {fromDate, toDate} = this.state
        BackendAPI.getArchiveData(fromDate, toDate)
            .then(response => response.blob())
            .then(blob => {
                const href = window.URL.createObjectURL(new Blob([blob]))
                const link = document.createElement("a")
                link.href = href
                link.download = "data.zip"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                this.setState({isArchivingInProgress: false})
            })
    }

    handleChangeInputField = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const {isArchivingInProgress} = this.state
        const message = isArchivingInProgress ? <div className="archive-is-formed">archive is being formed</div> : ""
        return (
            <div>
                <div className="archive-header">Download archive with user data</div>
                <div className="archive-date">Choose date interval for getting event history:</div>
                <div className="archive-date-block">
                    <label htmlFor="fromDate"><b>From</b></label>
                    <input type="date" name="fromDate"
                           onChange={this.handleChangeInputField}/>
                </div>
                <div className="archive-date-block">
                    <label htmlFor="toDate"><b>To</b></label>
                    <input type="date" name="toDate"
                           onChange={this.handleChangeInputField}/>
                </div>
                <button onClick={this.getArchiveData}>Download archive</button>
                {message}
            </div>
        )
    }
}

export default ArchiveDataContainer
