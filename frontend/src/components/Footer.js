import React from 'react';

const year = new Date().getFullYear()

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <p onClick={navigate} className="footer__copyright">&copy; {year}. Alrededor de los EEUU</p>
    </footer>
  );
}
  
export default Footer;