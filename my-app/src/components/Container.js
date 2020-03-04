import React, { Component } from 'react'
import $ from 'jquery'

class Container extends Component {

    constructor(props) {

          //hardcoded 
          super(props);
          this.state = {
            urlImage: null,
          };
        }

    //     //hardcoded 
    //     super(props);
    //     this.state = {
    //       urlImage: 'https://media2.giphy.com/media/kaBU6pgv0OsPHz2yxy/giphy-downsized.gif?cid=756900ed6d61b31ff5fcdbe0cf5398cb96696893e8ae0fc9&rid=giphy-downsized.gif',
    //     };
    //   }

    
    componentDidMount(){
        var url_giphy_request = 'https://api.giphy.com/v1/gifs/trending?api_key=Erd7FLQSsRKYF24NdrQl54yQEJ1MOuEv&limit=12&rating=G';
        //this.setState({urlImage: 'https://media2.giphy.com/media/tOT3aXT3TqDVm/480w_s.jpg?cid=756900ed0e51ecd2cfebc7be530ba816cb4bdfe8a39d7317&rid=480w_s.jpg'})

        //console.log("componentDidMount")
         $.ajax({
            type: "GET",
            url: url_giphy_request,                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(giphyJson){
                  
                //this.setState({urlImage: data.data[0].images['480w_still']['url']})

                console.log(giphyJson['data'])
                var data = giphyJson['data'];
                var images =  data[0].images;
                var downsized = images['downsized'];
                var downsizedURL =  downsized['url'];
                this.setState({urlImage: downsizedURL})
                //console.log(downsizedURL);
               

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
                <h1>Nav</h1>
                
                <img src={this.state.urlImage} height='200px' alt='gif' ></img>
                <img src={this.state.urlImage} height='200px' alt='gif' ></img>
                <img src={this.state.urlImage} height='200px' alt='gif' ></img>
                <img src={this.state.urlImage} height='200px' alt='gif' ></img>
                <img src={this.state.urlImage} height='200px' alt='gif' ></img>
                <img src={this.state.urlImage} height='200px' alt='gif' ></img>
                <img src={this.state.urlImage} height='200px' alt='gif' ></img>
      

            </div>
        )
    }
}

export default Container
