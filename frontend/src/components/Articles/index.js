import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainView from './MainView';
import api from 'api';
import Tags from './Tags';

const mapStateToProps = state => ({
  ...state.articleList,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, payload) =>
    dispatch({ type: 'APPLY_TAG_FILTER', tag, payload }),
  onLoad: (tab, payload) => dispatch({ type: 'ARTICLES_LOADED', tab, payload }),
  onUnload: () => dispatch({ type: 'ARTICLES_UNLOADED' }),
});

class Articles extends Component {
  componentWillMount() {
    const articlesPromise = api.Articles.all();
    this.props.onLoad('all', Promise.all([api.Tags.getAll(), articlesPromise]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { tags, onClickTag } = this.props;
    return (
      <div className="ui stackable grid">
        <div className="thirteen wide column">
          <MainView />
        </div>
        <div className="three wide column">
          <p>Popular Tags</p>
          <Tags tags={tags} onClickTag={onClickTag} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);
