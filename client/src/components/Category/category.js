

import { useState, useRef } from 'react';



import './category.css';

import Latest from './latest';
import Explore from './explore';


import sportPic from "../Images/topics/messi.png";
import motorPic from "../Images/topics/orange.png";
import kidPic from "../Images/topics/baby.png";
import moviePic from "../Images/topics/movie.png";
import phonePic from "../Images/topics/ifone.png";
import celebPic from "../Images/topics/celeb.png";
import petPic from "../Images/topics/dogs.png";
import fashionPic from "../Images/topics/fashion.png";
import healthPic from "../Images/topics/fitness.png";
import foodPic from "../Images/topics/foodie.png";
import forexPic from "../Images/topics/forex.png";
import musicPic from "../Images/topics/headphones.png";
import lovePic from "../Images/topics/love.png";
import financePic from "../Images/topics/money2.png";
import naturePic from "../Images/topics/nature.png";
import techPic from "../Images/topics/tech.png";
import bookPic from "../Images/topics/books.png";
import cryptoPic from "../Images/topics/btc.png";


function Category(props) {


const TopicImages = [motorPic, phonePic, moviePic, musicPic, bookPic, sportPic, financePic, techPic,  foodPic, cryptoPic, celebPic, fashionPic, petPic, forexPic, naturePic, lovePic, healthPic, kidPic]


  const [xplore, setXplore] = useState(false);
  // const homee = useRef();


  window.onscroll = () => {
    if (window.pageYOffset > 252) {
      setXplore(true)
    } else {
      setXplore(false)
    }
  }


  return (
    <div className="Categx">
      <div className="big-hero">
        <div className="hero"
        style={{background: `url(${TopicImages[props.id-1]})`}}
        >

          <div className="hero1">
            <h1>
              {props.desc}
            </h1>
            <p>
              {props.sub}
            </p>


          </div>
        </div>
      </div>

      <div className="posts-section">
        <Latest thisCategory={props.desc}/>

    



      </div>
      <div className="xplore"
        style={{ position: xplore ? "fixed" : "", top: xplore ? "40px" : "" }}
      >
        <Explore allUsers={props.allUsers} allPosts={props.allPosts}/>
      </div>
    </div>
  );
}

export default Category;
