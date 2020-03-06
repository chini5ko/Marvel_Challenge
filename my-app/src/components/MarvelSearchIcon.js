import React, { useState } from 'react';
import style from './marvelSearchIconStyle.module.css';
import marvelSearchIcon from '../svg/marvelSearchIcon.svg'
 import marvelSearchIconHover from '../svg/marvelSearchIconHover.svg'

const MarvelSearchIcon = () => {
    const [searchIcon, isHovered] = useState(false);

    function searchIconHovered(){
        isHovered(true);
    }

    function searchIconNotHovered() {
        isHovered(false);
    }

    return (
          <img onMouseOver={searchIconHovered} onMouseOut={searchIconNotHovered} alt="marvel-search-icon"
          className={style.icon} src={searchIcon ? marvelSearchIconHover : marvelSearchIcon}></img>
        
    )
}

export default MarvelSearchIcon;