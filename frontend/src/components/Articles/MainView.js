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
    <div
      className={tab === 'all' ? 'item active' : 'item'}
      onClick={clickHandler}>
      All Posts
    </div>
  );
};

const TagFilterTab = ({ tag }) =>
  tag ? (
    <div className="item active">
      <i className="ion-pound" />
      {tag}
    </div>
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
    <div className="">
      <div className="ui pointing secondary menu">
        <GlobalFeedTab tab={tab} onTabClick={onTabClick} />
        <TagFilterTab tag={tag} />
      </div>
      <div
        className={
          articles
            ? 'ui bottom attached active tab segment'
            : 'ui bottom attached active tab segment loading'
        }
        style={{ border: 'none' }}>
        <ArticleList
          articles={articles}
          articlesCount={articlesCount}
          currentPage={currentPage}
          onSetPage={onSetPageHandler}
        />
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
