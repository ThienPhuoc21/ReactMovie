import React from "react";
import './TVPagebutton.scss';
import axios from "axios";
class TVPagebutton extends React.Component {
    async handleNext(currentPage, query, filter, year) {
        this.props.setLoading(true)
        if (this.props.mode === 1) {
            let res1 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage) * 3 + 1))
            let res2 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage) * 3 + 2))
            let res3 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage) * 3 + 3))
            let arr = res1.data.results.concat(res2.data.results, res3.data.results)
            this.props.setData(arr, currentPage + 1)
            console.log(1)

        }
        else if (this.props.mode === 2) {
            let res1 = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&query=' + (query) + '&page=' + ((currentPage) * 3 + 1))
            let res2 = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&query=' + (query) + '&page=' + ((currentPage) * 3 + 2))
            let res3 = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&query=' + (query) + '&page=' + ((currentPage) * 3 + 3))
            let arr = res1.data.results.concat(res2.data.results, res3.data.results)
            this.props.setData(arr, currentPage + 1)
            console.log(2)
        }
        else if (this.props.mode === 3) {
            let genres = filter.toString();
            let res1 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage) * 3 + 1) + '&with_genres=' + genres)
            let res2 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage) * 3 + 1) + '&with_genres=' + genres)
            let res3 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage) * 3 + 1) + '&with_genres=' + genres)
            let arr = res1.data.results.concat(res2.data.results, res3.data.results)
            this.props.setData(arr, currentPage + 1)
            console.log(3)
        }
        else if (this.props.mode === 4) {
            let years = year.toString()
            let res1 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage) * 3 + 1) + '&primary_release_year=' + years)
            let res2 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage) * 3 + 2) + '&primary_release_year=' + years)
            let res3 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage) * 3 + 3) + '&primary_release_year=' + years)
            let arr = res1.data.results.concat(res2.data.results, res3.data.results)
            this.props.setData(arr, currentPage + 1)
            console.log(4)
        }
        this.props.setLoading(false)
    }
    async handlePrev(currentPage, query, filter, year) {
        this.props.setLoading(true)
        if (this.props.mode === 1) {
            let res1 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage - 2) * 3 + 1))
            let res2 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage - 2) * 3 + 2))
            let res3 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage - 2) * 3 + 3))
            let arr = res1.data.results.concat(res2.data.results, res3.data.results)
            this.props.setData(arr, currentPage - 1)
            console.log(1)
        }
        else if (this.props.mode === 2) {
            let res1 = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&query=' + (query) + '&page=' + ((currentPage - 2) * 3 + 1))
            let res2 = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&query=' + (query) + '&page=' + ((currentPage - 2) * 3 + 2))
            let res3 = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&query=' + (query) + '&page=' + ((currentPage - 2) * 3 + 3))
            let arr = res1.data.results.concat(res2.data.results, res3.data.results)
            this.props.setData(arr, currentPage - 1)
            console.log(2)
        }
        else if (this.props.mode === 3) {
            let genres = filter.toString();
            let res1 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage - 2) * 3 + 1) + '&with_genres=' + genres)
            let res2 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage - 2) * 3 + 1) + '&with_genres=' + genres)
            let res3 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage - 2) * 3 + 1) + '&with_genres=' + genres)
            let arr = res1.data.results.concat(res2.data.results, res3.data.results)
            this.props.setData(arr, currentPage - 1)
            console.log(3)
        }
        else if (this.props.mode === 4) {
            let years = year.toString()
            let res1 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage - 2) * 3 + 1) + '&primary_release_year=' + years)
            let res2 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage - 2) * 3 + 2) + '&primary_release_year=' + years)
            let res3 = await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((currentPage - 2) * 3 + 3) + '&primary_release_year=' + years)
            let arr = res1.data.results.concat(res2.data.results, res3.data.results)
            this.props.setData(arr, currentPage - 1)
            console.log(4)
        }
        this.props.setLoading(false)
    }
    render() {
        return (
            <div className="page-button-container">
                {this.props.currentPage > 1 ?
                    <>
                        <button className="prev" onClick={(event) => this.handlePrev(this.props.currentPage, this.props.query, this.props.listFilter, this.props.year)}>Prev</button>
                    </> : <></>}
                <button className="next" onClick={(event) => this.handleNext(this.props.currentPage, this.props.query, this.props.listFilter, this.props.year)}>Next</button>
            </div >)
    }
}
export default TVPagebutton