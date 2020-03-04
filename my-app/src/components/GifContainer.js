import React, { Component } from 'react'
import $ from 'jquery'


class GifContainer extends Component {

    constructor(props) {

        //hardcoded 
        super(props);
        this.state = {
          urlImage: null,
          requestJson: null, 
          render_IMG_elements:null
        };
      }

    // AJAX call for trending 
      componentDidMount(){

        var url_giphy_request = 'https://api.giphy.com/v1/gifs/trending?api_key=Erd7FLQSsRKYF24NdrQl54yQEJ1MOuEv&limit=12&rating=G';

        //console.log("componentDidMount")
         $.ajax({
            type: "GET",
            url: url_giphy_request,                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(giphyJson){
                
                //this.setState({urlImage: data.data[0].images['480w_still']['url']})

                console.log("ajax call")
                var data = giphyJson['data'];
            
                // var downsized = images['downsized'];
                // var downsizedURL =  downsized['url'];
                // this.setState({urlImage: downsizedURL})

                const items = []
                for (const d of data.entries()) {
                    let index =  d[0];
                    let gifJson = d[1];
                    let images =  gifJson.images;
                    let downsized = images['downsized'];
                    let downsizedURL =  downsized['url'];
      
                    console.log( index + " ",  downsizedURL);
               
                    items.push(<img index={index} src={downsizedURL} height='200px'  alt='gif' ></img>)
                }
                this.setState({render_IMG_elements: items})

            }.bind(this),
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
      }

    render() {
        
        return (
            <div>
                { this.props.search ? console.log("search " + this.props.search ): this.state.render_IMG_elements
                    
                
                    }
            </div>
        )
    }
}

export default GifContainer