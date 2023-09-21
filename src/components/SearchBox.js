import React from 'react';

function SearchBox({ onSearch }) {
  return (
    <div className="search-box">
      <input type="text" onChange={(e) => onSearch(e.target.value)} placeholder="Search Contacts..." />
    </div>
  );
}

export default SearchBox;
