
import ReactDOM from "react-dom/client";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

import Home from "./components/Home/home";
import Layout from "./components/Layout/layout";
import Post from "./components/Post/post";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Reader from "./components/Reader/reader";
import AllPosts from "./components/AllPosts/allposts";
import Category from "./components/Category/category";
import Topics from "./components/Topics/topics";
import Dashboard from "./components/Dashboard/dashboard";
import OtherUser from "./components/Dashboard/otheruser";
import Loading from "./components/Loading/loading";

import './App.css';

import { FaClock } from "react-icons/fa";
import { ImFire } from 'react-icons/im';

import categories from "./components/categories.json";

//Images


//Private Route
import PrivateRoute from "./Protected Routes/PrivateRoute";

function App() {

  const [allPosts, setAllPosts] = useState([]);

  const getPosts = () => {
    axios.get("api/posts/fetchposts")
      .then((response) => {
        // console.log(response.data);
        setAllPosts(response.data);
      });

  };


  useEffect (()=>{
    getPosts();
  }, [allPosts]);
  


  const [allUsers, setAllUsers] = useState([]);

  const getUsers = () => {
    axios.get("api/users/fetchusers")
      .then((response) => {
        // console.log(response.data);
        setAllUsers(response.data);
      });

  };


  useEffect (()=> {
    getUsers();
  }, [allUsers])

  return (
    <div className="App">

      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="write" element={<Post />} /> */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="blog" element={<Reader />} />
            <Route path="loading" element={<Loading />} />

            {
              Object.keys(categories.cats).map(key =>
                <Route path={`blog/${categories.cats[key].name}`} element={<Category
                  desc={categories.cats[key].name}
                  sub={categories.cats[key].desc}
                  id={categories.cats[key].id}
                />}

                />

              )
            }

            {
              allPosts.map(eachPost => {
                return (
                  <Route
                    path={`post/${eachPost.link}`} element={<Reader
                      title={eachPost.title}
                      category={eachPost.category}
                      author={eachPost.author}
                      authordp={allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.profileimage}
                      authorlink={eachPost.authorlink}
                      date={eachPost.date}
                      read={eachPost.readtime}
                      mainpost={eachPost.postbody}
                      upvotes={eachPost.upvotes}
                      downvotes={eachPost.downvotes}
                      id={eachPost._id}
                      image={eachPost.image}
                      replies={eachPost.replies}
                    />}
                  />

                )
              })
            }

{
              allUsers.map(eachUser => {
                return (
                  <Route
                    path={`user/${eachUser.link}`} element={<OtherUser
                      firstname={eachUser.firstname}
                      lastname={eachUser.lastname}
                      specialty={eachUser.specialty}
                      gender={eachUser.gender}
                      about={eachUser.about}
                      origin={eachUser.origin}
                      residence={eachUser.residence}
                      avatar={eachUser.profileimage}
                      date={eachUser.date}
           
                      posts={allPosts.filter(a => { return a.authormail === eachUser.email })}
                    />}
                  />

                )
              })
            }



            <Route path="profile" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
            />
            <Route path="write" element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
            />
            <Route path="categories" element={<Topics />} />
            {/* <Route path="profile" element={<Dashboard />} /> */}
            <Route path="profile/salt-bae" element={<OtherUser />} />
            <Route path="blogposts" element={<AllPosts icon={<FaClock />} latestOrtrending="RECENT POSTS" sub="Check out the most recent blogs on Firxt.." />} />
            <Route path="trending" element={<AllPosts icon={<ImFire />} latestOrtrending="TRENDING NOW" sub="Hot topics right now..." />} />

            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
