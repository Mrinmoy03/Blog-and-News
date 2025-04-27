import React from "react";

const NewsHeader = ({ searchInput, setSearchInput, handleSearch }) => (
  <header className="news-header">
    <h1 className="logo">News & Blogs</h1>
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search News..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  </header>
);

export default NewsHeader;