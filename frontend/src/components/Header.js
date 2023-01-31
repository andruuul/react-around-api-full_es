import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logoPath from '../images/logo.svg';

function Header({ linkTo, linkDescription, onLogout, email }) {
  const token = localStorage.getItem('token')
  const currentUser = React.useContext(CurrentUserContext);

  return (
  <>
    <header className='header'>
      <img className='header__logo' src={logoPath} alt='Around the U.S.' />
      <p className='header__email'>{token ? currentUser.email : ''}</p>
      {token ? (
        <Link to={linkTo} className='header__link' onClick={onLogout}>
          Log out
        </Link> 
      ) : ( 
        <a href={linkTo} className='header__link'>{linkDescription}</a>        
      )
      }    
    </header>
  </>
  );
}
  
export default Header;
