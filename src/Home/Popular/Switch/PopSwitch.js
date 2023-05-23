import React, { Component } from "react";
import "./PopSwitch.scss";
import axios from "axios";
export default class PopSwitch extends Component {
    async handleClick(Num) {
        if (Num === 1) {
            let res1 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
            let res2 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=2')
            let res3 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=3')
            let arr = res1.data.results.concat(res2.data.results, res3.data.results)
            let genre = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
            const valueToRemove = undefined;
            let new_arr = arr.filter(item => item !== valueToRemove);
            this.props.setData(new_arr, genre.data.genres, 1)
            this.props.setMovie_TV(Num)
        }
        else {
            let res1 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
            let res2 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=2')
            let res3 = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=3')
            let arr = res1.data.results.concat(res2.data.results, res3.data.results)
            let genre = await axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
            const valueToRemove = undefined;
            let new_arr = arr.filter(item => item !== valueToRemove);
            this.props.setData(new_arr, genre.data.genres, 1)
            this.props.setMovie_TV(Num)
        }
    }

    render() {
        return (
            <div className="pop-switch-wrap">
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