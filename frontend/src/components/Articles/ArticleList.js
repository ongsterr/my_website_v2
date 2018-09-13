import React from 'react';
import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';

const ArticleList = ({ articles, articlesCount, currentPage, onSetPage }) => {
  if (!articles) {
    return <div className="">Loading...</div>;
  }

  if (articles.length === 0) {
    return <div className="">No articles are here... yet.</div>;
  }

  const articlesFeed = articles.map(article => (
    <ArticlePreview article={article} key={article.slug} />
  ));

  return (
    <div>
      {articlesFeed}
      <ListPagination
        articlesCount={articlesCount}
        currentPage={currentPage}
        onSetPage={onSetPage}
      />
    </div>
  );
};

export default ArticleList;
