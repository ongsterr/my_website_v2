import React from 'react';
import { Link } from 'react-router-dom';

import ChrisIcon from 'assets/icons/ChrisIcon';

const LoggedOutView = ({ currentUser }) =>
  !currentUser ? (
    <div className="right menu">
      <Link to="/articles" className="item">
        Thoughts
      </Link>
      <Link to="/about" className="item">
        About
      </Link>
      <Link to="/login" className="item">
        Sign in
      </Link>
    </div>
  ) : null;

const LoggedInView = ({ currentUser }) =>
  currentUser ? (
    <div className="right menu">
      <Link to="/articles" className="item hover">
        Thoughts
      </Link>
      <Link to="/about" className="item">
        About
      </Link>
      <Link to="/editor" className="item">
        New Post
      </Link>
    </div>
  ) : null;

const Header = ({ appName, currentUser }) => (
  <nav className="ui large secondary menu" style={{ marginBottom: 0 }}>
    <Link to="/" className="">
      <ChrisIcon />
    </Link>

    <LoggedOutView currentUser={currentUser} />
    <LoggedInView currentUser={currentUser} />
  </nav>
);

export default Header;
