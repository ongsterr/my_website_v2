import React from 'react';
import { Link } from 'react-router-dom';

const ArticlePreview = ({ article }) => {
  const tags = article.tagList.map(tag => {
    return (
      <a className="ui label" key={tag}>
        {tag}
      </a>
    );
  });

  return (
    <div className="item">
      <div className="content">
        <Link to={`article/${article.slug}`} className="header">
          {article.title}
        </Link>
        <div className="meta">
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
        <div className="description">
          <p>{article.description}</p>
        </div>
        <div />
        <div className="extra">Read more...</div>
        <div className="extra">
          <div className="ui right floated">{tags}</div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
