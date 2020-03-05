import React, { Component } from 'react'
import $ from 'jquery'
import GifContainer from './GifContainer'
import style from './containerStyles.module.css'
import searchIcon from '../svg/marvelSearchIcon.svg'
import hoveredSearchIcon from '../svg/marvelSearchIconHover.svg'

class Container extends Component {

    constructor(props) {

        //hardcoded 
        super(props);
        this.state = {
            didUserSearch: false,
            urlImage: null,
            requestJson: null,
            hoverSearch: false,
            searchCurrentValue: "",
            emptyWarningDisplayed: false
        };
        
        this.gifContainerEl =  React.createRef();
    }

    handleKeyPress = (event) => {

        this.setState({
            searchCurrentValue: event.target.value,
            didUserSearch: false,
            emptyWarningDisplayed:false
        })

        if (event.key === 'Enter') {
            this.performSearch();
        }
    }

    searchIconHovered = () => {
        this.setState({
            hoverSearch: true
        })
    }

    searchIconNotHovered = () => {
        this.setState({
            hoverSearch: false
        })
    }

    performSearch = () => {
        this.gifContainerEl.current.renderSearch(); 

        if(!this.state.didFirstSearchOcurred){
            this.setState({emptyWarningDisplayed:true})
        }
    }

    displayEmptyWarning(){
        if(this.state.emptyWarningDisplayed && this.state.searchCurrentValue.length==0 ){
            return <h6 className={style.warning}>Search field is empty. Default value for empty search is Marvel</h6>
        }
        else{
            return null;
        }
    }


    render() {
        return (
            <div>

                <div className={style.containerWrap}>
                    <div className={style.searchBarContainer}>

                        <input type="text" placeholder="Search" onKeyUp={this.handleKeyPress} className={style.searchBar} />

                        <div onClick={this.performSearch} onMouseOver={this.searchIconHovered} onMouseOut={this.searchIconNotHovered} >
                            {this.state.hoverSearch ?
                                <img src={hoveredSearchIcon} className={style.searchICon} alt="marvel-search-icon"></img> :
                                <img src={searchIcon} className={style.searchICon} alt="marvel-search-icon"></img>}
                        </div>
                        {null}
                        <div>{this.displayEmptyWarning()}</div>
                        {/* <h6>Search field is empty. Default value for empty search is Marvel</h6> */}
                    </div>

                    <div className={style.gifDisplayContainer}>
                        <GifContainer ref={this.gifContainerEl} didUserSearch={this.state.didUserSearch} searchValue={this.state.searchCurrentValue} />
                                
                    </div>

                </div>
            </div>
        )
    }
}

export default Container
