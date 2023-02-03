

import { Link } from 'react-router-dom';

import { useState, useEffect, useMemo } from 'react';
import Pagination from '../Pagination/Pagination';

import axios from 'axios';


import './allposts.css';

import { FaExclamationCircle, FaChevronRight, FaClock, FaCalendarAlt, FaBook, FaThumbsUp, FaThumbsDown, FaBookmark } from 'react-icons/fa';

import {upvote} from '../actions/votes.js';
import {downvote} from '../actions/votes.js';
import {bookmark} from '../actions/votes.js';

import { getCurrentUser } from '../actions/getCurrentUser';

import Alert from '../CustomAlert/alert';


function AllPosts(props) {



  const [user, setUser] = useState({isAuthenticated: false});

  useEffect(()=>{
    setUser(getCurrentUser());
  }, []);


  const [allUsers, setAllUsers] = useState([]);

  const [userBookmarks, setUserBookmarks] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [userDislikes, setUserDislikes] = useState([]);

  const getUsers = () => {
    axios.get("api/users/fetchusers")
      .then((response) => {
        // console.log(response.data.filter(a => { return a.email === user.email })[0].profileimage);
        setAllUsers(response.data);
        setUserBookmarks(response.data.filter(a => { return a.email === user.email })[0]?.bookmarked);
        setUserLikes(response.data.filter(a => { return a.email === user.email })[0]?.liked);
        setUserDislikes(response.data.filter(a => { return a.email === user.email })[0]?.disliked);
      });

  };

  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("api/posts/fetchposts")
      .then((response) => {

        setPosts(response.data.reverse());
      });

  };




useEffect(() => {
  getPosts();
}, []);



useEffect(() => {
  getUsers();
}, [user]);

const alertBox = () => {
  document.getElementById('alert').style.display = "block";
  setTimeout(() => { document.getElementById('alert').style.display = "none" }, 3000);
};


const months = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"]


  const linkStyle = {
    textDecoration: "none",
    color: "unset"
  }

  const takeUp = () => {
    window.scroll(0,0)
  }



  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const postsToDisplay = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, posts]);

// console.log(postsToDisplay)

  return (
    <div className="Allposts">
       <div id='alert'>
        <Alert/>
      </div>
      <div className="hero">

<div className="hero1">
        <h1>
          {props.icon} 
          {props.latestOrtrending}
        </h1>
        <p>
           {props.sub}
        </p>

       
       </div>
      </div>
    

      <div className="posts">


        {postsToDisplay.map(eachPost => {
          return (
            <div className="post">
          <h3>{eachPost.title}</h3> <br />
          <Link onClick={takeUp} to={`/post/${eachPost.link}`} style={linkStyle}>

          <p>
            <FaBook /> {eachPost.postbody.substring(0,200)}...</p>


          </Link>


          <div className="post-details">
          <Link className='author' onClick={takeUp} to={`/user/${eachPost.authorlink}`} style={linkStyle}>
                  {/* <div className="author"> */}
                  <img wait={3000} src={allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.profileimage} alt="" />
                {/* <p wait={3000}>{allUsers.filter(a => { return a.email === eachPost.authormail })[0]._id}</p> */}
                    <h4>{eachPost.author}</h4>
                  {/* </div> */}
                </Link>

            <h5><FaCalendarAlt/>  {` ${months[parseInt(eachPost.date.slice(5,7))-1]} ${eachPost.date.slice(8,10)}, ${eachPost.date.slice(0,4)}`}</h5>
            <h5><FaClock/> {eachPost.readtime} min read</h5>
          </div>

            <div className="cat-act">
              <button>{eachPost.category}</button>
          <div className="post-actions">
          <p style={{ color: userLikes?.includes(eachPost._id) ? "red" : "" }}>
                    {eachPost.upvotes} &nbsp;
                    <FaThumbsUp onClick={user.isAuthenticated ? () => { upvote(eachPost._id, user.email); getUsers() } : alertBox} />
                  </p>
                  <p style={{ color: userDislikes?.includes(eachPost._id) ? "red" : "" }}>
                    {eachPost.downvotes} &nbsp;
                    <FaThumbsDown onClick={user.isAuthenticated ? () => { downvote(eachPost._id, user.email); getUsers() } : alertBox} />
                  </p>
                  <p style={{ color: userBookmarks?.includes(eachPost._id) ? "red" : "" }}>
                    <FaBookmark onClick={user.isAuthenticated ? () => { bookmark(eachPost._id, user.email); getUsers() } : alertBox} />
                  </p>
          </div>
          </div>
        </div>
          )
        })}
      </div>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={posts.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
}

export default AllPosts;
