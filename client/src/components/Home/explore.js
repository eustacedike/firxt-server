


import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';


import './home.css';

import { FaHashtag, } from 'react-icons/fa';
import { ImEarth } from 'react-icons/im';
import { BsUiChecksGrid } from 'react-icons/bs';


import categories from "../categories.json";




import dp from "./assets/bg17.png"


function Explore() {


  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['user']);


  const findThem = (a) => {

    setCookie('searchitem', a, { path: '/' })

    navigate(`/tag`)

    setTimeout(() => { window.location.reload() }, 200);

  }

  const linkStyle = {
    textDecoration: "none",
    color: "unset"
  }

  const sliced = Object.fromEntries(
    Object.entries(categories.cats).slice(0, 15));

  const takeUp = () => {
    window.scroll(0, 0)
  }

  return (
    <div className="Explore">

      <h1><ImEarth style={{ verticalAlign: "-4.5px" }} /> EXPLORE</h1>

      <h2><BsUiChecksGrid /> Popular Categories</h2>
      <div className="xplore-cats">

        {
          Object.keys(sliced).map(key =>
            <button> <Link onClick={takeUp} to={`/blog/${categories.cats[key].name}`} style={linkStyle}>{categories.cats[key].name}</Link></button>)
        }



      </div>
      <Link onClick={takeUp} to="/categories">Explore all categories</Link>
      <h2><FaHashtag /> Tags</h2>
      <div className="xplore-cats">

        {categories.tags.map(tag => {
          return (
            <button onClick={() => { findThem(tag);takeUp() }} > #{tag} </button>
          )
        })}

        <br />


      </div>
    </div>

  );
}

export default Explore;
