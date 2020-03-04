import React, { Component } from 'react'
import $ from 'jquery'

class GifContainer extends Component {

    constructor(props) {

        //hardcoded 
        super(props);
        this.state = {
            trendingGifs: null,
            searchGifs: null,
        };
    }

    // AJAX call for trending 
    componentDidMount() {
        let numberOfSearch = 10;
        var url_giphy_trending = 'https://api.giphy.com/v1/gifs/trending?api_key=Erd7FLQSsRKYF24NdrQl54yQEJ1MOuEv&limit=' +numberOfSearch+'&rating=G';
        this.rederImgElement(url_giphy_trending,'trending');
    }

    rederImgElement(url_giphy_request, type) {
        var items = []
        $.ajax({
            type: "GET",
            url: url_giphy_request,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (giphyJson) {

                var data = giphyJson['data'];

                for (const d of data.entries()) {
                    let index = d[0];
                    let gifJson = d[1];
                    let images = gifJson.images;
                    let downsized = images['downsized'];
                    let downsizedURL = downsized['url'];

                    //console.log( index + " ",  downsizedURL);

                    items.push(<img key={index} src={downsizedURL} height='200px' alt='gif' ></img>)
                }
                if(type=='trending'){
                    this.setState({ trendingGifs: items })
                }
                if(type=='search'){
                    this.setState({ searchGifs: items })
                }

            }.bind(this),
            error: function (request, status, error) {
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    }

    renderSearch(){
        let numberOfSearch = 10;
        var url_giphy_search = 'https://api.giphy.com/v1/gifs/search?api_key=Erd7FLQSsRKYF24NdrQl54yQEJ1MOuEv&q=' + this.props.searchValue+'&limit='+numberOfSearch+'&offset=0&rating=G&lang=en';
        this.rederImgElement( url_giphy_search , 'search');
    }

    render() {
        return (
            <div>
                {this.props.search ? this.renderSearch()  : console.log("no search")}
                {this.props.search ? this.state.searchGifs  : this.state.trendingGifs}
            </div>
        )
    }
}

export default GifContainer