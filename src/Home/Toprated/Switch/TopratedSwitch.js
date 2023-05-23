import React, { Component } from "react";
import "./TopratedSwitch.scss";
import axios from "axios";
export default class TopratedSwitch extends Component {
    async handleClick(Num) {
        if (Num === 1) {
            let res1 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
            let genre = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
            this.props.setData(res1.data.results, genre.data.genres, 1, Num)
        }
        else {
            let res1 = await axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
            let genre = await axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
            this.props.setData(res1.data.results, genre.data.genres, 1, Num)
        }
    }

    render() {
        return (
            <div className="toprated-switch-wrap">
                {
                    this.props.Movie_TV === 1 ?
                        <>
                            <div className="movie-active ">Movie</div> <div className="tv" onClick={() => this.handleClick(0)}>TV</div>
                        </> :
                        <>
                            <div className="movie" onClick={() => { this.handleClick(1) }}>Movie</div><div className="tv-active">TV</div>
                        </>
                }
            </div>
        )
    }
}