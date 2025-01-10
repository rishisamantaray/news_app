// src/NewsList.js
import React from 'react';
import NewsCard from './NewsCard';

const NewsList = ({ news }) => {
  return (
    <div className="news-list">
      {news.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
