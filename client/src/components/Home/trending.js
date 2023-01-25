

import { Link } from 'react-router-dom';


import './home.css';

import { FaChevronRight, FaBolt, FaClock, FaCalendarAlt, FaExclamationCircle, FaBook, FaThumbsUp, FaThumbsDown, FaBookmark } from 'react-icons/fa';
import {ImFire} from 'react-icons/im';


import dp from "./assets/bg17.png"


function Trending() {


  const posts = [
    { id: 1, title: "Metalogy X Global Ambassador Program", category: "Tech", author: "Eustace Dike", authordp: dp, date: "Jan 01, 2023", read: 5, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
    { id: 2, title: "Why you should care about p2p social", category: "Finance", author: "Uri Valeski", authordp: dp, date: "Dec 04, 2022", read: 10, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
    { id: 3, title: "Top ten best meals for breakfast", category: "Food", author: "Salt Bae", authordp: dp, date: "Sep 02, 2021", read: 2, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },


  ]

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
              <Link onClick={takeUp} to="/blog" style={linkStyle}>
          <h3>{eachPost.title}</h3> <br />
          <p>
            <FaBook /> {eachPost.post.substring(0,200)}...</p>

          <div className="post-details">
            <div className="author">
              <img src={eachPost.authordp} alt="eustace" />
              <h4>{eachPost.author}</h4>
            </div>

            <h5><FaCalendarAlt/> {eachPost.date}</h5>
            <h5><FaClock/> {eachPost.read} min read</h5>
          </div>

            <div className="cat-act">
              <button>{eachPost.category}</button>
          <div className="post-actions">
            <p><FaThumbsUp /></p>
            <p><FaThumbsDown /></p>
            <p><FaBookmark /></p>
            <p><FaExclamationCircle /></p>
          </div>
          </div>
          </Link>
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
