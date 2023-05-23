
import "./Trending.scss"
import React, { Component } from "react";
import {
    Link
} from 'react-router-dom'
import axios from "axios";
import TrendingSwitch from "./Switch/TrendindSwitch";
export default class Trending extends Component {
    state = {
        MovieorTV: 1,
        listTrending: "",
        listGenre: ""
    };
    async componentDidMount() {
        let res = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7')
        let res1 = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
        this.setState({
            listTrending: res.data.results,
            listGenre: res1.data.genres,
        })
    }
    fix_date = (date) => {
        if (date) {
            let year = date.slice(0, 4);
            let moth = date.slice(5, 7);
            let day = date.slice(8);
            let result = `${day}.${moth}.${year}`;
            return result;
        }
        else return "";

    }
    show_genres = (genre) => {
        var str = ""
        for (var id in genre) {
            for (var item in this.state.listGenre) {
                if (genre[id] === this.state.listGenre[item]['id']) {
                    str = str + this.state.listGenre[item]['name'] + ", "
                    break;
                }
            }
        }
        str = str.slice(0, (str.length - 2));
        return str;
    }
    setData = (a, b, c) => {
        this.setState({
            MovieorTV: a,
            listTrending: b,
            listGenre: c,
        })
    }
    render() {
        let list = this.state.listTrending;
        return (
            <div className="trend-container">
                <div className="row no-gutters">
                    <div className="col l-12 m-12 c-12">
                        <h1 className="trend-title">Trending</h1>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col l-12 m-12 c-12"><TrendingSwitch MovieorTV={this.state.MovieorTV} setData={this.setData} /></div>
                </div>
                <div className="row no-gutters">
                    <div className="wrap">
                        {list && list.length > 0 &&
                            list.map((item, index) => {
                                return (
                                    <div className="col l-2 m-3 c-6">
                                        <div className="wrap-item" >
                                            {item.poster_path ? <><img src={'https://image.tmdb.org/t/p/w200' + item.poster_path} alt="poster"></img></> : <><div>No poster</div></>}
                                            <div className="item-content">
                                                <div className="title">{this.state.MovieorTV === 1 ? item.title : item.name}</div>
                                                <div className="date">
                                                    {this.fix_date(item.release_date)}
                                                </div >
                                                <div className="genre">
                                                    {this.show_genres(item.genre_ids)}
                                                </div >
                                                <div className="score">
                                                    <div><span className='pop'>{Math.round(item.popularity * 10) / 10} <i className="fa fa-users" ></i></span></div>
                                                    <br></br>
                                                    <div><span className='vote'>{Math.round(item.vote_average * 10) / 10} <i className="fa fa-star" ></i></span></div>
                                                </div >
                                                <button className="watch"><Link to={`/ReactMovie/film/${this.state.MovieorTV ? "movie" : "tv"}/${item.id}`} className="link" >Watch</Link></button>
                                            </div>
                                            <div className="notification">
                                                <div className="adult">{item.adult === true ? "18+" : ""}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div >

        );
    }
}