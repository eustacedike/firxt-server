

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaUsers, FaBook, FaSchool, FaBriefcase, FaCogs, FaGraduationCap, FaMagic, FaCalendarAlt, FaClock, FaThumbsUp, FaThumbsDown, FaBookmark, FaPenAlt, FaVenusMars, FaHome, FaUser } from "react-icons/fa";
import { ImEarth } from "react-icons/im";

import axios from "axios";


import "./dashboard.css";
import dp from "./salt.jfif";


import categories from "../categories.json";





function OtherUser(props) {


    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let theMonth = parseInt(props.date.slice(5, 7));
    let myDate = `${months[theMonth - 1]} ${props.date.slice(8, 10)}, ${props.date.slice(0, 4)}`






    const you = {
        firstname: props.firstname,
        lastname: props.lastname,
        name: props.firstname + " " + props.lastname,
        specialty: props.specialty,
        gender: props.gender.charAt(0).toUpperCase() + props.gender.slice(1),
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
        if (you.origin !== "" || you.origin) {
            let filter = res.data.map(a => { return a }).filter(filtered => { return filtered.name.common === you.origin });
            setFlag(filter[0].flags.png);
        }
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

    const xStyle = {
        textDecoration: "none",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 8px",
        backgroundColor: "white",
        borderRadius: "3px",
        alignItems: "flex-end",
    }

    const yStyle = {
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        padding: "10px 8px",
        backgroundColor: "white",
        borderRadius: "3px",
        marginBottom: "12px",
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
                        <h1>{you.name}</h1>
                        {you.specialty === "What do you do?" ? <b>Not specified. </b> : <b>{you.specialty}</b>}

                    </div>
                </div>
                <br /> <hr /> <br />
                <div className="about-you">
                    <h3>About</h3>
                    {you.about === "Describe yourself..." ? <p>Nothing to show... </p> : <p>{you.about}</p>}

                </div>

                {you.origin !== "" || you.origin ? <img className="flag" src={flag} /> : ""}


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

                    </div>
                    <div className="dashboard-box">
                        <br />
                        <div className="your-profile"
                            style={{ display: dashbox !== 0 ? "none" : null }}
                        >
                            <p><b><FaUser /> Name: </b>{you.firstname} {you.lastname}</p>
                            <p><b><FaVenusMars /> Gender: </b>{you.gender}</p>

                            <p><b><ImEarth /> Country of Origin: </b>{you.origin}</p>
                            <p><b><FaHome /> Country of Residence: </b>{you.residence}</p>
                            <p><b><FaCalendarAlt /> Joined: </b>{you.datejoined}</p>

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
                                            <Link onClick={takeUp} to={`/post/${eachPost.link}`} style={linkStyle}>

                                                <p>
                                                    {eachPost.postbody.substring(0, 70)}...
                                                </p>
                                            </Link>
                                            <div className="post-details cat-act">
                                                <div className="author">
                                                    <button>{eachPost.category}</button>

                                                </div>

                                                <h5><FaCalendarAlt /> {`${months[parseInt(eachPost.date.slice(5, 7)) - 1]} ${eachPost.date.slice(8, 10)}, ${eachPost.date.slice(0, 4)}`}</h5>
                                                <h5><FaClock /> {eachPost.readtime} min read</h5>
                                            </div>


                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                       
                    </div>
                </div>
            </div>


            <div className="dashboard-2">
                <h2><FaUsers /> Similar users</h2>
                <div className="x-users">
                    {
                        props.allUsers?.slice(0, 6).map(similarUser => {
                            return (
                                <Link style={xStyle} to={`/user/${similarUser.link}`} onClick={takeUp}>
                                    <img className="d-img" src={similarUser.profileimage} />
                                    <p>{similarUser.firstname} {similarUser.lastname}</p>
                                </Link>
                            )
                        })
                    }
                </div>

                <br />

                <h2><FaClock /> New posts</h2>
                <div className="x-posts">
                    {props.allPosts.slice(0, 3).map(eachPost => {
                        return (
                            <div style={yStyle}>
                                <Link onClick={takeUp} to={`/post/${eachPost.link}`}>
                                    <h3>{eachPost.title}</h3>
                                </Link>    <p style={{ margin: "10px 0" }}>{eachPost.postbody.substring(0, 70)}...</p>
                                <p>by <Link onClick={takeUp} to={`/user/${eachPost.authorlink}`}><b>{eachPost.author}</b></Link></p>
                            </div>

                        )
                    })}

                </div>

            </div>

        </div>
    );
}

export default OtherUser;
