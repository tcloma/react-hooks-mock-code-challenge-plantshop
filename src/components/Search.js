import React from "react";

function Search({ searchTerm, setSearchTerm }) {

  const handleSearch = (e) => {
    setSearchTerm(searchTerm => searchTerm = e.target.value)
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
