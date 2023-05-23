import "./Button.scss"
import axios from "axios"
import React, { Component } from "react";
export default class Button extends Component {
    async handleFirst() {
        if (this.props.Movie_TV === 1) {
            let res1 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
            let res2 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=2')
            let res3 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=3')
            let arr = res1.data.results.concat(res2.data.results, res3.data.results);
            let genre = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
            const valueToRemove = undefined;
            let new_arr = arr.filter(item => item !== valueToRemove);
            this.props.setData(new_arr, genre, 1)
        }
        else {
            let res1 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
            let res2 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=2')
            let res3 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=3')
            let arr = res1.data.results.concat(res2.data.results, res3.data.results);
            let genre = await axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
            const valueToRemove = undefined;
            let new_arr = arr.filter(item => item !== valueToRemove);
            this.props.setData(new_arr, genre, 1)
        }

    }

    async handlePrev() {
        if (this.props.Movie_TV === 1) {
            let res1 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page - 2) * 3 + 1))
            let res2 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page - 2) * 3 + 2))
            let res3 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page - 2) * 3 + 3))
            let arr = res1.data.results.concat(res2.data.results, res3.data.results);
            let genre = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
            const valueToRemove = undefined;
            let new_arr = arr.filter(item => item !== valueToRemove);
            this.props.setData(new_arr, genre, this.props.Page - 1)
        }
        else {
            let res1 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page - 2) * 3 + 1))
            let res2 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page - 2) * 3 + 2))
            let res3 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page - 2) * 3 + 3))
            let arr = res1.data.results.concat(res2.data.results, res3.data.results);
            let genre = await axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
            const valueToRemove = undefined;
            let new_arr = arr.filter(item => item !== valueToRemove);
            this.props.setData(new_arr, genre, this.props.Page - 1)
        }
    }
    async handleNext() {
        if (this.props.Movie_TV === 1) {
            let res1 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page) * 3 + 1))
            let res2 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page) * 3 + 2))
            let res3 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page) * 3 + 3))
            let arr = res1.data.results.concat(res2.data.results, res3.data.results);
            let genre = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
            const valueToRemove = undefined;
            let new_arr = arr.filter(item => item !== valueToRemove);
            this.props.setData(new_arr, genre, this.props.Page + 1)
        }
        else {
            let res1 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page) * 3 + 1))
            let res2 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page) * 3 + 2))
            let res3 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + ((this.props.Page) * 3 + 3))
            let arr = res1.data.results.concat(res2.data.results, res3.data.results);
            let genre = await axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
            const valueToRemove = undefined;
            let new_arr = arr.filter(item => item !== valueToRemove);
            this.props.setData(new_arr, genre, this.props.Page + 1)
        }
    }
    render() {
        return (<div className="button-container">
            {this.props.Page && this.props.Page > 1 ? <button className="first" onClick={() => this.handleFirst()}>First</button> : <></>}
            {this.props.Page && this.props.Page > 1 ? <button className="prev" onClick={() => this.handlePrev()}>Prev</button> : <></>}
            <div className="page">{this.props.Page}</div>
            <button className="next" onClick={() => this.handleNext()}>Next</button>
        </div>)

    }
}