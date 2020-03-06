import React, { Component } from 'react'
import style from './EachGifContainer.module.css'

class EachGifContainer extends Component {
    render() {
        return (
                <img src={this.props.gifURL} key={this.props.downsizedURL} alt='gif' 
                className={`${style.imgSize} ${style.cursor}  ${style.gifInteraction}`}  ></img>
        )
    }
}

export default EachGifContainer