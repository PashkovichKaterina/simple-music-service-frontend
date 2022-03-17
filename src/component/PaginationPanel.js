import React from "react"
import ReactPaginate from "react-paginate"

const PaginationPanel = (props) => {
    const {options, elementsCount, pageSize, handleChangePage, handleChangePageSize} = props
    const pageCount = Math.ceil(elementsCount / pageSize)
    const optionsList = options.map(option => <option key={option}>{option}</option>)
    const pageSizeElement = pageCount > 0
        ? <select onChange={handleChangePageSize}>
            {optionsList}
        </select> : ""
    return (
        <div className="pagination">
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handleChangePage}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}/>
            {pageSizeElement}
        </div>
    )
}

export default PaginationPanel
