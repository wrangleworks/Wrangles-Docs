import React, {useMemo, useRef, useState, useId} from 'react';
import {useHistory} from '@docusaurus/router';
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';
import {usePluginData} from '@docusaurus/useGlobalData';

import {getSearchItems, searchItemsForQuery} from './search.cjs';

export default function SearchBar() {
  const history = useHistory();
  const searchRef = useRef(null);
  const docsData = useAllDocsData();
  const descriptions = usePluginData('search-descriptions');
  const resultsId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const searchItems = useMemo(() => getSearchItems(docsData, descriptions), [docsData, descriptions]);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => searchItemsForQuery(searchItems, query), [query, searchItems]);

  function navigateTo(path) {
    setQuery('');
    setIsOpen(false);
    history.push(path);
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      setIsOpen(false);
      event.currentTarget.blur();
      return;
    }

    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && results.length) {
      event.preventDefault();
      setIsOpen(true);
      const next = (activeIndex + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length;
      setActiveIndex(next);
      document.getElementById(`${resultsId}-${next}`)?.scrollIntoView({block: 'nearest'});
      return;
    }
    if (event.key === 'Enter' && isOpen && results[activeIndex]) {
      event.preventDefault();
      navigateTo(results[activeIndex].path);
    }
  }

  return (
    <div className="navbar__search ww-search" ref={searchRef}>
      <input
        type="search"
        placeholder="Search"
        aria-label="Search documentation"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen && Boolean(query.trim())}
        aria-activedescendant={isOpen && results[activeIndex] ? `${resultsId}-${activeIndex}` : undefined}
        aria-controls={resultsId}
        className="navbar__search-input"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          window.setTimeout(() => {
            if (!searchRef.current?.contains(document.activeElement)) {
              setIsOpen(false);
            }
          }, 0);
        }}
        onKeyDown={handleKeyDown}
      />
      {isOpen && query.trim() && (
        <div className="ww-search__results" id={resultsId} role="listbox">
          {results.length > 0 ? (
            results.map((result, index) => (
              <button
                type="button"
                className="ww-search__result"
                key={result.id}
                role="option"
                id={`${resultsId}-${index}`}
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => navigateTo(result.path)}>
                <span className="ww-search__result-title">{result.title}</span>
                {result.description && <span className="ww-search__result-description">{result.description}</span>}
              </button>
            ))
          ) : (
            <div className="ww-search__empty">No results</div>
          )}
        </div>
      )}
    </div>
  );
}
