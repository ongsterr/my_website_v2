import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListErrors from './ListErrors';
import api from 'api';

const mapStateToProps = state => ({
  ...state.auth,
});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: 'LOGIN', payload: api.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: 'LOGIN_PAGE_UNLOADED' }),
});

class Login extends Component {
  constructor(props) {
    super(props);
    const { onChangeEmail, onChangePassword, onSubmit } = this.props;

    this.changeEmail = event => onChangeEmail(event.target.value);
    this.changePassword = event => onChangePassword(event.target.value);
    this.submitForm = (email, password) => event => {
      event.preventDefault();
      onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { email, password, errors, inProgress } = this.props;
    return (
      <form
        onSubmit={this.submitForm(email, password)}
        className="ui form error">
        <ListErrors errors={errors} />
        <h3 className="ui header">Welcome back, Master Chris!</h3>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={this.changeEmail}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={this.changePassword}
          />
        </div>
        <button
          className="ui submit button"
          type="submit"
          disabled={inProgress}>
          Sign In
        </button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
