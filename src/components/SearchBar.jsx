import React from 'react';

const SearchBar = ({ location, handleInputChange, handleKeyDown, search, cityName }) => {
  return (
    <div className="search">
      <div className="search-top">
        <i className="fa-solid fa-location-dot"></i>
        <div className="location">{cityName}</div>
      </div>
      <div className="search-location">
        <input
          type="text"
          placeholder="Enter Location..."
          value={location}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
      </div>
    </div>
  );
};

export default SearchBar;
