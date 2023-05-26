import "../grid.css"
import "./Toprated.scss"
import { Link } from "react-router-dom"
import axios from "axios";
import React, { Component } from "react";
import TopratedButton from "./TopratedButton/TopratedButton.js";
import TopratedSwitch from "./Switch/TopratedSwitch";
export default class Toprated extends Component {
    state = {
        listGenre: "",
        listToprated: "",
        Page: "",
        Movie_TV: "",
    }
    setData = (a, b, c, d) => {
        this.setState({
            listToprated: a,
            listGenre: b,
            Page: c,
            Movie_TV: d,
        })
    }
    setToprated_Page = (a, b) => {
        this.setState({
            listToprated: a,
            Page: b,
        })
    }
    async componentDidMount() {
        let res1 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
        let genre = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
        this.setState({
            listToprated: res1.data.results,
            listGenre: genre.data.genres,
            Page: 1,
            Movie_TV: 1,
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
    render() {
        let list = this.state.listToprated;
        return (
            <div className="col l-3 m-3 c-0">
                <div className='toprated-container'>
                    <div className="row no-gutters">
                        <div className="col l-12">
                            <h2>Top rated</h2>
                        </div>
                        <div className="col l-12">
                            <div className="action">
                                <TopratedSwitch setData={this.setData} Movie_TV={this.state.Movie_TV} />
                                <TopratedButton Page={this.state.Page} Movie_TV={this.state.Movie_TV} setToprated_Page={this.setToprated_Page} />
                            </div>
                        </div>
                        <div className="wrap">
                            {list && list.length > 0 &&
                                list.map((item, index) => {
                                    return (
                                        <div className="col l-12" key={index}>
                                            <Link to={`/ReactMovie/film/${this.state.Movie_TV ? "movie" : "tv"}/${item.id}`} className="link" onClick={() => {
                                                setTimeout(() => {
                                                    window.scrollTo(0, 0)
                                                }, "1000");
                                            }}>                                            <div className="item">
                                                    <div className="poster">
                                                        {item.poster_path ? <><img src={'https://image.tmdb.org/t/p/w200' + item.poster_path} alt="poster"></img></> : <><div>No poster</div></>}
                                                    </div>
                                                    <div className="content">
                                                        <div className="title">{this.state.Movie_TV === 1 ? ((index + 1 + this.state.Page * 20 - 20) + ". " + item.title) : ((index + 1 + this.state.Page * 20 - 20) + ". " + item.name)}</div>
                                                        <div className="genre">{this.show_genres(item.genre_ids)}</div>
                                                    </div>
                                                    <div className="rate">
                                                        <span>{Math.round(item.vote_average * 10) / 10} <i className="fa fa-star" ></i></span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}