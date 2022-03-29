import React from "react"
import ReactPaginate from "react-paginate"

const PaginationPanel = (props) => {
    const {options, elementsCount, page, pageSize, handleChangePage, handleChangePageSize} = props
    const pageCount = Math.ceil(elementsCount / pageSize)
    const optionsList = options.map(option => <option key={option}>{option}</option>)
    const pageSizeElement = pageCount > 0
        ? <select onChange={handleChangePageSize}>
            {optionsList}
        </select> : ""
    const forcePage = page - 1 >= pageCount ? pageCount - 1 : page - 1
    return (
        <div className="pagination">
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handleChangePage}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                forcePage={forcePage}/>
            {pageSizeElement}
        </div>
    )
}

export default PaginationPanel
