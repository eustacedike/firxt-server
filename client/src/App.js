
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
import Searched from "./components/SearchResults/searched";
import Tagged from "./components/SearchResults/tagged";
import Error from "./components/ErrorPage/404page";



import './App.css';

import { FaClock } from "react-icons/fa";
import { ImFire } from 'react-icons/im';

import categories from "./components/categories.json";

//Images


//Private Route
import PrivateRoute from "./Protected Routes/PrivateRoute";

import { getCurrentUser } from "./components/actions/getCurrentUser";

function App() {

  const [allPosts, setAllPosts] = useState([]);

  const getPosts = () => {
    axios.get("api/posts/fetchposts")
      .then((response) => {
        setAllPosts(response.data.reverse());
      });

  };

  const [user, setUser] = useState({ isAuthenticated: false });

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);


  useEffect(() => {
    getPosts();
  }, [allPosts]);



  const [allUsers, setAllUsers] = useState([]);

  const getUsers = () => {
    axios.get("api/users/fetchusers")
      .then((response) => {
        setAllUsers(response.data.reverse());
      });

  };


  useEffect(() => {
    getUsers();
  }, [allUsers])


  const trendPosts = [...allPosts].sort((a, b) => (b.upvotes + b.downvotes) - (a.upvotes + a.downvotes));

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="loading" element={<Loading h1="PUBLISHING" timer={24.3} />} />
            <Route path="searchloading" element={<Loading h1="SEARCHING" timer={200} />} />
            <Route path="search" element={<Searched />} />
            <Route path="tag" element={<Tagged />} />

            {
              Object.keys(categories.cats).map(key =>
                <Route path={`blog/${categories.cats[key].name}`} element={<Category
                  desc={categories.cats[key].name}
                  sub={categories.cats[key].desc}
                  id={categories.cats[key].id}
                  allUsers={allUsers}
                  allPosts={allPosts}
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
                      author={allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.firstname + " " + allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.lastname}
                      authormail={eachPost.authormail}
                      authordp={allUsers.filter(a => { return a.email === eachPost.authormail })[0]?.profileimage}
                      userlikes={allUsers.filter(a => { return a.email === user.email })[0]?.liked}
                      userdislikes={allUsers.filter(a => { return a.email === user.email })[0]?.disliked}
                      userbookmarks={allUsers.filter(a => { return a.email === user.email })[0]?.bookmarked}
                      authorlink={eachPost.authorlink}
                      date={eachPost.date}
                      read={eachPost.readtime}
                      mainpost={eachPost.postbody}
                      upvotes={eachPost.upvotes}
                      downvotes={eachPost.downvotes}
                      id={eachPost._id}
                      image={eachPost.image}
                      replies={eachPost.replies}
                      allUsers={allUsers}
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

                      allUsers={allUsers}
                      allPosts={allPosts}
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


            <Route path="trending" element={<AllPosts
              icon={<ImFire />}
              latestOrtrending="TRENDING NOW"
              sub="Hot topics right now..."
              posts={trendPosts}
            />} />


            <Route path="blogposts" element={<AllPosts
              icon={<FaClock />}
              latestOrtrending="RECENT POSTS"
              sub="Check out the most recent blogs on Firxt.."
              posts={allPosts}
            />} />
            <Route path="*" element={<Error />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
