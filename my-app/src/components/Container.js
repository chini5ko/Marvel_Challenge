import React, { Component } from 'react'
import GifContainer from './GifContainer'
import style from './containerStyles.module.css'
import MarvelSearchIcon from './MarvelSearchIcon'

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            didUserSearch: false,
            searchCurrentValue: "",
            emptyWarningDisplayed: false,
            currentGitsDescription: "Trending GIFs"
        };
        this.gifContainerEl = React.createRef();
    }

    handleKeyPress = (event) => {

        this.setState({
            searchCurrentValue: event.target.value,
            didUserSearch: false,
            emptyWarningDisplayed: false
        })

        if (event.key === 'Enter') {
            this.performSearch();
        }
    }

    performSearch = () => {
        this.gifContainerEl.current.renderSearch();
        this.setState({currentGitsDescription: this.state.searchCurrentValue})

        if(this.state.searchCurrentValue.length===0){
            this.setState({emptyWarningDisplayed: true,
                           currentGitsDescription: "Marvel"})
             }
    }

    displayEmptyWarning() {
        if (this.state.emptyWarningDisplayed) {
            return <h6 className={style.warning}>Search field is empty<br/> Default value for empty search is Marvel</h6>
        }
        else {
            return null;
        }
    }

    clickedHome = () =>{
        this.gifContainerEl.current.renderTrending();
        this.setState({currentGitsDescription: "Trending GIFs"})
    }


    render() {
        return (
            <div>

                <div className={style.containerWrap}>
                <div onClick={this.clickedHome} className={style.home}>Home</div>
                    <div className={style.searchBarContainer}>

                        <input type="text" placeholder="Search GIFs" onKeyUp={this.handleKeyPress} className={style.searchBar} autoFocus />

                        <div onClick={this.performSearch} className={style.searchIConContainer}>
                            <MarvelSearchIcon />
                        </div>

                        <div className={style.warningContainer}>{this.displayEmptyWarning()}</div>
                    </div>
                <div className={style.currentGifDes}> #{this.state.currentGitsDescription}</div>

                    <div className={style.gifDisplayContainer}>
                        <GifContainer ref={this.gifContainerEl} didUserSearch={this.state.didUserSearch} searchValue={this.state.searchCurrentValue} />

                    </div>
                </div>
            </div>
        )
    }
}

export default Container
