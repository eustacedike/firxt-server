

import { Link } from 'react-router-dom';


import './category.css';

import { FaUsers } from 'react-icons/fa';
import { ImEarth } from 'react-icons/im';
import { BsUiChecksGrid } from 'react-icons/bs';


import categories from "../categories.json";




import dp from "../Images/topics/baby.png";
import dp2 from "../Images/topics/messi.png";


function Explore() {


  const posts = [
    { id: 1, title: "Metalogy X Global Ambassador Program", category: "Tech", author: "Eustace Dike", authordp: dp, date: "Jan 01, 2023", read: 5, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
    { id: 2, title: "Why you should care about p2p social", category: "Finance", author: "Uri Valeski", authordp: dp2, date: "Dec 04, 2022", read: 10, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
    { id: 3, title: "Top ten best meals for breakfast", category: "Food", author: "Salt Bae", authordp: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg", date: "Sep 02, 2021", read: 2, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },


  ]

  // const users = ["Automobiles", "Phones", "Movies", "Music", "Books", "Celebrity", "Sports", "Finance", "Crypto", "Tech", "Food"]
  // const tags = ["twitter", "lagos", "election", "workout", "ronaldo", "burnaboy", "japa", "drake", "sales", "newyear"]
  const takeUp = () => {
    window.scroll(0,0)
  }

  const linkStyle = {
    textDecoration: "none",
    color: "unset"
  }

  const sliced = Object.fromEntries(
    Object.entries(categories.cats).slice(0, 12));

  return (
    <div className="Explore">

      <h2><FaUsers /> Popular Users</h2>
      <div className="xplore-cats">

        {posts.map(user => {
          return (
            <button className='pUsers'> <Link to="/" onClick={takeUp} style={linkStyle}><img src={user.authordp}></img>{user.author}</Link></button>
          )
        })}
      

      </div>


      <h2><BsUiChecksGrid /> Other Categories</h2>
      <div className="xplore-cats">

      {
      Object.keys(sliced).map(key =>
        <button> <Link onClick={takeUp} to={`/blog/${categories.cats[key].name}`} style={linkStyle}>{categories.cats[key].name}</Link></button>)
    }

      </div> <br/>
<Link onClick={takeUp} to="/categories">View all categories</Link>




    </div>

  );
}

export default Explore;
