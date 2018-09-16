import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import marked from 'marked';

import api from 'api';

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'PROFILE_PAGE_LOADED', payload }),
  onUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' }),
  onSetPage: (page, payload) => dispatch({ type: 'SET_PAGE', page, payload }),
});

const workProgression = () => (
  <div className="sub header">
    <div className="ui large breadcrumb">
      <div className="section">Process Engineer</div>
      <i className="right chevron icon divider" />
      <div className="section">Finance Manager</div>
      <i className="right chevron icon divider" />
      <div className="active section">Web Developer</div>
    </div>
  </div>
);

const quoteBlocks = () => (
  <div className="pv4-5 ph4-5 w5 br-100 tc bg-black">
    <h3 className="ui header">
      <div className="white">If you're going to</div>
      <div className="white">have a story,</div>
      <div className="white">have a big story,</div>
      <div className="white">or none at all.</div>
    </h3>
    <div className="sub header white">- J. Campbell</div>
  </div>
);

const EditProfileSettings = ({ isUser }) =>
  isUser ? (
    <button className="ui primary basic small button">
      <Link to="/about/edit">
        <i className="edit outline icon" />
        Edit Profile Settings
      </Link>
    </button>
  ) : null;

class About extends Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([api.Profile.get('chrisongg')]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { profile, currentUser } = this.props;
    const isUser = currentUser && profile.username === currentUser.username;
    const markup = profile.bio ? { __html: marked(profile.bio) } : null;
    const noBio = markup ? null : <div>My story is coming...</div>;

    return (
      <div>
        <div className="mb5">
          <h1 className="ui header">
            <div className="mb3">I'm Chris. Your problem solver.</div>
          </h1>
          <div className="ui grid">
            <div className="ui two column row">
              <div className="left floated column">{workProgression()}</div>
              <div className="right floated right aligned column">
                <EditProfileSettings isUser={isUser} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="mr4 mb4">{quoteBlocks()}</div>
          <div>
            <div dangerouslySetInnerHTML={markup} />
            {noBio}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
