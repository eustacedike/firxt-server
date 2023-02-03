


import { Link } from 'react-router-dom';

import './home.css';

function Hero() {


    const linkStyle = {
        textDecoration: "none",
        color: "unset"
      }


  return (
    
      <div className="hero">

<div className="hero1">
        <h1>
            Share your thoughts Firxt!
        </h1>
        <p>
            Post news, blogs, stories, ideas... There are absolutely no limits to what you can share, on <b style={{color: "#4A0404", fontFamily: "'Prosto One', cursive"}}>Firxt</b>
        </p>

        
        <Link style={linkStyle} to="/write"><button> Write a Blog</button></Link>
        </div>
      </div>
    
  );
}

export default Hero;
