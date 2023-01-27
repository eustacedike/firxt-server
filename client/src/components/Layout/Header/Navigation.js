
import '../layout.css';

import { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import axios from 'axios';


import { FaBolt, FaChevronDown, FaSearch, FaPenFancy, FaClock, FaUser } from 'react-icons/fa';
import { ImFire } from 'react-icons/im';
import { BsUiChecksGrid } from 'react-icons/bs';


import categories from "../../categories.json";

let Topics = [];
Object.keys(categories.cats).map(key =>
  Topics.push(categories.cats[key].name)
  )
// console.log(Topics);




function Navigation() {

  const [whitenav, setWhitenav] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [searchitems, setSearchitems] = useState("");
  const [itemsToDisplay, setItemsToDisplay] = useState([]);


  const location = useLocation();


  const filteredItems = Topics.filter(
    item =>
      item.toLocaleLowerCase().includes(searchitems) ||
      item.toLocaleLowerCase().includes(searchitems)
  );


  const findThem = (e) => {
    setSearchitems(e.target.value.toLocaleLowerCase());
    // filteredItems.length !== 0 ? setItemsToDisplay(filteredItems) : setItemsToDisplay(["Not found"]);
    setItemsToDisplay(filteredItems)
    console.log(itemsToDisplay.length>0)
    console.log(itemsToDisplay.length)
  }

  const openMobile = () => {
    setMobile(value => !value)
  }

  const takeUp = () => {
    window.scroll(0, 0)
  }

 


  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 10) {
      setWhitenav(true)
    } else {
      setWhitenav(false)
    }
  })

  window.onclick = (event) => {

    if (!event.target.closest(".menu")) {
      setMobile(false);

    }

  }



  const setAuthToken = token => {
    if (token) {
      // Apply authorization token to every request if logged in
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  //   Log user out
const logoutUser = () => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  setCookie('isAuthenticated', false, { path: '/' });
  removeCookie('FirstName', { path: '/' });
  removeCookie('LastName', { path: '/' });
  removeCookie('Email', { path: '/' });
  removeCookie('Role', { path: '/' });
  window.location.reload();
  };


  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const isAuthenticated = (cookies.isAuthenticated === 'true');



  const sliced = Object.fromEntries(
    Object.entries(categories.cats).slice(0, 8));

  const linkStyle = {
    textDecoration: "none",
    color: "unset"
  }

  return (

    <header>
      <div
        // className={location.pathname === "/blogposts"? "Navigation nav-alt" : "Navigation"}
        className={location.pathname === "/blogposts" ? "Navigation nav-alt" :
          location.pathname === "/trending" ? "Navigation nav-alt" :
            location.pathname === "/write" ? "Navigation nav-alt" :
              location.pathname === "/categories" ? "Navigation nav-alt2" :
                location.pathname === "/loading" ? "Navigation nav-alt2" :
                "Navigation"}

        style={{
          backgroundColor: whitenav ? "white" : "",
          boxShadow: whitenav ? "0px 2px 13px grey" : ""
        }}

      // style={{backgroundColor: location.pathname === "/blogposts"? "black" : "",
      // boxShadow: location.pathname === "/blogposts"? "0px 2px 13px grey" : ""}}

      >
        <Link onClick={takeUp} to="/" style={linkStyle}><h2 className='logo'><FaBolt />Firxt</h2></Link>

       

        <nav>
          <button className='write'><Link to="/write" style={linkStyle}><span>Post</span><FaPenFancy /></Link></button>
          <ul>


            <li><FaClock /> <Link onClick={takeUp} to="/blogposts" style={linkStyle}>Latest</Link></li>
            <li><ImFire /> <Link onClick={takeUp} to="/trending" style={linkStyle}>Hottest</Link></li>
            <li><BsUiChecksGrid /> <Link onClick={takeUp} to="/categories" style={linkStyle}>Categories</Link>
              <span> <FaChevronDown /></span>
              <div className="categories">
                <ul>
                  {
                    Object.keys(sliced).map(key =>
                       <li> <Link onClick={takeUp} to={`/blog/${categories.cats[key].name}`} style={linkStyle}>{categories.cats[key].name}</Link></li>)
                    }
                  <li><Link to="/categories">more...</Link></li>
                </ul>
              </div>
            </li>

          </ul>
          <div className="auth">
            <Link onClick={takeUp} to="/profile" style={linkStyle}><button style={{display: isAuthenticated? "" : "none"}}><FaUser/></button></Link>
            <Link onClick={takeUp} to="/login" style={linkStyle}><button style={{display: isAuthenticated? "none" : ""}}>Login</button></Link>
            <Link onClick={takeUp} to="/register" style={linkStyle}><button style={{display: isAuthenticated? "none" : ""}}>Sign Up</button></Link>
            <button onClick={logoutUser} style={{display: isAuthenticated? "" : "none"}}>Log Out</button>
          </div>
          <div className="search">
            <input
            className='searchinput'
              value={searchitems}
              onChange={findThem}
              type="text" name="" id="" placeholder='Search...' />
            <FaSearch />
          
          <div className='search-result'>
        {itemsToDisplay.length !== 0 ? <p></p>:<p>Not Found</p>}
          {itemsToDisplay.map(item => (
            <div className='trial'>
            <Link to={`/blog/${item}`}><p>{item}</p></Link>
            </div>
          ))}
</div>
        </div>
        </nav>

        <div className={mobile ? "menu change" : "menu"}
          onClick={openMobile}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className="menu-content"
        style={{ transform: mobile ? "translateX(0%)" : "translateX(100%)" }}

      >


        <ul>

          <li> <button className='write'><Link onClick={takeUp} to="/write" style={linkStyle}><span>Post</span><FaPenFancy /></Link></button>
          </li>
          <li><FaClock /> <Link onClick={takeUp} to="/blogposts" style={linkStyle}>Latest</Link></li>
          <li><ImFire /> <Link onClick={takeUp} to="/trending" style={linkStyle}>Hottest</Link></li>
          <li><BsUiChecksGrid /> <Link onClick={takeUp} to="/categories" style={linkStyle}>Categories</Link> </li>

        </ul>
        <div>
        <Link onClick={takeUp} to="/profile" style={linkStyle}><button style={{display: isAuthenticated? "" : "none"}}><FaUser/></button></Link>  <br/>
            <Link onClick={takeUp} to="/login" style={linkStyle}><button style={{display: isAuthenticated? "none" : ""}}>Login</button></Link> <br/>
            <Link onClick={takeUp} to="/register" style={linkStyle}><button style={{display: isAuthenticated? "none" : ""}}>Sign Up</button></Link> <br/>
            <button onClick={logoutUser} style={{display: isAuthenticated? "" : "none"}}>Log Out</button>
        </div>

      </div>
    </header>
  );
}

export default Navigation;
