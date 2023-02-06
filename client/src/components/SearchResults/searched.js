


import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import axios from 'axios';

import './searched.css';

import { FaBolt, FaCalendarAlt, FaSearch, FaPenFancy, FaClock, FaUser, FaBook } from 'react-icons/fa';
import { BsUiChecksGrid } from 'react-icons/bs';


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


import categories from "../categories.json";

const TopicImages = [motorPic, phonePic, moviePic, musicPic, bookPic, sportPic, financePic, techPic,  foodPic, cryptoPic, celebPic, fashionPic, petPic, forexPic, naturePic, lovePic, healthPic, kidPic]




function Searched() {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
//   const searchitem = cookies.searchitem;
//   console.log(cookies.searchitem);

    const [searchCat, setSearchCat] = useState(0);


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

      const [allUsers, setAllUsers] = useState([]);

    
      const getUsers = () => {
        axios.get("api/users/fetchusers")
          .then((response) => {
            // console.log(response.data.filter(a => { return a.email === user.email })[0].profileimage);
            setAllUsers(response.data);
          });
    
      };
    
      
    
  useEffect(() => {
    getUsers();
  }, []);


const searchedPosts = posts.filter(
    post =>
      post.title.toLocaleLowerCase().includes(cookies.searchitem) ||
      post.title.toLocaleLowerCase().includes(cookies.searchitem)
  );

const searchedUsers = allUsers.filter(
    user =>
      user.firstname.toLocaleLowerCase().includes(cookies.searchitem) ||
      user.lastname.toLocaleLowerCase().includes(cookies.searchitem)
  );

  let Topics = [];
  Object.keys(categories.cats).map(key =>
    Topics.push(categories.cats[key].name)
    )
const searchedTopics = Topics.filter(
    topic =>
      topic.toLocaleLowerCase().includes(cookies.searchitem) ||
      topic.toLocaleLowerCase().includes(cookies.searchitem)
  );

//   console.log(posts);




      const takeUp = () => {
        window.scroll(0, 0)
      };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const linkStyle = {
        textDecoration: "none",
        color: "unset"
      }

      const activeStyle = {
        backgroundColor: "#4A0404",
        color: "white"
      }


  return (
    
      <div className="Searched">

<h1>Search Results for <i>"{cookies.searchitem}"...</i> <FaSearch/></h1>

<br />

<div className="search-cat">
    <button style={searchCat===0? activeStyle: {}} onClick={()=>{setSearchCat(0)}}>Posts ({searchedPosts.length})</button>
    <button style={searchCat===1? activeStyle: {}} onClick={()=>{setSearchCat(1)}}>Users ({searchedUsers.length})</button>
    <button style={searchCat===2? activeStyle: {}} onClick={()=>{setSearchCat(2)}}>Categories ({searchedTopics.length})</button>
</div>


<div className="searchedposts" style={{display: searchCat===0? "": "none"}}>
{searchedPosts.map(eachPost => {
          return (
            <div className="post">

              <h3>{eachPost.title}</h3> <br />
              <Link onClick={takeUp} to={`/post/${eachPost.link}`} style={linkStyle}>
                <p>
                  <FaBook /> {eachPost.postbody.substring(0, 200)}...</p>
              </Link>
              <div className="post-details">
                <Link className='author' onClick={takeUp} to={`/user/${eachPost.authorlink}`} style={linkStyle}>
                 
                  <img wait={2000} src={allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.profileimage} alt="" />

                    <h4>{allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.firstname} &nbsp;
                    {allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.lastname}</h4>
            
                </Link>

                <h5><FaCalendarAlt />
                  {` ${months[parseInt(eachPost.date.slice(5, 7)) - 1]} ${eachPost.date.slice(8, 10)}, ${eachPost.date.slice(0, 4)}`

                  }
                </h5>
                <h5><FaClock /> {eachPost.readtime} min read</h5>
              </div>


            </div>
          )
        })}
</div>
<div className="searchedusers" style={{display: searchCat===1? "": "none"}}>
{searchedUsers.map(eachUser =>{
    return (
        
            <Link className='founduser' onClick={takeUp} to={`/user/${eachUser.link}`} style={linkStyle}>
                 
                 <img wait={2000} src={eachUser.profileimage} alt="" />

<div>
                   <h4>{eachUser.firstname} {eachUser.lastname}</h4>
                   <p> {eachUser.specialty === "What do you do?"? "" : eachUser.specialty}</p>
           </div>
               </Link>

    )
})}
</div>
<div className="searchedcategories" style={{display: searchCat===2? "": "none"}}>


      
{
searchedTopics.map(key =>
    <Link
    className='foundcategories'
    onClick={takeUp}
    to={`/blog/${categories.cats[key].name}`}
    style={linkStyle}>
      <p>{categories.cats[key].name}</p>
      <img src={TopicImages[categories.cats[key].id-1]}/>
    </Link>
  )
}

</div>



      </div>
    
  );
}

export default Searched;
