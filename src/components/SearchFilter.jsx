import React from 'react';

function SearchFilter({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="search-filter">
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="filter-tabs">
        {['all', 'completed', 'pending'].map(
          (item) => (
            <button
              key={item}
              type="button"
              className={`filter-tab ${
                filter === item ? 'active' : ''
              }`}
              onClick={() => setFilter(item)}
            >
              {item.charAt(0).toUpperCase() +
                item.slice(1)}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default SearchFilter;