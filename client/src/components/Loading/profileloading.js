
import { useState, useEffect } from 'react';

import './loading.css';

import { FaExclamationCircle} from 'react-icons/fa';




function PreLoader(props) {

    // const timer = props.timer;

    // const [count, setCount] = useState(0);

    // useEffect (()=>{
    //    const interval = setInterval(()=>{setCount(count+1)},{timer});

    //     return()=>{
    //         clearInterval(interval)
    //     }
    // }, [count]);
    

    return (
        <div className="Loading2">

            {/* <h1>{props.h1}...</h1> */}

            <div class="ring" style={{color: "#4A0404"}}>{props.h1} 
            {/* <p>{count<100 ? count : 100}%</p> */}
  <span></span>
</div>

                

        </div>
    );
}

export default PreLoader;
