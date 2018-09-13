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
      <span key={tag} className="tag-default tag-pill">
        <i className="ion-close-round" onClick={this.removeTagHandler(tag)} />
        {tag}
      </span>
    ));

    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListErrors errors={errors} />

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      value={title}
                      onChange={this.changeTitle}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="What's this article about?"
                      value={description}
                      onChange={this.changeDescription}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows="10"
                      placeholder="Write your article (in markdown)"
                      value={body}
                      onChange={this.changeBody}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter tags"
                      value={tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter}
                    />

                    <div className="tag-list">{tagList}</div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={inProgress}
                    onClick={this.submitForm}>
                    Publish Article
                  </button>
                </fieldset>
              </form>
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
)(Editor);
