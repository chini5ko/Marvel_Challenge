import React, { Component } from 'react'
import EachGiftEl from './EachGifContainer'

class GifContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trendingGifs: null,
            searchGifs: null,
            didUserSearch: props.didUserSearch,
            type:null
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
                let gitTitle = gifJson.title;
                let images = gifJson.images;
                let downsized = images['downsized'];
                let downsizedURL = downsized['url'];
                let gifEmbed_url = gifJson.embed_url;
                
               items.push(<EachGiftEl index={index} key={index} gifURL={downsizedURL} title={gitTitle} gifEmbed_url={gifEmbed_url}
                gifType={this.state.type}></EachGiftEl>)
            }

            if(items.length===0){
                items.push(<h6>No Gifs for this search: { this.props.searchValue} </h6>)
            }
            if(type==='trending'){
                this.setState({ trendingGifs: items })
            }
            if(type==='search'){
                this.setState({ searchGifs: items })
            }

        }).catch(function(){
            items.push(<h6 >Failed Connection </h6>)
        });
    }

    renderSearch(){
        let numberOfSearch = 30;
        let searchText = (this.props.searchValue.length>0) ? this.props.searchValue : 'Marvel';
        var url_giphy_search = 'https://api.giphy.com/v1/gifs/search?api_key=Erd7FLQSsRKYF24NdrQl54yQEJ1MOuEv&q=' + searchText+'&limit='+numberOfSearch+'&offset=0&rating=G&lang=en';
        
        this.renderImgElement( url_giphy_search , 'search');
        this.setState({ didUserSearch: true,
                        type: 'search'
        })
        
    }

    renderTrending(){
        let numberOfSearch = 30;
        var url_giphy_trending = 'https://api.giphy.com/v1/gifs/trending?api_key=Erd7FLQSsRKYF24NdrQl54yQEJ1MOuEv&limit=' +numberOfSearch+'&rating=G';
        this.setState({ didUserSearch: false,
                        type: 'trending' })
        this.renderImgElement( url_giphy_trending , 'trending');
    }

    render() {
        return (
            <div>
                    {this.state.didUserSearch ? this.state.searchGifs  : this.state.trendingGifs}
         
            </div>
        )
    }
}

export default GifContainer