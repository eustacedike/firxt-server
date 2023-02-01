

import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

// import { useCookies } from 'react-cookie';

import axios from 'axios';


import './home.css';

import { FaExclamationCircle, FaChevronRight, FaClock, FaCalendarAlt, FaBook, FaThumbsUp, FaThumbsDown, FaBookmark, FaTrash } from 'react-icons/fa';

import {upvote} from '../actions/votes.js';
import {downvote} from '../actions/votes.js';
import {bookmark} from '../actions/votes.js';

import { getCurrentUser } from '../actions/getCurrentUser';



import dp from "./assets/bg17.png"


function Latest() {

  const [user, setUser] = useState({isAuthenticated: false});

  useEffect(()=>{
    setUser(getCurrentUser());
  }, []);

  // const [cookies, setCookie, removeCookie] = useCookies(['user']);


  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  // let theMonth = parseInt(cookies.JoinDate.slice(5,7));
  // let myDate = `${months[parseInt(eachPost.date.slice(5,7))-1]} ${eachPost.date.slice(8,10)}, ${eachPost.date.slice(0,4)}`


 

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

        setPosts(response.data.reverse().slice(0, 3));
      });

  };


  useEffect(() => {
    getPosts();
  }, [allUsers]);

  useEffect(() => {
    getUsers();
}, []);


  const linkStyle = {
    textDecoration: "none",
    color: "unset"
  }

  const takeUp = () => {
    window.scroll(0, 0)
  };


  return (
    <div className="Latest">
      <h1><FaClock style={{ verticalAlign: "-4.5px" }} /> LATEST POSTS</h1>

      <div className="posts">


        {posts.map(eachPost => {
          return (
            <div className="post">

              <h3>{eachPost.title}</h3> <br />
              <Link onClick={takeUp} to={`/post/${eachPost.link}`} style={linkStyle}>
                <p>
                  <FaBook /> {eachPost.postbody.substring(0, 200)}...</p>
              </Link>
              <div className="post-details">
                <Link onClick={takeUp} to={`/user/${eachPost.authorlink}`} style={linkStyle}>
                  <div className="author">
                    <img wait={2000} src={allUsers.filter(a => { return a.email === eachPost.authormail })[0].profileimage} alt="" />
                    <h4>{eachPost.author}</h4>
                  </div>
                </Link>

                <h5><FaCalendarAlt />
                  {` ${months[parseInt(eachPost.date.slice(5, 7)) - 1]} ${eachPost.date.slice(8, 10)}, ${eachPost.date.slice(0, 4)}`

                  }
                </h5>
                <h5><FaClock /> {eachPost.readtime} min read</h5>
              </div>

              <div className="cat-act">
                <button>{eachPost.category}</button>
                <div className="post-actions">
                <p>{eachPost.upvotes} <FaThumbsUp onClick={()=>{upvote(eachPost._id, user.email)}}/></p>
            <p>{eachPost.downvotes} <FaThumbsDown onClick={()=>{downvote(eachPost._id, user.email)}}/></p>
            <p><FaBookmark onClick={()=>{bookmark(eachPost._id, user.email)}}/></p>
                </div>
              </div>

            </div>
          )
        })}
      </div>

      <button className="more">
        <Link onClick={takeUp} to="/blogposts" style={linkStyle}> Latest Posts <FaChevronRight style={{ verticalAlign: "-2.5px", marginLeft: "10px" }} /> </Link>
      </button> <br /> <br /> <br />

      <hr></hr>
    </div>
  );
}

export default Latest;
