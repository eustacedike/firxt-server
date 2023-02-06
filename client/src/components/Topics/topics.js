


import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import './topics.css';

import categories from "../categories.json";



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




const TopicImages = [motorPic, phonePic, moviePic, musicPic, bookPic, sportPic, financePic, techPic,  foodPic, cryptoPic, celebPic, fashionPic, petPic, forexPic, naturePic, lovePic, healthPic, kidPic]

function Topics() {

  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['user']);


  const findThem = (a) => {
    
      setCookie('searchitem', a, { path: '/' })

      navigate(`/search`)

      setTimeout(() => { window.location.reload() }, 200);
    
  }

    const linkStyle = {
        textDecoration: "none",
      }

      const takeUp = () => {
        window.scroll(0,0)
      }
    

     const sorted = Object.keys(categories.cats)
    .sort()
    .reduce(function (acc, key) { 
        acc[key] = categories.cats[key];
        return acc;
    }, {});

    
  return (
    <div className="Topics">
   <div className='topic-hero'>
        <h1>HOT TOPICS</h1>
        {/* <img src={hot}/> */}
      </div>
      
<div className='big-tops'>
      <div className='tops'>

      
      {
      Object.keys(sorted).map(key =>
          <Link
          className='topic'
          onClick={takeUp}
          to={`/blog/${sorted[key].name}`}
          style={linkStyle}>
            <img src={TopicImages[sorted[key].id-1]}/>
            <p>{sorted[key].name}</p>
          </Link>
        )
    }
    </div>

    <div className='tops-2'>

    <h2>Popular Hashtags</h2>

    {categories.tags.map(tag => {
          return (
            <button onClick={()=>{findThem(tag)}} > #{tag} </button>
          )
        })}
    </div>
    </div>
    </div>
  );
}

export default Topics;
