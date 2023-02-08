

import { useState, useRef } from 'react';


import './home.css';

import Hero from './hero';
import Latest from './latest';
import Trending from './trending';
import Explore from './explore';
import Alert from '../CustomAlert/alert';

function Home() {


  const [xplore, setXplore] = useState(false);
  
  


 window.onscroll = () => {
    if (window.pageYOffset > 578) {
      setXplore(true)
    } else {
      setXplore(false)
    }
  }

  return (
    <div className="Home">
      <div id='alert'>
        <Alert/>
      </div>
      
      <div className="big-hero">
        <Hero/>
      </div>
      
      <div className="posts-section">
        <Latest/>
        
        <Trending />
        
        
        
      </div>
      <div className="xplore"
      style={{position: xplore? "fixed" : "", top: xplore? "28px" : ""}}
      >
          <Explore/>
        </div>
    </div>
  );
}

export default Home;
