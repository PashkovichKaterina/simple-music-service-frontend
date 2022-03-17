import React from "react"

const SortingPanel = (props) => {
    const {options, handleSorting} = props
    const optionElement = Object.keys(options).map(key =>
        <option key={key} id={key} onClick={handleSorting}>
            {options[key]}
        </option>
    )
    return (
        <div className="sorting-panel">
            <select>
                {optionElement}
            </select>
        </div>
    )
}

export default SortingPanel
