

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaAward, FaBook, FaSchool, FaBriefcase, FaCogs, FaGraduationCap, FaMagic, FaCalendarAlt, FaClock, FaThumbsUp, FaThumbsDown, FaBookmark, FaPenAlt, FaVenusMars, FaHome, FaUser } from "react-icons/fa";
import {ImEarth} from "react-icons/im";

import axios from "axios";


import "./dashboard.css";
import dp from "./salt.jfif";
import badge from "./badge.png";


import categories from "../categories.json";



// 



// const posts = [
//     { id: 1, title: "Metalogy X Global Ambassador Program", category: "Tech", author: "Eustace Dike", authordp: dp, date: "Jan 01, 2023", read: 5, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
//     { id: 2, title: "Why you should care about p2p social", category: "Finance", author: "Uri Valeski", authordp: dp, date: "Dec 04, 2022", read: 10, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
//     { id: 3, title: "Top ten best meals for breakfast", category: "Food", author: "Salt Bae", authordp: dp, date: "Sep 02, 2021", read: 2, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },


// ]


function OtherUser(props) {


    const months = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"]
    let theMonth = parseInt(props.date.slice(5,7));
    let myDate = `${months[theMonth-1]} ${props.date.slice(8,10)}, ${props.date.slice(0,4)}`






    const you = {
        firstname: props.firstname,
        lastname: props.lastname,
        specialty: props.specialty,
        gender: props.gender,
        about: props.about,
        origin: props.origin,
        residence: props.residence,
        avatar: props.avatar,
        datejoined: myDate,

        posts: props.posts
    }

    const [flag, setFlag] = useState("");

    const getCountries = axios.create().get(
        "https://restcountries.com/v3.1/all", {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }
    ).then((res) => {
        let filter = res.data.map(a => { return a }).filter(filtered => { return filtered.name.common === you.origin });
        setFlag(filter[0].flags.png);
    });
    

    const [dashbox, setDashbox] = useState(0);

    const highlightStyle = {
        backgroundColor: "#4A0404",
        color: "white"
    }

    const linkStyle = {
        textDecoration: "none",
        color: "unset"
    }

    const takeUp = () => {
        window.scroll(0, 0)
    };

    const sliced = Object.fromEntries(
        Object.entries(categories.cats).slice(0, 8));

    return (
        <div className="Dashboard">
            <div className="dashboard-1">
                <div className="avatar">
                    <img className="avatar-image" src={you.avatar} alt="" />
                    <div>
                        <h1>{you.firstname} {you.lastname}</h1>
                        <i>{you.specialty}</i>
                    </div>
                </div>
                <br /> <hr /> <br />
                <div className="about-you">
                    <h3>About</h3>
                    <p>{you.about}</p>
                </div>
               
                <img className="flag" src={flag} />
            
                <br /> <hr /> <br />
                <div className="profile-options">
                    <div className="the-options odas">

                        <button
                            style={dashbox === 0 ? highlightStyle : null}
                            onClick={() => { setDashbox(0) }}>
                            Profile
                        </button> <hr />
                        <button
                            style={dashbox === 1 ? highlightStyle : null}
                            onClick={() => { setDashbox(1) }}>
                            Posts
                        </button> <hr />
                        
                        {/* <button
                            style={dashbox === 5 ? highlightStyle : null}
                            onClick={() => { setDashbox(5) }}>
                            Badge
                        </button> <hr /> */}
                    </div>
                    <div className="dashboard-box">
                        <br />
                        <div className="your-profile"
                            style={{ display: dashbox !== 0 ? "none" : null }}
                        >
                            <p><b><FaUser/> Name: </b>{you.firstname} {you.lastname}</p>
                            <p><b><FaVenusMars /> Gender: </b>{you.gender}</p>
                        
                            <p><b><ImEarth/> Country of Origin: </b>{you.origin}</p>
                            <p><b><FaHome/> Country of Residence: </b>{you.residence}</p>
                            <p><b><FaCalendarAlt/> Joined: </b>{you.datejoined}</p>

                        </div>

                        {/* POSTS */}
                        <div className="your-posts"
                            style={{ display: dashbox !== 1 ? "none" : null }}
                        >
                            {you.posts.map(eachPost => {
                                return (
                                    <div className="post">
                                        <Link onClick={takeUp} to="/blog" style={linkStyle}>
                                            <h3>{eachPost.title}</h3> <br />
                                            <p>
                                                {eachPost.postbody.substring(0, 70)}...</p>

                                            <div className="post-details">
                                                <div className="author">
                                                    <img src={eachPost.authordp} alt="eustace" />
                                                    <h4>{eachPost.author}</h4>
                                                </div>

                                                <h5><FaCalendarAlt /> {eachPost.date}</h5>
                                                <h5><FaClock /> {eachPost.readtime} min read</h5>
                                            </div>

                                            <div className="cat-act">
                                                <button>{eachPost.category}</button>
                                                <div className="post-actions">
                                                    <p><FaThumbsUp /></p>
                                                    <p><FaThumbsDown /></p>
                                                    <p><FaBookmark /></p>
                                                    <p><FaPenAlt /></p>
                                                    <p><FaTrash /></p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                              {/* BADGE */}
                        <div className="your-badge"
                            style={{ display: dashbox !== 5 ? "none" : null }}
                        >
                            <img src={badge} alt="" />
                            <h1>ROOKIE</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="dashboard-2">
                
            </div>

        </div>
    );
}

export default OtherUser;
