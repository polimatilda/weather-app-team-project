import React from 'react'

function SearchBar({ setSearch, cities, search, setButtonClick}) {

  return (

    <div className="search-div">
      <div className="search-bar">
        
        <input list="city-search" placeholder='Search for a city' type="text" onChange={(event) => {
          setSearch(event.target.value)
        }} />
        
        <datalist id="city-search">
          {cities.map((city, index) => <option key={index} value={city.name}>{city.name}</option>)}
        </datalist>
        <button onClick={() => {
        setButtonClick((oldValue) => oldValue + 1)
      }}><img className="search-icon" src="images/search.svg" alt="search" /></button>
      </div>
      <div className="city-name">{search}</div>
    </div>
  )
}

export default SearchBar