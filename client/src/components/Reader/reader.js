

import { Link, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

// import { useCookies } from "react-cookie";

import axios from 'axios';

import './reader.css';

import { FaExclamationCircle, FaTrash, FaClock, FaCalendarAlt, FaBook, FaThumbsUp, FaThumbsDown, FaBookmark } from 'react-icons/fa';


import {upvote} from '../actions/votes.js';
import {downvote} from '../actions/votes.js';
import {bookmark} from '../actions/votes.js';

import { getCurrentUser } from '../actions/getCurrentUser';

import dp from "../Home/assets/bg17.png";


function Reader(props) {

    
  const [user, setUser] = useState({isAuthenticated: false});

  useEffect(()=>{
    setUser(getCurrentUser());
  }, []);

    const navigate = useNavigate();

    // const thisPost =
    // {
    //     title: "Metalogy X Global Ambassador Program",
    //     category: "Tech",
    //     author: "Eustace Dike",
    //     authordp: dp,
    //     date: "Jan 01, 2023",
    //     read: 5,
    //     post: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam aperiam aliquam consequatur asperiores magni impedit debitis maiores nulla sequi ut delectus esse magnam vitae obcaecati totam itaque maxime, laboriosam accusantium ullam? Modi, voluptate ipsum. What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.."

    // };

    // const [cookies, setCookie, removeCookie] = useCookies(['user']);

    // const isAuthenticated = (cookies.isAuthenticated === 'true');

    // console.log(new Date());


    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let theMonth = parseInt(props.date.slice(5, 7));
    let myDate = `${months[theMonth - 1]} ${props.date.slice(8, 10)}, ${props.date.slice(0, 4)}`


    const thisPost =
    {
        title: props.title,
        category: props.category,
        author: props.author,
        authorlink: props.authorlink,
        authordp: dp,
        date: myDate,
        read: props.read,
        post: props.mainpost,
        upvotes: props.upvotes,
        downvotes: props.downvotes,
        imageUrl: props.image
    };

    const linkStyle = {
        textDecoration: "none",
        color: "unset"
    }

    const takeUp = () => {
        window.scroll(0, 0)
      };


    const deletePost = () => {



        axios
            .post("/api/posts/deletepost", { id: props.id })
            .then(res => {
                console.log(res);
                navigate(`/loading`);
                setTimeout(() => { window.location.reload() }, 3000);
            })
            .catch(err => {
                const errors = err.response.data;
                console.log(err.response.data)
            });

    }


    const [reply, setReply] = useState("");


    const sendReply = (e) => {

        e.preventDefault();

        const time = new Date();
        axios
            .post("/api/posts/sendreply", {
                reply: reply,
                id: props.id,
                replyauthor: user.name,
                replyauthoremail: user.email,
                replyauthorlink: user.link,
                replytime: time,
            })

            .catch(err => {
                const errors = err.response.data;
                console.log(err.response.data)
            });

        document.getElementById("reply-box").value = "";

    };

 

    return (  
        <div className="Reader">

            <h1>
                {/* <FaClock style={{verticalAlign: "-4.5px"}}/> */}
                {thisPost.title}</h1>






            <div className="post-details">
            <Link onClick={takeUp} to={`/user/${thisPost.authorlink}`} style={linkStyle}>
                  <div className="author">
                    <img src={dp} alt="" />
                    <h4>{thisPost.author}</h4>
                  </div>
                </Link>

                <h5><FaCalendarAlt /> {thisPost.date}</h5>
                <h5><FaClock /> {thisPost.read} min read</h5>
            </div>
            <p className='main-post'>
                {thisPost.post}
                <img src={thisPost.imageUrl} />
            </p>

            <div className="cat-act">
                <button>{thisPost.category}</button>
                <div className="post-actions">
                    <p>{thisPost.upvotes} <FaThumbsUp onClick={()=>{upvote(props.id, user.email)}}/></p>
                    <p>{thisPost.downvotes}<FaThumbsDown onClick={()=>{downvote(props.id, user.email)}}/></p>
                    <p><FaBookmark onClick={()=>{bookmark(props.id, user.email)}}/></p>
                    <p>{thisPost.authormail === user.email ? <FaTrash
                        onClick={deletePost}
                    /> : <FaExclamationCircle />}</p>
                    {/* <p><FaExclamationCircle /></p> */}
                    {/* <p><FaTrash /></p> */}
                </div>
            </div>

            <br />
            <hr />
            <br /> <br />

            {/* <form action="">
                <input type="text" /> <br />
                <button>Comment</button>
            </form> */}
            <form
                style={{ display: user.isAuthenticated ? "" : "none" }}
                onSubmit={sendReply}
                noValidate> <br />
                <input
                    type="text"
                    id="reply-box"
                    onChange={(e) => { setReply(value => e.target.value) }}
                // placeholder="new message on this topic
                />
                <button>Comment</button>
            </form>

            <br /> <br />

            <h3>Replies</h3>

            <div className="replies">

                {props.replies.map(eachReply => {

                    let replyMonth = parseInt(eachReply.replytime.slice(5, 7));
                    let replyTime2 = `${months[replyMonth - 1]} ${eachReply.replytime.slice(8, 10)}, ${eachReply.replytime.slice(0, 4)}`
                    return (
                        <div className="reply">
                            <div className="post-details">
                                <div className="the-reply">
                                    <p>
                                        {eachReply.reply}
                                    </p>
                                </div>
                                <hr/>
                                <div className="author">
                                    <div>
                                        <img src={thisPost.authordp} alt="" />
                                        <h4>{eachReply.replyauthor}</h4>
                                    </div>
                                    <h5><FaCalendarAlt /> {replyTime2}</h5>

                                </div>

                            </div>

                        </div>
                    )
                })}


                {/* <div className="reply">
                    <div className="post-details">
                        <div className="the-reply">
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, ratione nisi!
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, ratione nisi!
                            </p>
                        </div>
                        <hr/>
                        <div className="author">
                            <div>
                                <img src={thisPost.authordp} alt="eustace" />
                                <h4>{thisPost.author}</h4>
                            </div>
                            <h5><FaCalendarAlt /> {thisPost.date}</h5>
                        </div>


                    </div>

                </div> */}
            </div>





        </div>
    );
}

export default Reader;
