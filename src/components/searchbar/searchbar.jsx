import React from 'react';

const SearchBar = ({ searchQuery, handleSearch, placeholder }) => {
    return (
        <input
            type="text"
            className="p-2 border border-gray-300 rounded w-[70vw] mb-4 mx-7 my-1"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearch}
        />
    );
};

export default SearchBar;