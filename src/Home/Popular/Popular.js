import "../grid.css"
import "./Popular.scss"
import Button from "./Button/Button.js"
import axios from "axios";
import { Link } from "react-router-dom"
import React, { Component } from "react";
import PopSwitch from "./Switch/PopSwitch.js";
export default class Popular extends Component {
    state = {
        listGenre: "",
        listPopular: "",
        Page: "",
        Movie_TV: "",
    }
    setData = (a, b, c) => {
        this.setState({
            listPopular: a,
            listGenre: b,
            Page: c,
        })
    }
    setMovie_TV = (a) => {
        this.setState({
            Movie_TV: a,
        })
    }
    async componentDidMount() {
        let res1 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
        let res2 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=2')
        let res3 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=3')
        let arr = res1.data.results.concat(res2.data.results, res3.data.results);
        let genre = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
        const valueToRemove = undefined;
        let new_arr = arr.filter(item => item !== valueToRemove);
        this.setState({
            listPopular: new_arr,
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
        let list = this.state.listPopular
        return (
            <div className="col l-9 m-9 c-12">
                <div className="pop-container">
                    <div className="row no-gutters">
                        <div className="col l-12 m-12 c-12">
                            <div className=" pop-header">
                                <h1>What's popular</h1>
                                <PopSwitch setData={this.setData} setMovie_TV={this.setMovie_TV} Movie_TV={this.state.Movie_TV} />
                            </div>

                        </div>
                        <div className="col l-12 m-12 c-12"><hr></hr></div>
                        <div className="wrap">
                            <div className="row no-gutters">
                                {list && list.length > 0 &&
                                    list.map((item, index) => {
                                        return (
                                            <div className="col l-2 m-4 c-6">
                                                <div className="wrap-item" >
                                                    {item.poster_path ? <><img src={'https://image.tmdb.org/t/p/w200' + item.poster_path} alt="poster"></img></> : <><div>No poster</div></>}
                                                    <div className="item-content">
                                                        <div className="title">{this.state.Movie_TV === 1 ? item.title : item.name}</div>
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
                                                        <button className="watch"><Link to={`/ReactMovie/film/${this.state.Movie_TV ? "movie" : "tv"}/${item.id}`} className="link" onClick={() => {
                                                            setTimeout(() => {
                                                                window.scrollTo(0, 0)
                                                            }, "1000");
                                                        }}>Watch</Link></button>
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
                        <div className="col l-12 m-12 c-12"><hr></hr><Button Page={this.state.Page} Movie_TV={this.state.Movie_TV} setData={this.setData} /></div>

                    </div>
                </div>
            </div >)
    }
}