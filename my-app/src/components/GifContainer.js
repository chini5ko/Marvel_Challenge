import React, { Component } from 'react'
import $ from 'jquery'
import style from './gifContainerStyle.module.css'
import EachGiftEl from './EachGifContainer'

class GifContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trendingGifs: null,
            searchGifs: null,
            didUserSearch: props.didUserSearch
        };
    }

    componentDidMount() {
        this.renderTrending();
    }

    renderImgElement(url_giphy_request, type) {
        var items = []

        // fetch JSON from Giphy
        fetch(url_giphy_request)
        .then((response) => {
            return response.json();
        })
        .then((giphyJson) => {

            var data = giphyJson['data'];
                
            for (const d of data.entries()) {
                let index = d[0];
                let gifJson = d[1];
                let images = gifJson.images;
                let downsized = images['downsized'];
                let downsizedURL = downsized['url'];

               items.push(<EachGiftEl index={index} key={index} gifURL={downsizedURL}></EachGiftEl>)
            }


            if(items.length==0){
                items.push(<h6>No Gifs for this search: { this.props.searchValue} </h6>)
            }
            if(type=='trending'){
                this.setState({ trendingGifs: items })
            }
            if(type=='search'){
                this.setState({ searchGifs: items })
            }

        }).catch(function(){
            items.push(<h6 >Failed Connection </h6>)
        });

               

        // $.ajax({
        //     type: "GET",
        //     url: url_giphy_request,
        //     dataType: "json",
        //     contentType: "application/json; charset=utf-8",
        //     success: function (giphyJson) {
        //         console.log("ajax! type: " + type)
        //         var data = giphyJson['data'];
                
        //         for (const d of data.entries()) {
        //             let index = d[0];
        //             let gifJson = d[1];
        //             let images = gifJson.images;
        //             let downsized = images['downsized'];
        //             let downsizedURL = downsized['url'];

        //            items.push(<EachGiftEl index={index} gifURL={downsizedURL}></EachGiftEl>)
        //         }


        //         if(items.length==0){
        //             items.push(<h6>No Gifs for this search: { this.props.searchValue} </h6>)
        //         }
        //         if(type=='trending'){
        //             this.setState({ trendingGifs: items })
        //         }
        //         if(type=='search'){
        //             this.setState({ searchGifs: items })
        //         }
            
        //     }.bind(this),
        //     error: function (request, status, error) {
        //         items.push(<h6>Failed Connection </h6>)
              
        //             this.setState({ trendingGifs: items,
        //                 searchGifs: items
        //              })
                
        //         console.log("Error");
        //         console.log(request)
        //         console.log(status)
        //         console.log(error)

        //     }.bind(this)
        // });

      
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