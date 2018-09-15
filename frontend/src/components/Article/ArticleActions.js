import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import api from 'api';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch({ type: 'DELETE_ARTICLE', payload }),
});

const ArticleActions = ({ article, onClickDelete, canModify }) => {
  const del = () => {
    onClickDelete(api.Articles.del(article.slug));
  };

  return canModify ? (
    <span>
      <button className="ui primary basic small button">
        <Link to={`/editor/${article.slug}`} className="">
          <i className="edit outline icon" />
          Edit Article
        </Link>
      </button>
      <button className="ui negative basic small button" onClick={del}>
        <i className="trash alternate outline icon" />
        Delete Article
      </button>
    </span>
  ) : (
    <span />
  );
};

export default connect(mapDispatchToProps)(ArticleActions);
