  
  
  
  import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { useCookies } from "react-cookie";

import axios from 'axios';
  
  
export const upvote = (a,b) => {
        
              axios.post("/api/users/upvote", {
                  email: b,
                  postId: a,
              })
             .then(res => {
                  console.log(parseInt(res.data));
                  axios.post("/api/posts/upvote", {id: a, val: parseInt(res.data)})
                   // .then(res2 => console.log(res2))
                  .catch(err => {
                  console.log(err.response.data);
                  });

              })
              .catch(err => {
                const errors = err.response.data;
                console.log(err.response.data)
              });
  
      };

      export const downvote = (a,b) => {
        
        axios.post("/api/users/downvote", {
            email: b,
            postId: a,
        })
       .then(res => {
            console.log(parseInt(res.data));
            axios.post("/api/posts/downvote", {id: a, val: parseInt(res.data)})
            .catch(err => {
            console.log(err.response.data);
            });

        })
        .catch(err => {
          const errors = err.response.data;
          console.log(err.response.data)
        });

};

      export const bookmark = (a,b) => {
        
        axios.post("/api/users/bookmark", {
            email: b,
            postId: a,
        })
       .then(res => {
            console.log(parseInt(res.data));
            axios.post("/api/posts/bookmark", {id: a, val: parseInt(res.data)})
            .catch(err => {
            console.log(err.response.data);
            });

        })
        .catch(err => {
          const errors = err.response.data;
          console.log(err.response.data)
        });

};