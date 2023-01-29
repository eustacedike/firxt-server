  
  
  
  import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { useCookies } from "react-cookie";

import axios from 'axios';
  
  
  export const upvote = (a,b) => {
        axios.post("/api/posts/upvote", {id: a, val: 1})
          .then(console.log("upvoted")
          )
          .catch(err => {
            console.log(err.response.data);
        });

        axios
        .post("/api/users/upvote", {
            email: b,
            postId: a,
        })

        .catch(err => {
            const errors = err.response.data;
            console.log(err.response.data)
        });
  
      };

    // const downvote = () => {
    //     axios.post("/api/posts/downvote", {id: props.id, val: 1})
    //       .then(console.log("downvoted")
    //       )
    //       .catch(err => {
    //         console.log(err.response.data);
    //       });
  
    //   };