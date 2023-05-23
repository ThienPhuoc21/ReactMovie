import React from "react";
import './TVSearch.scss';
import axios from "axios";
class TVSearch extends React.Component {

    handleType(event) {
        this.props.setQuery(event.target.value)
    }
    async handleSearch() {
        this.props.setLoading(true)
        let res1 = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&query=' + (this.props.query) + '&page=1')
        let res2 = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&query=' + (this.props.query) + '&page=2')
        let res3 = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&query=' + (this.props.query) + '&page=3')
        let arr = res1.data.results.concat(res2.data.results, res3.data.results)
        this.props.setTVandPage(arr, 1)
        let a = []
        this.props.setFilter(a)
        this.props.setMode(2)
        this.props.setLoading(false)
    }
    render() {
        return (<div className="search">
            <h3 className='search-title'>Search</h3>
            <div className="search-wrap">
                <input type="text" placeholder="Tv show name" onChange={(event) => this.handleType(event)}></input>
                <button className="search-button" onClick={(event) => this.handleSearch()}><i className="fas fa-search"></i></button>
            </div>
        </div>)
    }
} export default TVSearch
