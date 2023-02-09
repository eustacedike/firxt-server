

import { Link } from 'react-router-dom';


import './category.css';

import { FaUsers } from 'react-icons/fa';
import { ImEarth } from 'react-icons/im';
import { BsUiChecksGrid } from 'react-icons/bs';


import categories from "../categories.json";




import dp from "../Images/topics/baby.png";
import dp2 from "../Images/topics/messi.png";


function Explore(props) {


  const posts = props.allPosts;




  const frequency = posts.reduce((r, v) => {
    r[v.authormail] = (r[v.authormail] || 0) + 1;
    return r;
  }, {});
  const arr = Object.entries(frequency).sort(([, a], [, b]) => b - a);
  const sortable = [];
  arr.map(el => { sortable.push(el[0]) });


  const takeUp = () => {
    window.scroll(0, 0)
  }

  const linkStyle = {
    textDecoration: "none",
    color: "unset"
  }

  const sliced = Object.fromEntries(
    Object.entries(categories.cats).slice(0, 9));


  return (
    <div className="Explore">

      <h2><FaUsers /> Popular Users</h2>
      <div className="xplore-cats">

        {sortable.slice(1, 5).map(user => {
          return (
            <button className='pUsers'>
              <Link to={`/user/${props.allUsers.filter(a => { return a.email === user })[0]?.link}`} onClick={takeUp} style={linkStyle}>
                <img wait={1500} src={props.allUsers.filter(a => { return a.email === user })[0]?.profileimage} />

                {props.allUsers.filter(a => { return a.email === user })[0]?.firstname} &nbsp;
                {props.allUsers.filter(a => { return a.email === user })[0]?.lastname}
              </Link>
            </button>
          )
        })}


      </div>


      <h2><BsUiChecksGrid /> Other Categories</h2>
      <div className="xplore-cats">

        {
          Object.keys(sliced).map(key =>
            <button> <Link onClick={takeUp} to={`/blog/${categories.cats[key].name}`} style={linkStyle}>{categories.cats[key].name}</Link></button>)
        }

      </div> <br />
      <Link onClick={takeUp} to="/categories">View all categories</Link>




    </div>

  );
}

export default Explore;
