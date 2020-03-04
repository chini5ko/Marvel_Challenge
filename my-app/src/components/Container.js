import React, { Component } from 'react'
import $ from 'jquery'
import GifContainer from './GifContainer'

class Container extends Component {

    constructor(props) {

          //hardcoded 
          super(props);
          this.state = {
            didUserSearch: true, 
            urlImage: null,
            requestJson: null
          };
        }


    
    render() {
        return (
            <div>
               
                <input
                type="text"
                placeholder="Search"
                />
                
                
                {/* <img src={this.state.urlImage} height='200px' alt='gif' ></img> */}
                <GifContainer search={this.state.didUserSearch} urlImage={this.state.urlImage} giftJson={this.state.requestJson} />
      

            </div>
        )
    }
}

export default Container
