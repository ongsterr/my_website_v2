import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = ({ currentUser }) =>
  !currentUser ? (
    <div className="right menu">
      <Link to="/articles" className="ui item">
        Thoughts
      </Link>
      <Link to="/contact" className="ui item">
        Connect
      </Link>
      <Link to="/login" className="ui item">
        Sign in
      </Link>
    </div>
  ) : null;

const LoggedInView = ({ currentUser }) =>
  currentUser ? (
    <div className="right menu">
      <Link to="/articles" className="ui item">
        Thoughts
      </Link>
      <Link to="/contact" className="ui item">
        Connect
      </Link>
      <Link to="/editor" className="ui item">
        New Post
      </Link>
    </div>
  ) : null;

const Header = ({ appName, currentUser }) => (
  <nav className="ui large secondary menu">
    <Link to="/" className="item">
      {appName}
    </Link>

    <LoggedOutView currentUser={currentUser} />
    <LoggedInView currentUser={currentUser} />
  </nav>
);

export default Header;
