

import { Link } from 'react-router-dom';

import { FaBolt } from 'react-icons/fa';

import '../layout.css';



function Footer() {
  return (
    <div className="Footer">
        <h2 className='logo'><FaBolt />Firxt</h2>
      
      <p>&copy;<a style={{color: "white"}} href='https://eustacedike.github.io/eustaced/'>Eustace Dike</a></p>
      <p></p>
    </div>
  );
}

export default Footer;
