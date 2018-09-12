import React, { Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';

import ArticleMeta from './ArticleMeta';
import api from 'api';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'ARTICLE_PAGE_LOADED', payload }),
  onUnload: () => dispatch({ type: 'ARTICLE_PAGE_UNLOADED' }),
});

class Article extends Component {
  componentWillMount() {
    const { onLoad, params } = this.props;
    onLoad(Promise.all([api.Articles.get(params.id)]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { article, currentUser } = this.props;
    const markup = { __html: marked(article.body) }; // What is this doing? "Marked" parse markdown to HTML.
    const canModify =
      currentUser && currentUser.username === article.author.username;

    if (!article) {
      return null;
    }

    const tags = article.tagList.map(tag => (
      <li className="" key={tag}>
        {tag}
      </li>
    ));

    return (
      <div className="">
        <div className="">
          <div className="">
            <h1>{article.title}</h1>
            <ArticleMeta article={article} canModify={canModify} />
          </div>
        </div>

        <div className="">
          <div className="">
            <div className="">
              <div dangerouslySetInnerHTML={markup} />
              <ul className="">{tags}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
