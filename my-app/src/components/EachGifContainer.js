import React, { Component } from 'react'
import style from './EachGifContainer.module.css'

class EachGifContainer extends Component {

    openNewTabForGif(url) {
        window.open(url, '_blank');
    }

    render() {
        return (
                <img src={this.props.gifURL} key={this.props.index} alt='gif' onClick={() => this.openNewTabForGif(this.props.gifURL)} 
                className={`${style.imgSize} ${style.cursor}  ${style.gifInteraction}`}  ></img>
        )
    }
}

export default EachGifContainer