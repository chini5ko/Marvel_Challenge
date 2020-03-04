import React, { Component } from 'react'
import $ from 'jquery'
import GifContainer from './GifContainer'

class Container extends Component {

    constructor(props) {

          //hardcoded 
          super(props);
          this.state = {
            didUserSearch: false, 
            searchValue:'',
            urlImage: null,
            requestJson: null
          };
        }

        handleSearch = (event) => {
            //console.log('search: ', event.target.value);
            if(event.key === 'Enter'){
                this.setState({
                    didUserSearch:true,
                    searchValue:event.target.value
                })
            }
        }


    
    render() {
        return (
            <div>
               
                <input
                type="text"
                placeholder="Search"
                onKeyPress={this.handleSearch}
                />
                
                
                {/* <img src={this.state.urlImage} height='200px' alt='gif' ></img> */}
                <GifContainer search={this.state.didUserSearch} searchValue={this.state.searchValue} />
      

            </div>
        )
    }
}

export default Container
