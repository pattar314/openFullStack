import React from 'react'

const SearchArea = (props) => {
    return (
        <div>Show entries: <input onChange={props.handleSearchInput} /></div>
    )
}

export default SearchArea
