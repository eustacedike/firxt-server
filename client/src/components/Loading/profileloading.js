
import { useState, useEffect } from 'react';

import './loading.css';

import { FaExclamationCircle } from 'react-icons/fa';




function PreLoader(props) {




    return (
        <div className="Loading2">


            <div class="ring" style={{ color: "#4A0404" }}>{props.h1}
                <span></span>
            </div>



        </div>
    );
}

export default PreLoader;
