import React, { Component } from 'react'
import style from './EachGifContainer.module.css'

class EachGifContainer extends Component {

    openNewTabForGif(url) {
        window.open(url, '_blank');
    }

    render() {
        return (
                <img src={this.props.gifURL} key={this.props.index} alt={this.props.title} type={this.props.type}
                onClick={() => this.openNewTabForGif(this.props.gifEmbed_url)}  
                className={`${style.imgSize} ${style.cursor}  ${style.gifInteraction}`}  ></img>
        )
    }
}

export default EachGifContainer