// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsList from './NewsList';
import './App.css';

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(""); // For search query

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          apiKey: '4bc54a32d811406181decae6eeaa2b4d', // Replace with your NewsAPI key
          page: page,
          pageSize: 5, // Set number of articles per page
          q: query, // For search query
        },
      });
      setNews(response.data.articles);
      setLoading(false);
    } catch (error) {
      setError("An error occurred while fetching news.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPage(1); // Reset to the first page on search
  };

  return (
    <div className="app">
      <h1 className="app-header">The News App</h1>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for news..." 
          value={query} 
          onChange={handleSearchChange} 
        />
      </div>

      {loading && <div className="spinner">Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && (
        <>
          <NewsList news={news} />
          <div className="pagination">
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={() => setPage(prev => prev + 1)} disabled={news.length < 5}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
