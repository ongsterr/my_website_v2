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
    <div>
      <button className="ui primary basic small button">
        <Link to={`/editor/${article.slug}`} className="">
          <i className="edit icon" />
          Edit Article
        </Link>
      </button>
      <button className="ui negative basic small button" onClick={del}>
        <i className="trash alternate icon" />
        Delete Article
      </button>
    </div>
  ) : (
    <span />
  );
};

export default connect(mapDispatchToProps)(ArticleActions);
