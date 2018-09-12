import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = ({ currentUser }) =>
  !currentUser ? (
    <ul className="">
      <li className="">
        <Link to="/" className="">
          Home
        </Link>
      </li>

      <li className="">
        <Link to="login" className="">
          Sign in
        </Link>
      </li>
    </ul>
  ) : null;

const LoggedInView = ({ currentUser }) =>
  currentUser ? (
    <ul className="">
      <li className="">
        <Link to="" className="">
          Home
        </Link>
      </li>

      <li className="">
        <Link to="editor" className="">
          <i className="" />
          &nbsp;New Post
        </Link>
      </li>

      <li className="">
        <Link to={`@${currentUser.username}`} className="">
          <img src={currentUser.image} className="" alt="user" />
          {currentUser.username}
        </Link>
      </li>
    </ul>
  ) : null;

const Header = ({ appName, currentUser }) => (
  <nav className="">
    <div className="">
      <Link to="/" className="">
        {appName}
      </Link>

      <LoggedOutView currentUser={currentUser} />
      <LoggedInView currentUser={currentUser} />
    </div>
  </nav>
);

export default Header;
