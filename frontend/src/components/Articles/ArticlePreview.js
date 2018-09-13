import React from 'react';
import { Link } from 'react-router-dom';

const ArticlePreview = ({ article }) => {
  const tags = article.tagList.map(tag => {
    return (
      <li className="" key={tag}>
        {tag}
      </li>
    );
  });

  return (
    <div className="">
      <div className="">
        <div className="info">
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
      </div>

      <Link to={`article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">{tags}</ul>
      </Link>
    </div>
  );
};

export default ArticlePreview;
