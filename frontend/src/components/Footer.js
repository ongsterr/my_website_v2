import React from 'react';

import LinkedinIcon from 'assets/icons/LinkedinIcon';
import GithubIcon from 'assets/icons/GithubIcon';
import GoogleIcon from 'assets/icons/GoogleIcon';
import FacebookIcon from 'assets/icons/FacebookIcon';

const Footer = () => {
  return (
    <footer className="flex flex-column bt b--mycolor bg-mycolor-10 h4">
      <div className="flex justify-center pt4">
        <a
          href="https://www.linkedin.com/in/chrisongg/"
          target="_blank"
          rel="noopener noreferrer">
          <LinkedinIcon />
        </a>
        <a
          href="https://github.com/ongsterr"
          target="_blank"
          rel="noopener noreferrer">
          <GithubIcon />
        </a>
        <a
          href="mailto:ong.chris11@gmail.com"
          target="_blank"
          rel="noopener noreferrer">
          <GoogleIcon />
        </a>
        <a
          href="https://www.facebook.com/christopher.ong.501"
          target="_blank"
          rel="noopener noreferrer">
          <FacebookIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
