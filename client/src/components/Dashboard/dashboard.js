

import { useState, useEffect } from "react";
// import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { FaTrash, FaUser, FaUsers, FaBirthdayCake, FaVenusMars, FaHome, FaAward, FaBook, FaBriefcase, FaCogs, FaGraduationCap, FaMagic, FaCalendarAlt, FaClock, FaThumbsUp, FaThumbsDown, FaBookmark, FaPenAlt, FaPen, FaRecycle } from "react-icons/fa";
import { ImEarth } from 'react-icons/im';

import axios from "axios";


import "./dashboard.css";
import dp from "./dp3.jpg";
import badge from "./badge.png";


import categories from "../categories.json";


import { getCurrentUser } from "../actions/getCurrentUser";

import PreLoader from "../Loading/profileloading";


function Dashboard() {

    const [dashbox, setDashbox] = useState(0);

    // const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const [user, setUser] = useState({ isAuthenticated: false });

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);



    // console.log(user);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let theMonth = parseInt(user.date?.slice(5, 7));
    let myDate = `${months[theMonth - 1]} ${user.date?.slice(8, 10)}, ${user.date?.slice(0, 4)}`

    const [avatar, setAvatar] = useState("https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg");
    const [gender, setGender] = useState("");
    const [DOB, setDOB] = useState("");


    const you = {
        name: user.name,
        nationality: "Nigeria",
        avatar: avatar,
        gender: gender.charAt(0).toUpperCase()+gender.slice(1),
        // specialty: "Your major..",
        // desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex commodi dolorem quasi dignissimos temporibus fugit adipisci voluptatibus esse aliquid quod! Exercitationem, facere aut. Voluptates, voluptatum animi quo incidunt aliquam fugiat perferendis ducimus maiores sunt, velit optio est vitae reiciendis molestias",
        dob: `${months[parseInt(DOB.slice(5, 7)) - 1]} ${DOB.slice(8, 10)}, ${DOB.slice(0, 4)}`,
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
            .post("/api/users/changedp", { email: user.email, image: imageUrl })
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
    const [originInput, setOriginInput] = useState(false);
    const [residenceInput, setResidenceInput] = useState(false);
    const [DOBInput, setDOBInput] = useState(false);

    const [brief, setBrief] = useState("What do you do?");
    const [desc, setDesc] = useState("Describe yourself...");
    const [origin, setOrigin] = useState("Where are you from?");
    const [residence, setResidence] = useState("Country of residence");

    const [flag, setFlag] = useState("");


    const changeBrief = () => {
        axios
            .post("api/users/changebrief", { email: user.email, brief: brief })
            .then(res => {
                console.log(brief);
                setBrief(res.data.specialty)
                setBriefInput(false)
            })
            .catch(err => console.log(err));


    }

    const changeDesc = () => {
        axios
            .post("api/users/changedesc", { email: user.email, desc: desc })
            .then(res => {
                // console.log(res.data.about);
                setDesc(res.data.about)
                setDescInput(false)
            })
            .catch(err => console.log(err));


    };

    const changeOrigin = () => {
        axios
            .post("api/users/changeorigin", { email: user.email, origin: origin })
            .then(res => {
                setOrigin(res.data.origin);
                setOriginInput(false)
            })
            .catch(err => console.log(err));
    };

    const changeResidence = () => {
        axios
            .post("api/users/changeresidence", { email: user.email, residence: residence })
            .then(res => {
                setResidence(res.data.residence)
                setResidenceInput(false)
            })
            .catch(err => console.log(err));


    };


    const changeDOB = () => {
        axios
            .post("api/users/changedob", { email: user.email, dob: DOB })
            .then(res => {
                setDOB(res.data.dob)
                setDOBInput(false)
            })
            .catch(err => console.log(err));


    };

    const [userBookmarks, setUserBookmarks] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    const [userDislikes, setUserDislikes] = useState([]);

    const [allUsers, setAllUsers] = useState([]);
    const getUsers = () => {
        axios.get("api/users/fetchusers")
            .then((response) => {
                // console.log(response.data.filter(a => { return a.email === user.email })[0].profileimage);
                setAllUsers(response.data.reverse());
                setAvatar(response.data.filter(a => { return a.email === user.email })[0].profileimage);
                setDOB(response.data.filter(a => { return a.email === user.email })[0].dob);
                setGender(response.data.filter(a => { return a.email === user.email })[0].gender);
                setBrief(response.data.filter(a => { return a.email === user.email })[0].specialty);
                setDesc(response.data.filter(a => { return a.email === user.email })[0].about);
                setOrigin(response.data.filter(a => { return a.email === user.email })[0].origin);
                setResidence(response.data.filter(a => { return a.email === user.email })[0].residence);
                setUserBookmarks(response.data.filter(a => { return a.email === user.email })[0].bookmarked);
                setUserLikes(response.data.filter(a => { return a.email === user.email })[0].liked);
                setUserDislikes(response.data.filter(a => { return a.email === user.email })[0].disliked);
            });

    };


    useEffect(() => {
        getUsers();
    }, [user]);



    const [yourPosts, setYourPosts] = useState([]);
    const [yourBookmarks, setYourBookmarks] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);




    const getPosts = () => {
        axios.get("api/posts/fetchposts")
            .then((response) => {
                // console.log(response.data.filter((a) => {
                //     return userBookmarks.some((b) => {
                //         return b === a._id
                //     })}))

                setYourPosts(response.data.reverse().filter(a => { return a.authormail === user.email }));
                setYourBookmarks(response.data.filter((a) => {
                    return userBookmarks.some((b) => {
                        return b === a._id
                    })
                }));
                setLatestPosts(response.data.slice(0, 3));
            });

    };


    useEffect(() => {
        getPosts();
    }, [yourPosts]);


    const [countries, setCountries] = useState([]);

    const getCountries = axios.create().get(
        "https://restcountries.com/v3.1/all", {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }
    ).then((res) => {
        setCountries(res.data.map(a => { return a }));
        if (origin !== "") {
        let filter = countries.filter(filtered => { return filtered.name.common === origin });
        setFlag(filter[0].flags.png)
    };
    });

    // const yourFlag = countries.filter(filtered => {return filtered.name.common === origin})[0];
    // useEffect(() => {
    //    console.log(flag);
    // }, [yourFlag]);


    // const date1 = new Date('7/13/2010');
    const date1 = new Date(`${user.date?.slice(5, 7)}/${user.date?.slice(8, 10)}/${user.date?.slice(0, 4)}`);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const upvotesReceived = yourPosts.reduce((acc, obj) => {
        return acc + obj.upvotes;
    }, 0);
    const downvotesReceived = yourPosts.reduce((acc, obj) => {
        return acc + obj.downvotes;
    }, 0);


    //Preloader
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 800)
  }, []);

    // console.log(userLikes.length);


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
        // color: "unset",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 8px",
        backgroundColor: "white",
        borderRadius: "3px",
        alignItems: "flex-end",
    }

    const yStyle = {
        textDecoration: "none",
        // color: "unset",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
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
        <>
      {
        loading ?
          <PreLoader h1="LOADING" timer={24.3}/>
          :
        <div className="Dashboard">
            <div className="dashboard-1">
                <div className="avatar">
                    <img className="avatar-image" src={you.avatar} alt="" />
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
                        <h1>{you.name}</h1>
                        <b>
                            {briefInput ?

                                <>
                                    <input
                                        type="text"
                                        onChange={(e) => { setBrief(e.target.value) }}
                                        maxLength="20"
                                        placeholder="Max: 20 characters"
                                    />
                                    <button onClick={() => { setBriefInput(false) }}>Cancel</button>
                                    <button className="procee" onClick={changeBrief}>Proceed</button>
                                </> : brief}
                            <FaPen
                                style={{ display: briefInput ? "none" : "", fontSize: "smaller", marginLeft: "7px", color: "#4A0404", cursor: "pointer" }}
                                onClick={() => { setBriefInput(true) }}
                            />
                        </b>
                    </div>
                </div>
                <div className="DP-preview" id="DP-preview">
                    <img src={preview} />
                    <div>
                        <button
                            onClick={() => { document.getElementById('DP-preview').style.transform = "scale(0)" }}
                        >Cancel</button>
                        <button
                            onClick={changeDP}
                            className="procee">Proceed</button>
                    </div>
                    <p>
                        This is how your image will appear on your profile. We advice you use a square fit image.
                    </p>

                </div>

                <br /> <hr /> <br />
                <div className="about-you">
                    <h3>Description</h3>
                    <p> {descInput ?

                        <>
                            <textarea
                                value={desc}
                                rows="8"
                                onChange={(e) => { setDesc(e.target.value) }}
                                placeholder="Max: 200 characters"
                                maxLength="300"
                            ></textarea>
                            <button onClick={() => { setDescInput(false) }}>Cancel</button>
                            <button className="procee" onClick={changeDesc}>Proceed</button>
                        </> : desc}
                        <i
                            style={{ display: descInput ? "none" : "", fontSize: "smaller", marginLeft: "7px", color: "#4A0404", cursor: "pointer" }}
                            onClick={() => { setDescInput(true) }}
                        ><FaPen /></i></p>
                </div>

                {origin !== "" || origin ? <img className="flag" src={flag} /> : ""}
                {/* <img className="flag" src={flag} /> */}
                <br />
                <hr /> <br />
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
                            <p><b><FaUser /> Name: </b>{you.name}</p>

                            <p><b><FaVenusMars /> Gender: </b>{you.gender}</p>


                            {originInput ?

                                <>
                                    <select
                                        onChange={(e) => { setOrigin(e.target.value) }}
                                    >
                                        <option>Choose country of origin</option>

                                        {
                                            countries.sort((a, b) => a.name.common.localeCompare(b.name.common)).map(eachCountry => {
                                                return (
                                                    <option value={eachCountry.name.common}>
                                                        {eachCountry.name.common}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    <button onClick={() => { setOriginInput(false) }}>&#10006;</button>
                                    <button className="procee" onClick={changeOrigin}>&#10003;</button> <br />
                                </> : <p><b><ImEarth /> Nationality: </b>{origin}
                                    <FaPen
                                        style={{ display: originInput ? "none" : "", fontSize: "smaller", marginLeft: "7px", color: "#4A0404", cursor: "pointer" }}
                                        onClick={() => { setOriginInput(true) }}
                                    />
                                </p>}



                            {residenceInput ?

                                <>
                                    <select
                                        onChange={(e) => { setResidence(e.target.value) }}
                                    >
                                        <option>Choose country of residence</option>
                                        {
                                            countries.sort((a, b) => a.name.common.localeCompare(b.name.common)).map(eachCountry => {
                                                return (
                                                    <option value={eachCountry.name.common}>
                                                        {eachCountry.name.common}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    <button onClick={() => { setResidenceInput(false) }}>&#10006;</button>
                                    <button className="procee" onClick={changeResidence}>&#10003;</button> <br />
                                </> : <p><b><FaHome /> Residence: </b>{residence}
                                    <FaPen
                                        style={{ display: residenceInput ? "none" : "", fontSize: "smaller", marginLeft: "7px", color: "#4A0404", cursor: "pointer" }}
                                        onClick={() => { setResidenceInput(true) }}
                                    />
                                </p>}


                            {DOBInput ?

                                <>
                                    <input
                                        type="date"
                                        onChange={(e) => { setDOB(e.target.value) }}
                                    />
                                    <button onClick={() => { setDOBInput(false) }}>&#10006;</button>
                                    <button className="procee" onClick={changeDOB}>&#10003;</button> <br />
                                </> : <p><b><FaBirthdayCake /> Date of Birth: </b>{you.dob}
                                    <FaPen
                                        style={{ display: DOBInput ? "none" : "", fontSize: "smaller", marginLeft: "7px", color: "#4A0404", cursor: "pointer" }}
                                        onClick={() => { setDOBInput(true) }}
                                    />
                                </p>}

                            {/* <p><b><FaCalendarAlt /> Born: </b>{you.dob}</p> */}
                            <p><b><FaCalendarAlt /> Joined: </b>{you.datejoined}</p>
                        </div>

                        {/* POSTS */}
                        <div className="your-posts"
                            style={{ display: dashbox !== 1 ? "none" : null }}
                        >
                            {yourPosts.map(eachPost => {
                                return (
                                    <div className="post">
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

                                            <h5><FaCalendarAlt />  &nbsp;
                                                {`${months[parseInt(eachPost.date.slice(5, 7)) - 1]} ${eachPost.date.slice(8, 10)}, ${eachPost.date.slice(0, 4)}`}
                                            </h5>
                                            <h5><FaClock /> {eachPost.readtime} min read</h5>
                                        </div>

                                        {/* <div className="cat-act">
                                            <button>{eachPost.category}</button>
                                            <div className="post-actions">
                                                <p><FaThumbsUp /></p>
                                                <p><FaThumbsDown /></p>
                                                <p><FaBookmark /></p>
                                                <p><FaPenAlt /></p>
                                                <p><FaTrash /></p>
                                            </div>
                                        </div> */}
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
                            {yourBookmarks.map(eachPost => {
                                return (
                                    <div className="post">
                                        <h3>{eachPost.title}</h3> <br />
                                        <Link onClick={takeUp} to={`/post/${eachPost.link}`} style={linkStyle}>

                                            <p>
                                                {eachPost.postbody.substring(0, 70)}...
                                            </p>
                                        </Link>

                                        <div className="post-details">
                                            <div className="author">
                                            <img wait={2000} src={allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.profileimage} alt="" />

                                                <h4>{allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.firstname} &nbsp;
                    {allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.lastname}</h4>
                                            </div>

                                            <h5><FaCalendarAlt />  &nbsp;
                                                {`${months[parseInt(eachPost.date.slice(5, 7)) - 1]} ${eachPost.date.slice(8, 10)}, ${eachPost.date.slice(0, 4)}`}
                                            </h5>
                                            <h5><FaClock /> {eachPost.readtime} min read</h5>
                                        </div>

                                        <div className="cat-act">
                                            <button>{eachPost.category}</button>
                                            {/* <div className="post-actions">
                                                <p><FaThumbsUp /></p>
                                                <p><FaThumbsDown /></p>
                                                <p><FaBookmark /></p>
                                                <p><FaPenAlt /></p>
                                                <p><FaTrash /></p>
                                            </div> */}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="your-stats"
                            style={{ display: dashbox !== 4 ? "none" : null }}
                        >
                            <div>
                                <h3>Days</h3>
                                <h1>{diffDays}</h1>
                            </div>
                            <div>
                                <h3>Posts</h3>
                                <h1>{yourPosts.length}</h1>
                            </div>
                            {/* <div>
                                <h3>Replies</h3>
                                <h1>{54}</h1>
                            </div> */}
                            <div>
                                <h3>Bookmarks</h3>
                                <h1>{yourBookmarks.length}</h1>
                            </div>
                            <div>
                                <h3>Upvotes <br /> Received</h3>
                                <h1>{upvotesReceived}</h1>
                            </div>
                            <div>
                                <h3>Upvotes <br /> Given</h3>
                                <h1>{userLikes.length}</h1>
                            </div>
                            <div>
                                <h3>Downvotes <br /> Received</h3>
                                <h1>{downvotesReceived}</h1>
                            </div>
                            <div>
                                <h3>Downvotes <br /> Given</h3>
                                <h1>{userDislikes.length}</h1>
                            </div>
                        </div>

                        {/* BADGE */}
                        {/* <div className="your-badge"
                            style={{ display: dashbox !== 5 ? "none" : null }}
                        >
                            <img src={badge} alt="" />
                            <h1>ROOKIE</h1>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="dashboard-2">
                <h2><FaUsers/> Similar users</h2>
                <div className="x-users">
                    {
                        allUsers.slice(0,6).map(similarUser => {
                            return (
                                <Link style={xStyle} to={`/user/${similarUser.link}`}>
                                <img className="d-img" src={similarUser.profileimage} />
                                <p>{similarUser.firstname} {similarUser.lastname}</p>
                            </Link>
                            )
                        })
                    }
                </div>

                <br />

                <h2><FaClock/> New posts</h2>
                <div className="x-posts">
                    {latestPosts.map(eachPost => {
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

            {/* <div className="dashboard-2">
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
            </div> */}

        </div>
}
</>
    );
}

export default Dashboard;
