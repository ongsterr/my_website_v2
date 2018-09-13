import React from 'react';
import { connect } from 'react-redux';
import ArticleList from './ArticleList';
import api from 'api';

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.common.token,
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({ type: 'CHANGE_TAB', tab, payload }),
});

const GlobalFeedTab = ({ onTabClick, tab }) => {
  const clickHandler = ev => {
    ev.preventDefault();
    onTabClick('all', api.Articles.all());
  };

  return (
    <li className="nav-item">
      <a
        href=""
        className={tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = ({ tag }) =>
  tag ? (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound" />
        {tag}
      </a>
    </li>
  ) : null;

const MainView = ({
  tag,
  tab,
  articles,
  articlesCount,
  currentPage,
  onSetPage,
  onTabClick,
}) => {
  const onSetPageHandler = page => onSetPage(page);
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <GlobalFeedTab tab={tab} onTabClick={onTabClick} />
          <TagFilterTab tag={tag} />
        </ul>
      </div>
      <ArticleList
        articles={articles}
        articlesCount={articlesCount}
        currentPage={currentPage}
        onSetPage={onSetPageHandler}
      />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
