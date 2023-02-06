


import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { useCookies } from 'react-cookie';


import categories from "../categories.json";

import {getCurrentUser} from "../actions/getCurrentUser";


import './post.css';

import { FaRegImage } from 'react-icons/fa';

function Post() {

  
  const [user, setUser] = useState({isAuthenticated: false});

  useEffect(()=>{
    setUser(getCurrentUser());
  }, []);

  const navigate = useNavigate();


  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postRead, setPostRead] = useState(1);
  const [postCategory, setPostCategory] = useState("");
  const [image, setImage] = useState();



  const [preview, setPreview] = useState();
  function imagePreview(e) {
      // console.log(e.target.files);
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
      document.getElementById('remove-image').style.display = "block";
  }

  const rmvImage = () => {
    setPreview();
      setImage();
      document.getElementById('remove-image').style.display = "none";
  }

  const uploadPost = async (e) => {

    e.preventDefault();


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


    const thePost = {
      title: postTitle,
      postbody: postBody,
      author: user.name,
      authormail: user.email,
      authorlink: user.link,
      readtime: postRead,
      category: postCategory,
      link: postTitle.replace(/ +/g, '-').toLowerCase().replace(/^\s+|\s+$/gm,'') + "-" + Math.floor(Math.random()*500000),
      image: imageUrl,
    }


    const mongoSend = await axios
      .post("/api/posts/postblog", thePost)
      .then(res => {
        console.log(res);

        // navigate(`/loading`);




        // setTimeout(() => {
          navigate(`/post/${thePost.link}`) 
        // } , 3100);
        setTimeout(() => { window.location.reload() }, 200);
      })
      .catch(err => {
        const errors = err.response.data;
        console.log(err.response.data)
      });




  };







  const sorted = Object.keys(categories.cats)
    .sort()
    .reduce(function (acc, key) {
      acc[key] = categories.cats[key];
      return acc;
    }, {});

  return (
    <div className="Post">
      <h1>Post A Blog</h1>
      <form onSubmit={uploadPost} noValidate>
        <input
          className='title'
          type="text"
          placeholder='Title'
          onChange={(e) => { setPostTitle(e.target.value) }}
        /> <br />
        <select
          name=""
          id=""
          onChange={(e) => { setPostCategory(e.target.value) }}
        >
          <option value="">Category</option>
          {
            Object.keys(sorted).map(key =>
              <option value={sorted[key].name}>{sorted[key].name}</option>
            )
          }
        </select>

        <select
          onChange={(e) => { setPostRead(e.target.value) }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>

        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder='Body...'
          onChange={(e) => { setPostBody(e.target.value) }}
        ></textarea> <br />

<p id="remove-image" onClick={rmvImage}>&#10006;</p>
<img className="blog-image-preview" src={preview}/>


        <label htmlFor="file"><FaRegImage /></label>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          onChange={imagePreview}
        />
        <br />
        <hr />
        <button>Publish</button>
      </form>
    </div>
  );
}

export default Post;
