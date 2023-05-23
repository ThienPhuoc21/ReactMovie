import React, { Component } from "react";
import "./TrendingSwitch.scss";
import axios from "axios";
export default class TrendingSwitch extends Component {
    async updatemovie(Num) {
        let res = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7')
        let res1 = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
        this.props.setData(Num, res.data.results, res1.data.genres)
    }
    async upadateTV(Num) {
        let res = await axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7')
        let res1 = await axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
        this.props.setData(Num, res.data.results, res1.data.genres)
    }
    handleClick = (Num) => {

        if (Num === 1) { this.updatemovie(Num) }
        else { this.upadateTV(Num) }
    }

    render() {
        return (
            <div className="trend-switch-container">
                <div className="trend-switch-wrap">
                    {
                        this.props.MovieorTV === 1 ?
                            <>
                                <div className="Movie-active ">Movie</div> <div className="TV" onClick={() => this.handleClick(0)}>TV</div>
                            </> :
                            <>
                                <div className="Movie" onClick={() => { this.handleClick(1) }}>Movie</div><div className="TV-active">TV</div>
                            </>
                    }
                </div>
            </div>
        )
    }
}