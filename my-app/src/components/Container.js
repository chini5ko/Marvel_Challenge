import React, { Component } from 'react'
import $ from 'jquery'
import GifContainer from './GifContainer'
import style from './containerStyles.module.css'
import searchIcon from '../svg/marvelSearchIcon.svg'
import hoveredSearchIcon  from '../svg/marvelSearchIconHover.svg'

class Container extends Component {

    constructor(props) {

        //hardcoded 
        super(props);
        this.state = {
            didUserSearch: false,
            searchValue: '',
            urlImage: null,
            requestJson: null, 
            hoverSearch: false
        };
    }

    handleSearch = (event) => {
        //console.log('search: ', event.target.value);
        if (event.key === 'Enter') {
            this.setState({
                didUserSearch: true,
                searchValue: event.target.value
            })
        }
    }

    searchIconHovered=()=>{
        this.setState({
            hoverSearch:true
        })
    }

    searchIconNotHovered=()=>{
        this.setState({
            hoverSearch:false
        })
    }

    

 

    render() {
        return (
            <div>

                <div className={style.containerWrap}>
                    <div className={style.searchBarContainer}>
                        <input type="text" placeholder="Search" onKeyPress={this.handleSearch} className={style.searchBar} />

                        {/* <div onMouseOver={this.searchIconHovered} >
                        <img  src={searchIcon} className={style.searchICon}  alt="marvel-search-icon"></img>
                        </div> */}
                        <div onMouseOver={this.searchIconHovered}  onMouseOut={this.searchIconNotHovered} > 
                        {this.state.hoverSearch ?
                         <img  src={hoveredSearchIcon} className={style.searchICon}  alt="marvel-search-icon"></img> :
                         <img  src={searchIcon} className={style.searchICon}  alt="marvel-search-icon"></img> }  
                        </div>


                    </div>

                    {/* <img src={this.state.urlImage} height='200px' alt='gif' ></img> */}
                    <GifContainer search={this.state.didUserSearch} searchValue={this.state.searchValue} />

                </div>



            </div>
        )
    }
}

export default Container
