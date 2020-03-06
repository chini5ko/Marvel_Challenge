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
            emptyWarningDisplayed: false
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

        if (!this.state.didFirstSearchOcurred) {
            this.setState({ emptyWarningDisplayed: true })
        }
    }

    displayEmptyWarning() {
        if (this.state.emptyWarningDisplayed && this.state.searchCurrentValue.length == 0) {
            return <h6 className={style.warning}>Search field is empty. Default value for empty search is Marvel</h6>
        }
        else {
            return null;
        }
    }


    render() {
        return (
            <div>

                <div className={style.containerWrap}>
                    <div className={style.searchBarContainer}>

                        <input type="text" placeholder="Search GIFs" onKeyUp={this.handleKeyPress} className={style.searchBar} autoFocus />

                        <div onClick={this.performSearch} className={style.searchIConContainer}>
                            <MarvelSearchIcon />
                        </div>

                        <div>{this.displayEmptyWarning()}</div>
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
