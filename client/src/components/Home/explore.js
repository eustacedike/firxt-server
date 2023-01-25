

import { Link } from 'react-router-dom';


import './home.css';

import { FaHashtag,  } from 'react-icons/fa';
import {ImEarth} from 'react-icons/im';
import {BsUiChecksGrid} from 'react-icons/bs';


import categories from "../categories.json";




import dp from "./assets/bg17.png"


function Explore() {


  const posts = [
    { id: 1, title: "Metalogy X Global Ambassador Program", category: "Tech", author: "Eustace Dike", authordp: dp, date: "Jan 01, 2023", read: 5, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
    { id: 2, title: "Why you should care about p2p social", category: "Finance", author: "Uri Valeski", authordp: dp, date: "Dec 04, 2022", read: 10, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },
    { id: 3, title: "Top ten best meals for breakfast", category: "Food", author: "Salt Bae", authordp: dp, date: "Sep 02, 2021", read: 2, post: "What’s the Metalogy X Ambassadors Program? This Ambassadors Program is created by/for individuals that are enthusiastic about all-things Web3 and are willing to help the Metalogy X's community grow.." },


  ]

  // const categories = ["Automobiles", "Phones", "Movies", "Music", "Books", "Celebrity", "Sports", "Finance", "Crypto", "Tech", "Food"]
  // const tags = ["twitter", "lagos", "election", "workout", "ronaldo", "burnaboy", "japa", "drake", "sales", "newyear"]


  const linkStyle = {
    textDecoration: "none",
    color: "unset"
  }

  const sliced = Object.fromEntries(
    Object.entries(categories.cats).slice(0, 15));

    const takeUp = () => {
      window.scroll(0,0)
    }

  return (
    <div className="Explore">
      {/* <h1>{categories.cats.Automobiles.name}</h1> */}
      
    {/* {
      Object.keys(categories.cats).map(key =>
      <h1>{categories.cats[key].name}</h1>)
    }
       */}
      <h1><ImEarth style={{verticalAlign: "-4.5px"}}/> EXPLORE</h1>

      <h2><BsUiChecksGrid/> Popular Categories</h2> 
      <div className="xplore-cats">

      {
      Object.keys(sliced).map(key =>
        <button> <Link onClick={takeUp} to={`/blog/${categories.cats[key].name}`} style={linkStyle}>{categories.cats[key].name}</Link></button>)
    }
      
        
        {/* {categories.categories.map(categoryy => {
          return (
            <button> <Link to="/" style={linkStyle}>{categoryy}</Link></button>
          )
        })} */}

        
      </div>
<Link onClick={takeUp} to="/categories">Explore all categories</Link>
      <h2><FaHashtag/> Tags</h2> 
      <div className="xplore-cats">
        
        {categories.tags.map(tag => {
          return (
            <button> <Link onClick={takeUp} to="/" style={linkStyle}>#{tag}</Link></button>
          )
        })}

<br/>
        

      </div>
      <Link onClick={takeUp} to="/categories">check out more tags</Link>
</div>
    
  );
}

export default Explore;
