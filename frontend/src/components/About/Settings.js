import React, { Component } from 'react';
import { connect } from 'react-redux';

import api from 'api';
import ListErrors from 'components/ListErrors';

const mapStateToProps = state => {
  return {
    ...state.settings,
    currentUser: state.common.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClickLogout: () => dispatch({ type: 'LOGOUT' }),
    onSubmitForm: user =>
      dispatch({ type: 'SETTINGS_SAVED', payload: api.Auth.save(user) }),
  };
};

class SettingsForm extends Component {
  state = {
    image: this.props.currentUser.image || '',
    username: this.props.currentUser.username,
    bio: this.props.currentUser.bio || '',
    email: this.props.currentUser.email,
    password: '',
  };

  componentDidMount() {
    const { currentUser } = this.props;
    if (currentUser) {
      const currentState = Object.assign(this.state, {
        image: currentUser.image || '',
        username: currentUser.username,
        bio: currentUser.bio || '',
        email: currentUser.email,
      });
      this.setState(currentState);
    }
  }

  updateState = ev => {
    const target = ev.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  submitForm = ev => {
    ev.preventDefault();
    const { image, username, bio, email, password } = this.state;
    let user = {
      image,
      username,
      bio,
      email,
      password,
    };
    if (!password) {
      user = {
        image,
        username,
        bio,
        email,
      };
    }
    this.props.onSubmitForm(user);
  };

  render() {
    return (
      <form className="ui form" onSubmit={this.submitForm}>
        <div className="field">
          <label>Profile Picture</label>
          <input
            type="text"
            placeholder="URL of profile picture"
            name="image"
            value={this.state.image}
            onChange={this.updateState}
          />
        </div>

        <div className="field">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.updateState}
          />
        </div>

        <div className="field">
          <label>About Me</label>
          <textarea
            rows="20"
            placeholder="Short bio about you"
            name="bio"
            value={this.state.bio}
            onChange={this.updateState}
          />
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.updateState}
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="New password"
            name="password"
            value={this.state.password}
            onChange={this.updateState}
          />
        </div>

        <button
          className="ui submit button"
          type="submit"
          disabled={this.state.inProgress}>
          Update Settings
        </button>
      </form>
    );
  }
}

const Settings = ({ error, currentUser, onSubmitForm, onClickLogout }) => (
  <div className="">
    <h2 className="ui dividing header">My Settings</h2>
    <ListErrors errors={error} />
    <SettingsForm currentUser={currentUser} onSubmitForm={onSubmitForm} />

    <div className="ui horizontal divider">Or</div>

    <button className="ui negative basic button" onClick={onClickLogout}>
      Click here to logout.
    </button>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
