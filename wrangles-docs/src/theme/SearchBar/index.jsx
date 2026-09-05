import React, {useMemo, useRef, useState} from 'react';
import {useHistory} from '@docusaurus/router';
import {useDocsData} from '@docusaurus/plugin-content-docs/client';

const MAX_RESULTS = 8;

function normalize(value) {
  return String(value || '').toLowerCase();
}

function titleFromId(id) {
  const lastSegment = String(id || '').split('/').filter(Boolean).pop() || 'Home';

  return lastSegment
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getSearchItems(docsData) {
  const currentVersion = docsData?.versions?.find((version) => version.isLast) || docsData?.versions?.[0];

  return (currentVersion?.docs || [])
    .map((docRoute) => {
      return {
        id: docRoute.id,
        title: titleFromId(docRoute.id),
        path: docRoute.path,
        haystack: normalize(`${titleFromId(docRoute.id)} ${docRoute.id} ${docRoute.path}`),
      };
    })
    .filter(Boolean);
}

export default function SearchBar() {
  const history = useHistory();
  const searchRef = useRef(null);
  const docsData = useDocsData();
  const searchItems = useMemo(() => getSearchItems(docsData), [docsData]);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    const normalizedQuery = normalize(query).trim();

    if (!normalizedQuery) {
      return [];
    }

    const terms = normalizedQuery.split(/\s+/);

    return searchItems
      .map((item) => {
        if (!terms.every((term) => item.haystack.includes(term))) {
          return null;
        }

        const title = normalize(item.title);
        const id = normalize(item.id);
        const score =
          (title === normalizedQuery ? 30 : 0) +
          (title.startsWith(normalizedQuery) ? 20 : 0) +
          (title.includes(normalizedQuery) ? 10 : 0) +
          (id.includes(normalizedQuery) ? 5 : 0);

        return {...item, score};
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, MAX_RESULTS);
  }, [query, searchItems]);

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

    if (event.key === 'Enter' && results[0]) {
      event.preventDefault();
      navigateTo(results[0].path);
    }
  }

  return (
    <div className="navbar__search ww-search" ref={searchRef}>
      <input
        type="search"
        placeholder="Search"
        aria-label="Search documentation"
        aria-expanded={isOpen}
        aria-controls="ww-search-results"
        className="navbar__search-input"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
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
        <div className="ww-search__results" id="ww-search-results" role="listbox">
          {results.length > 0 ? (
            results.map((result) => (
              <button
                type="button"
                className="ww-search__result"
                key={result.id}
                role="option"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => navigateTo(result.path)}>
                <span className="ww-search__result-title">{result.title}</span>
                <span className="ww-search__result-path">{result.path}</span>
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
