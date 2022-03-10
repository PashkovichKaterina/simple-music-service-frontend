import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"

const SearchPanel = (props) => {
    const {handleSearch, handleChangeInputField} = props
    return (
        <div className="search-panel">
            <input type="text"
                   name="search"
                   placeholder="Search..."
                   onChange={handleChangeInputField}/>
            <button className="search-button" onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} className="icon"/>
            </button>
        </div>
    )
}

export default SearchPanel
