import React from 'react';
import { Link } from 'react-router-dom';
import ArticleActions from './ArticleActions';

const ArticleMeta = ({ article, canModify }) => (
  <div className="">
    <div className="info">
      <Link to={`@${article.author.username}`} className="author">
        {article.author.username}
      </Link>
      <span className="date">{new Date(article.createdAt).toDateString()}</span>
    </div>

    <ArticleActions canModify={canModify} article={article} />
  </div>
);

export default ArticleMeta;
