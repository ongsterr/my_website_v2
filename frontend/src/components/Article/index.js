import React, { Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';

import ArticleActions from './ArticleActions';
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
    const { onLoad, match } = this.props;
    onLoad(Promise.all([api.Articles.get(match.params.id)]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { article, currentUser } = this.props;
    if (!article) {
      return null;
    }

    const markup = { __html: marked(article.body) }; // What is this doing? "Marked" parse markdown to HTML.
    const canModify = currentUser && currentUser.username;

    const tags = article.tagList.map(tag => (
      <div className="ui label" key={tag}>
        {tag}
      </div>
    ));

    return (
      <div className="ui basic segment">
        <h1 className="ui header">{article.title}</h1>
        <p className="ui grid">
          <div className="three column row">
            <div className="left floated column">
              {new Date(article.createdAt).toDateString()}
            </div>
            <div className="right floated right aligned column">
              <ArticleActions canModify={canModify} article={article} />
            </div>
          </div>
        </p>
        <div className="ui basic segment">
          <div dangerouslySetInnerHTML={markup} />
        </div>
        <div className="ui horizontal divider">End of Post</div>
        <div>{tags}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
