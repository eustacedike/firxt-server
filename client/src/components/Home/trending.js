

import { Link } from 'react-router-dom';


import { useState, useEffect } from 'react';

import axios from 'axios';


import './home.css';

import { FaChevronRight, FaBolt, FaClock, FaCalendarAlt, FaExclamationCircle, FaBook, FaThumbsUp, FaThumbsDown, FaBookmark } from 'react-icons/fa';
import {ImFire} from 'react-icons/im';


import dp from "./assets/bg17.png"


function Trending() {

  const months = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"]
  

const [posts, setPosts] = useState([]);

const getPosts = () => {
  axios.get("api/posts/fetchposts")
    .then((response) => {

      setPosts(response.data.reverse().slice(0,3));
    });

};


useEffect (()=>{
getPosts();
}, [posts]);


  const linkStyle = {
    textDecoration: "none",
    color: "unset"
  }

  const takeUp = () => {
    window.scroll(0,0)
  };

  return (
    <div className="Latest">
      <h1><ImFire /> TRENDING POSTS</h1>

      <div className="posts">


      {posts.map(eachPost => {
          return (
            <div className="post">
              
          <h3>{eachPost.title}</h3> <br />
          <Link onClick={takeUp} to={`/post/${eachPost.link}`} style={linkStyle}>
          <p>
            <FaBook /> {eachPost.postbody.substring(0,200)}...</p>
            </Link>
          <div className="post-details">
            <div className="author">
              <img src={dp} alt="" />
              <h4>{eachPost.author}</h4>
            </div>

            <h5><FaCalendarAlt/> 
            {` ${months[parseInt(eachPost.date.slice(5,7))-1]} ${eachPost.date.slice(8,10)}, ${eachPost.date.slice(0,4)}`

}
            </h5>
            <h5><FaClock/> {eachPost.readtime} min read</h5>
          </div>

            <div className="cat-act">
              <button>{eachPost.category}</button>
          <div className="post-actions">
            <p><FaThumbsUp /></p>
            <p><FaThumbsDown /></p>
            <p><FaBookmark /></p>
            {/* <p><FaExclamationCircle /></p> */}
          </div>
          </div>
          
        </div>
          )
        })}
      </div>

      <button className="more">
      <Link onClick={takeUp} to="/trending" style={linkStyle}>Trending Posts <FaChevronRight style={{verticalAlign: "-2.5px", marginLeft: "10px"}}/> </Link>
      </button>
    </div>
  );
}

export default Trending;
