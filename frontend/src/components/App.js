import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Login from 'components/Login';
import Article from 'components/Article';
import ArticleList from 'components/Article/ArticleList';

import api from 'api';

const mapStateToProps = ({ common }) => ({
  appName: common.appName,
  currentUser: common.currentUser,
  redirectTo: common.redirectTo,
  appLoaded: common.appLoaded,
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: 'APP_LOAD', payload, token }),
  onRedirect: () => dispatch({ type: 'REDIRECT' }),
});

class App extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      api.setToken(token);
    }
    this.props.onLoad(token ? api.Auth.current() : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.history.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    const { appName, appLoaded, currentUser } = this.props;
    return appLoaded ? (
      <div>
        <Header appName={appName} currentUser={currentUser} />

        <Route path="/login" component={Login} />
        <Route path="/articles" component={ArticleList} />
        <Route path="/article/:id" component={Article} />
      </div>
    ) : (
      <div>
        <Header appName={appName} currentUser={currentUser} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
