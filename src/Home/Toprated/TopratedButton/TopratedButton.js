import "./TopratedButton.scss"
import axios from "axios";
import React, { Component } from "react";
export default class TopratedButton extends Component {
    async handleFirst() {
        if (this.props.Movie_TV === 1) {
            let res1 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
            this.props.setToprated_Page(res1.data.results, 1)
        }
        else {
            let res1 = await axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
            this.props.setToprated_Page(res1.data.results, 1)
        }


    }

    async handlePrev() {
        let a = this.props.Page - 1
        if (this.props.Movie_TV === 1) {
            let res1 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + a)
            this.props.setToprated_Page(res1.data.results, a)
        }
        else {
            let res1 = await axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + a)
            this.props.setToprated_Page(res1.data.results, a)
        }

    }
    async handleNext() {
        let a = this.props.Page + 1
        if (this.props.Movie_TV === 1) {
            let res1 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + a)
            this.props.setToprated_Page(res1.data.results, a)
        }
        else {
            let res1 = await axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=' + a)

            this.props.setToprated_Page(res1.data.results, a)
        }

    }
    async handleLast() {
        if (this.props.Movie_TV === 1) {
            let res1 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=10')

            this.props.setToprated_Page(res1.data.results, 10)
        }
        else {
            let res1 = await axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=10')
            this.props.setToprated_Page(res1.data.results, 10)
        }

    }
    render() {
        return (<div className="toprated-button-container">
            {this.props.Page && this.props.Page > 1 ? <button className="first" onClick={() => this.handleFirst()}>First</button> : <></>}
            {this.props.Page && this.props.Page > 1 ? <button className="prev" onClick={() => this.handlePrev()}>Prev</button> : <></>}
            <div className="page">{this.props.Page}</div>
            {this.props.Page && this.props.Page < 10 ? <button className="next" onClick={() => this.handleNext()}>Next</button> : <></>}
            {this.props.Page && this.props.Page < 10 ? <button className="last" onClick={() => this.handleLast()}>Last</button> : <></>}
        </div>)

    }
}