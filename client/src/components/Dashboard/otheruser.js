

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaAward, FaBook, FaSchool, FaBriefcase, FaCogs, FaGraduationCap, FaMagic, FaCalendarAlt, FaClock, FaThumbsUp, FaThumbsDown, FaBookmark, FaPenAlt, FaRecycle } from "react-icons/fa";

import "./dashboard.css";
import dp from "./salt.jfif";
import badge from "./badge.png";


import categories from "../categories.json";



// 



const posts = [
    { id: 1, title: "Metalogy X Global Ambassador Program", category: "Tech", author: "Eustace Dike", authordp: dp, date: "Jan 01, 2023", read: 5, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
    { id: 2, title: "Why you should care about p2p social", category: "Finance", author: "Uri Valeski", authordp: dp, date: "Dec 04, 2022", read: 10, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
    { id: 3, title: "Top ten best meals for breakfast", category: "Food", author: "Salt Bae", authordp: dp, date: "Sep 02, 2021", read: 2, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },


]


function OtherUser(props) {


    const months = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"]
    let theMonth = parseInt(props.date.slice(5,7));
    let myDate = `${months[theMonth-1]} ${props.date.slice(8,10)}, ${props.date.slice(0,4)}`


    const you = {
        title: "Mr",
        firstname: props.firstname,
        lastname: props.lastname,
        nationality: props.country,
        avatar: dp,
        specialty: props.specialty,
        desc: props.about,
        dob: "01/07/2023",
        datejoined: myDate,
        workplace: "Salt Bae",
        jobdesc: "nothing special",
        skills: ["Grilling", "Cooking", "Barbeque"],
        education: [{school: "Imo State University",
                        degree: "Bachelor of Science",
                        course: "Industrial Microbiology"
    },
        {school: "University of Canada",
                        degree: "Master of Science",
                        course: "Computer Science"
    },
    
    ]
    }
    

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
                    <img src={you.avatar} alt="" />
                    <div>
                        <h1>{you.firstname} {you.lastname}</h1>
                        <i>{you.specialty}</i>
                    </div>
                </div>
                <br /> <hr /> <br />
                <div className="about-you">
                    <h3>About</h3>
                    <p>{you.desc}</p>
                </div>
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
                        
                        <button
                            style={dashbox === 5 ? highlightStyle : null}
                            onClick={() => { setDashbox(5) }}>
                            Badge
                        </button> <hr />
                    </div>
                    <div className="dashboard-box">
                        <br />
                        <div className="your-profile"
                            style={{ display: dashbox !== 0 ? "none" : null }}
                        >
                            <p><b>Title: </b>{you.title}</p>
                            <p><b>Name: </b>{you.firstname} {you.lastname}</p>
                            <p><b>Country: </b>{you.nationality}</p>
                        </div>

                        {/* POSTS */}
                        <div className="your-posts"
                            style={{ display: dashbox !== 1 ? "none" : null }}
                        >
                            {posts.map(eachPost => {
                                return (
                                    <div className="post">
                                        <Link onClick={takeUp} to="/blog" style={linkStyle}>
                                            <h3>{eachPost.title}</h3> <br />
                                            <p>
                                                {eachPost.post.substring(0, 70)}...</p>

                                            <div className="post-details">
                                                <div className="author">
                                                    <img src={eachPost.authordp} alt="eustace" />
                                                    <h4>{eachPost.author}</h4>
                                                </div>

                                                <h5><FaCalendarAlt /> {eachPost.date}</h5>
                                                <h5><FaClock /> {eachPost.read} min read</h5>
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
                <div className="creds">
                    <h3><FaBriefcase/> Employment Credential</h3>
                    <p><b>Job Title: </b>{you.specialty}</p>
                    <p><b>Employer: </b>{you.workplace}</p>
                    <p><b>Job Description</b> <br/> {you.jobdesc}</p>
                </div> 
                <br />
                <div className="creds">
                    <h3><FaCogs/> Skills</h3>
                   {
                    you.skills.map(eachSkill =>{
                        return (<button>{eachSkill}</button>)
                    })
                   }
                </div>
                <br />
                <div className="creds">
                    <h3><FaGraduationCap/> Education</h3>
                    {
                    you.education.map(eachEducation =>{ 
                   return     ( <>

<h4><FaAward/> {eachEducation.degree} </h4>
                   <p><FaBook/> {eachEducation.course}</p>
                   <p><FaSchool/> {eachEducation.school}</p> <br />
                   </>
                   )
                        
                    })
                   }

                </div> <br />

                <div className="creds">
                    <h3><FaMagic/> Interests</h3>
                    {
      Object.keys(sliced).map(key =>
        <button> <Link onClick={takeUp} to={`/blog/${categories.cats[key].name}`} style={linkStyle}>{categories.cats[key].name}</Link></button>)
    }
                </div>
            </div>

        </div>
    );
}

export default OtherUser;
