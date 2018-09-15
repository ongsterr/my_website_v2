import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../api';
import ListErrors from './ListErrors';

const mapStateToProps = state => {
  return {
    ...state.editor,
  };
};

/*
 * `mapDispatchToProps()` needs separate actions for adding/removing
 * tags, submitting an article, updating individual fields, and cleaning
 * up after navigating away from the page.
 */

const mapDispatchToProps = dispatch => ({
  onAddTag: () => dispatch({ type: 'ADD_TAG' }),
  onLoad: payload => dispatch({ type: 'EDITOR_PAGE_LOADED', payload }),
  onRemoveTag: tag => dispatch({ type: 'REMOVE_TAG', tag }),
  onSubmit: payload => dispatch({ type: 'ARTICLE_SUBMITTED', payload }),
  onUnload: payload => dispatch({ type: 'EDITOR_PAGE_UNLOADED' }),
  onUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_FIELD_EDITOR', key, value }),
});

class Editor extends Component {
  constructor(props) {
    super(props);
    const { onUpdateField, onAddTag, onRemoveTag } = this.props;

    const updateFieldEvent = key => ev => onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');

    // When entering tags, hitting enter adds a tag to the list
    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const {
        title,
        description,
        body,
        tagList,
        articleSlug,
        onSubmit,
      } = this.props;
      const article = {
        title,
        description,
        body,
        tagList,
      };
      const slug = { slug: articleSlug };
      const promise = articleSlug
        ? api.Articles.update(Object.assign(article, slug))
        : api.Articles.create(article);

      onSubmit(promise);
    };
  }

  /**
   * React-router has an interesting quirk: if two routes have the
   * same component, react-router will reuse the component when
   * switching between the two. So if '/editor' and '/editor/slug'
   * both use the 'Editor' component, react-router won't recreate
   * the Editor component if you navigate to '/editor' from '/editor/slug'.
   * To work around this, we need the `componentWillReceiveProps()` hook.
   */

  componentWillReceiveProps(nextProps) {
    const { match, onUnload, onLoad } = this.props;

    if (match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        onUnload();
        return onLoad(api.Articles.get(match.params.slug));
      }
      onLoad(null);
    }
  }

  componentWillMount() {
    const { match, onLoad } = this.props;
    if (match.params.slug) onLoad(api.Articles.get(match.params.slug));
    onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const {
      errors,
      title,
      description,
      body,
      tagInput,
      inProgress,
    } = this.props;

    const tagList = (this.props.tagList || []).map(tag => (
      <span key={tag} className="ui label">
        <i className="ion-close-round" onClick={this.removeTagHandler(tag)} />
        {tag}
      </span>
    ));

    return (
      <form className="ui form error">
        <ListErrors errors={errors} />
        <div className="field">
          <label>Article Title</label>
          <input
            type="text"
            placeholder="Article Title"
            value={title}
            onChange={this.changeTitle}
          />
        </div>

        <div className="field">
          <label>Article Description</label>
          <input
            type="text"
            placeholder="What's this article about?"
            value={description}
            onChange={this.changeDescription}
          />
        </div>

        <div className="field">
          <textarea
            rows="20"
            placeholder="Write your article (in markdown)"
            value={body}
            onChange={this.changeBody}
          />
        </div>

        <div className="field">
          <label>Tags</label>
          <input
            type="text"
            placeholder="Enter tags"
            value={tagInput}
            onChange={this.changeTagInput}
            onKeyUp={this.watchForEnter}
          />
        </div>
        <p>{tagList}</p>

        <button
          className="ui submit button"
          type="button"
          disabled={inProgress}
          onClick={this.submitForm}>
          Publish Article
        </button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
