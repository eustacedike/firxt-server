

import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

import axios from 'axios';


import './category.css';

import { FaExclamationCircle, FaChevronRight, FaClock, FaCalendarAlt, FaBook, FaThumbsUp, FaThumbsDown, FaBookmark } from 'react-icons/fa';



import dp from "../Images/topics/baby.png"


function Latest(props) {


  // const posts = [
  //   { id: 1, title: "Metalogy X Global Ambassador Program", category: "Tech", author: "Eustace Dike", authordp: dp, date: "Jan 01, 2023", read: 5, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
  //   { id: 2, title: "Why you should care about p2p social", category: "Finance", author: "Uri Valeski", authordp: dp, date: "Dec 04, 2022", read: 10, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
  //   { id: 3, title: "Top ten best meals for breakfast", category: "Food", author: "Salt Bae", authordp: dp, date: "Sep 02, 2021", read: 2, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },


  // ]

  
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("api/posts/fetchposts")
      .then((response) => {

        // setPosts(response.data.reverse());
        setPosts(response.data.filter(forThisCategory => {return forThisCategory.category === props.thisCategory}).reverse());
      });

  };


useEffect (()=>{
  getPosts();
}, [posts]);


const months = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"]


  const linkStyle = {
    textDecoration: "none",
    color: "unset"
  }

  const takeUp = () => {
    window.scroll(0,0)
  }

  return (
    <div className="Latest">

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
              <img src={eachPost.authordp} alt="" />
              <h4>{eachPost.author}</h4>
            </div>

            <h5><FaCalendarAlt/>  {` ${months[parseInt(eachPost.date.slice(5,7))-1]} ${eachPost.date.slice(8,10)}, ${eachPost.date.slice(0,4)}`}</h5>
            <h5><FaClock/> {eachPost.readtime} min read</h5>
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
        </div>
          )
        })}
      </div>

      <br /> <br /> <br />

      <hr></hr>
    </div>
  );
}

export default Latest;
