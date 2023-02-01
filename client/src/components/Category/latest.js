

import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

import axios from 'axios';


import './category.css';

import { FaExclamationCircle, FaChevronRight, FaClock, FaCalendarAlt, FaBook, FaThumbsUp, FaThumbsDown, FaBookmark } from 'react-icons/fa';



import dp from "../Images/topics/baby.png";


import {upvote} from '../actions/votes.js';
import {downvote} from '../actions/votes.js';
import {bookmark} from '../actions/votes.js';

import { getCurrentUser } from '../actions/getCurrentUser';


function Latest(props) {


  const [user, setUser] = useState({isAuthenticated: false});

  useEffect(()=>{
    setUser(getCurrentUser());
  }, []);

  const [allUsers, setAllUsers] = useState([]);
  const getUsers = () => {
      axios.get("api/users/fetchusers")
          .then((response) => {
              // console.log(response.data.filter(a => { return a.email === user.email })[0].profileimage);
              setAllUsers(response.data);
          });

  };


  
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("api/posts/fetchposts")
      .then((response) => {

        // setPosts(response.data.reverse());
        setPosts(response.data.filter(forThisCategory => {return forThisCategory.category === props.thisCategory}).reverse());
      });

  };


  useEffect(() => {
    getPosts();
  }, [allUsers]);

  useEffect(() => {
    getUsers();
}, []);


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
          <Link onClick={takeUp} to={`/user/${eachPost.authorlink}`} style={linkStyle}>
                  <div className="author">
                  <img wait={3000} src={allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.profileimage} alt="" />
                    <h4>{eachPost.author}</h4>
                  </div>
                </Link>

            <h5><FaCalendarAlt/>  {` ${months[parseInt(eachPost.date.slice(5,7))-1]} ${eachPost.date.slice(8,10)}, ${eachPost.date.slice(0,4)}`}</h5>
            <h5><FaClock/> {eachPost.readtime} min read</h5>
          </div>

            <div className="cat-act">
              <button>{eachPost.category}</button>
          <div className="post-actions">
          {/* <p>{eachPost.upvotes} <FaThumbsUp onClick={()=>{upvote(eachPost._id, user.email)}}/></p>
            <p>{eachPost.downvotes} <FaThumbsDown onClick={()=>{downvote(eachPost._id, user.email)}}/></p>
            <p><FaBookmark onClick={()=>{bookmark(eachPost._id, user.email)}}/></p> */}
            
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
