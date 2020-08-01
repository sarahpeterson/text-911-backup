import React from 'react';
import './Footer.css';
import ReactIcon from '../../assets/imgs/logo.svg';

const Footer = () => (
  <footer>
    {/*}<p className="made-with">
      made with
      <img src={ReactIcon} alt="React" title="React"/>
      by <a href="https://calaca.github.io/" target="_blank" rel="noopener noreferrer">calaca</a>
    </p>*/}
    <div className="icons">
      Made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">accesSOS</a> a non-profit tech organization. <a href="https://accessos.io" title="accessos">text911</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
    </div>
  </footer>
);

export default Footer;
