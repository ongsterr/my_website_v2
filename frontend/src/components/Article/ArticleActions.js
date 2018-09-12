import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Articles } from 'api';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch({ type: 'DELETE_ARTICLE', payload }),
});

const ArticleActions = ({ article, onClickDelete, canModify }) => {
  const del = () => {
    onClickDelete(Articles.del(article.slug));
  };

  return canModify ? (
    <span>
      <Link to={`/editor/${article.slug}`} className="">
        <i className="" />
        Edit Article
      </Link>
      <button className="" onClick={del}>
        <i className="" />
        Delete Article
      </button>
    </span>
  ) : (
    <span />
  );
};

export default connect(mapDispatchToProps)(ArticleActions);
