import React, { Component } from 'react'
import $ from 'jquery'
import style from './gifContainerStyle.module.css'

class GifContainer extends Component {
    constructor(props) {

        //hardcoded 
        super(props);
        this.state = {
            trendingGifs: null,
            searchGifs: null,
            didUserSearch: props.didUserSearch
        };
    }

    // AJAX call for trending 
    componentDidMount() {
        this.renderTrending();
    }

    renderImgElement(url_giphy_request, type) {
        var items = []
        $.ajax({
            type: "GET",
            url: url_giphy_request,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (giphyJson) {
                console.log("ajax! type: " + type)
                var data = giphyJson['data'];

                for (const d of data.entries()) {
                    let index = d[0];
                    let gifJson = d[1];
                    let images = gifJson.images;
                    let downsized = images['downsized'];
                    let downsizedURL = downsized['url'];

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
        let numberOfSearch = 20;
        console.log("this.props.searchValue.length val" , this.props.searchValue.length);
        //let searchText =  this.props.searchValue;
        let searchText = (this.props.searchValue.length>0) ? this.props.searchValue : 'Marvel';
        var url_giphy_search = 'https://api.giphy.com/v1/gifs/search?api_key=Erd7FLQSsRKYF24NdrQl54yQEJ1MOuEv&q=' + searchText+'&limit='+numberOfSearch+'&offset=0&rating=G&lang=en';
        
        this.renderImgElement( url_giphy_search , 'search');
        this.setState({ didUserSearch: true })

    }

    renderTrending(){
        let numberOfSearch = 20;
        var url_giphy_trending = 'https://api.giphy.com/v1/gifs/trending?api_key=Erd7FLQSsRKYF24NdrQl54yQEJ1MOuEv&limit=' +numberOfSearch+'&rating=G';
        this.renderImgElement( url_giphy_trending , 'trending');
    }

    render() {
        return (
            <div>
                <div className={style.giftDisplayContainer}>
                    {this.state.didUserSearch ? this.state.searchGifs  : this.state.trendingGifs}
                </div>
         
            </div>
        )
    }
}

export default GifContainer