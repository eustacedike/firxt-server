

import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { FaTrash, FaSchool, FaAward, FaBook, FaBriefcase, FaCogs, FaGraduationCap, FaMagic, FaCalendarAlt, FaClock, FaThumbsUp, FaThumbsDown, FaBookmark, FaPenAlt, FaPen, FaRecycle } from "react-icons/fa";

import axios from "axios";


import "./dashboard.css";
import dp from "./dp4.png";
import badge from "./badge.png";


import categories from "../categories.json";




const posts = [
    { id: 1, title: "Metalogy X Global Ambassador Program", category: "Tech", author: "Eustace Dike", authordp: dp, date: "Jan 01, 2023", read: 5, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
    { id: 2, title: "Why you should care about p2p social", category: "Finance", author: "Uri Valeski", authordp: dp, date: "Dec 04, 2022", read: 10, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
    { id: 3, title: "Top ten best meals for breakfast", category: "Food", author: "Salt Bae", authordp: dp, date: "Sep 02, 2021", read: 2, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },


]


function Dashboard() {

    const [dashbox, setDashbox] = useState(0);

    const [cookies, setCookie, removeCookie] = useCookies(['user']);


    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let theMonth = parseInt(cookies.JoinDate.slice(5, 7));
    let myDate = `${months[theMonth - 1]} ${cookies.JoinDate.slice(8, 10)}, ${cookies.JoinDate.slice(0, 4)}`



    const you = {
        firstname: cookies.FirstName,
        lastname: cookies.LastName,
        nationality: "Nigeria",
        avatar: cookies.ProfileImage,
        specialty: "Your major..",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex commodi dolorem quasi dignissimos temporibus fugit adipisci voluptatibus esse aliquid quod! Exercitationem, facere aut. Voluptates, voluptatum animi quo incidunt aliquam fugiat perferendis ducimus maiores sunt, velit optio est vitae reiciendis molestias",
        dob: "01/07/2023",
        datejoined: myDate,
        workplace: "Ace Ventures",
        jobdesc: "Frontend Development using HTML, CSS, Javascript and React.",
        skills: ["React", "Javascript", "HTML5", "CSS3"],
        education: [{
            school: "Imo State University",
            degree: "Bachelor of Science",
            course: "Industrial Microbiology"
        },
        {
            school: "University of Canada",
            degree: "Master of Science",
            course: "Computer Science"
        },

        ]
    }


    const [image, setImage] = useState("");


    const [preview, setPreview] = useState();
    function imagePreview(e) {
        console.log(e.target.files);
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
        document.getElementById('DP-preview').style.transform = "scale(1)"
    }


    const changeDP = async (e) => {

        // e.preventDefault();


        let imageUrl = "";

        const instance = axios.create()

        const data = new FormData()
        data.append("file", image);
        data.append("upload_preset", "eustaceuploads");
        data.append("cloud_name", "djrdbht1u");

        const res = await instance.post(
            "https://api.cloudinary.com/v1_1/djrdbht1u/image/upload/",
            data
        )

            .then((res) => {
                console.log("response");
                console.log(res);
                imageUrl = res.data.url;
            })
            .catch((err) => console.log(err));


        const mongoSend = await axios
            .post("/api/users/changedp", { email: cookies.Email, image: imageUrl })
            .then(res => {
                // console.log(res);

                // navigate(`/loading`);
                // setTimeout(() => { navigate(`/post/${thePost.link}`) }, 2500);
                setTimeout(() => { window.location.reload() }, 1500);
            })
            .catch(err => {
                const errors = err.response.data;
                console.log(err.response.data)
            });




    };


    const [descInput, setDescInput] = useState(false);
    const [briefInput, setBriefInput] = useState(false);



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
                    <label
                        className="edit"
                        htmlFor="file"
                    ><FaPen /></label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={imagePreview}
                    />
                    <div>
                        <h1>{you.firstname} {you.lastname}</h1>
                        <i>
                        {briefInput? 
                    
                    <>
                    <input
                    type="text"
                    onChange={()=>{}}
                    />
                    <button onClick={()=>{setBriefInput(false)}}>Cancel</button>
                    <button className="procee">Proceed</button>
                    </>: you.specialty  }
                            <FaPen
                            style={{display: briefInput? "none" : ""}}
                            onClick={()=>{setBriefInput(true)}}
                            /></i>
                    </div>
                </div>
                <div className="DP-preview" id="DP-preview">
                    <img src={preview} />
                    <div>
                        <button
                        onClick={()=>{document.getElementById('DP-preview').style.transform = "scale(0)"}}
                        >Cancel</button>
                        <button
                        onClick={changeDP}
                        className="procee">Proceed</button>
                    </div>
                    
                    </div>

                <br /> <hr /> <br />
                <div className="about-you">
                    <h3>Description</h3>
                    <p> {descInput? 
                    
                     <>
                     <textarea
                     value={you.desc}
                     rows="8"
                     onChange={()=>{}}
                     ></textarea>
                     <button onClick={()=>{setDescInput(false)}}>Cancel</button>
                     <button className="procee">Proceed</button>
                     </>: you.desc  }
                    <i 
                    style={{display: descInput? "none" : ""}}
                    onClick={()=>{setDescInput(true)}}
                    ><FaPen/></i></p> 
                </div>
                <br /> <hr /> <br />
                <div className="profile-options">
                    <div className="the-options">

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
                            style={dashbox === 2 ? highlightStyle : null}
                            onClick={() => { setDashbox(2) }}>
                            Replies
                        </button> <hr /> */}
                        <button
                            style={dashbox === 3 ? highlightStyle : null}
                            onClick={() => { setDashbox(3) }}>
                            Bookmarks
                        </button> <hr />
                        <button
                            style={dashbox === 4 ? highlightStyle : null}
                            onClick={() => { setDashbox(4) }}>
                            Stats
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
                            <p><b>Name: </b>{you.firstname} {you.lastname}</p>
                            <p><b>Country: </b>{you.nationality}</p>
                            <p><b>Born: </b>{you.dob}</p>
                            <p><b>Joined: </b>{you.datejoined}</p>
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

                        {/* REPLIES */}
                        {/* <div className="your-replies"
                            style={{ display: dashbox !== 2 ? "none" : null }}
                        >
                            YO' REPLies
                        </div> */}

                        {/* BOOKMARKS */}
                        <div className="your-posts"
                            style={{ display: dashbox !== 3 ? "none" : null }}
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

                        <div className="your-stats"
                            style={{ display: dashbox !== 4 ? "none" : null }}
                        >
                            <div>
                                <h3>Days</h3>
                                <h1>{67}</h1>
                            </div>
                            <div>
                                <h3>Posts</h3>
                                <h1>{123}</h1>
                            </div>
                            <div>
                                <h3>Replies</h3>
                                <h1>{54}</h1>
                            </div>
                            <div>
                                <h3>Upvotes Received</h3>
                                <h1>{54}</h1>
                            </div>
                            <div>
                                <h3>Upvotes Given</h3>
                                <h1>{54}</h1>
                            </div>
                            <div>
                                <h3>Downvotes Receive</h3>
                                <h1>{54}</h1>
                            </div>
                            <div>
                                <h3>Downvotes Given</h3>
                                <h1>{54}</h1>
                            </div>
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
                    <h3><FaBriefcase /> Employment Credential</h3>
                    <p><b>Job Title: </b>{you.specialty}</p>
                    <p><b>Employer: </b>{you.workplace}</p>
                    <p><b>Job Description</b> <br /> {you.jobdesc}</p>
                </div>
                <br />
                <div className="creds">
                    <h3><FaCogs /> Skills</h3>
                    {
                        you.skills.map(eachSkill => {
                            return (<button>{eachSkill}</button>)
                        })
                    }
                </div>
                <br />
                <div className="creds">
                    <h3><FaGraduationCap /> Education</h3>
                    {
                        you.education.map(eachEducation => {
                            return (<>

                                <h4><FaAward /> {eachEducation.degree} </h4>
                                <p><FaBook /> {eachEducation.course}</p>
                                <p><FaSchool /> {eachEducation.school}</p> <br />
                            </>
                            )

                        })
                    }

                </div> <br />

                <div className="creds">
                    <h3><FaMagic /> Interests</h3>
                    {
                        Object.keys(sliced).map(key =>
                            <button> <Link onClick={takeUp} to={`/blog/${categories.cats[key].name}`} style={linkStyle}>{categories.cats[key].name}</Link></button>)
                    }
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
