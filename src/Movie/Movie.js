import React from "react";
import {
    Link
} from 'react-router-dom';
import './Movie.scss'
import axios from "axios";
import '../grid.css'
import Pagebutton from './Button/Pagebutton'
import Search from "./Button/Search";
class Movie extends React.Component {
    state = {
        listGenres: [],
        listMovies: [],
        listFilter: [],
        currentPage: "",
        query: "",
        year: "",
        mode: 1,
    }
    async componentDidMount() {
        let res1 = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&include_video=true&page=1')
        let res2 = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&include_video=true&page=2')
        let res3 = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&include_video=true&page=3')
        let res4 = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
        let arr = res1.data.results.concat(res2.data.results, res3.data.results)
        this.setState({
            listGenres: res4.data.genres,
            listMovies: arr,
            currentPage: 1,
        })
    }
    setMode = (a) => {
        this.setState({
            mode: a,
        })
    }
    setMovieandPage = (movie, currentPage) => {
        this.setState({
            listMovies: movie,
            currentPage: currentPage
        })
    }
    setFilter = (a) => {
        this.setState({
            listFilter: a
        })
    }
    setQuery = (a) => {
        this.setState({
            query: a
        })
    }

    handleGenreclick = (id) => {
        if (!this.state.listFilter.includes(id)) {
            let temp = [...this.state.listFilter, id]
            this.setState({
                listFilter: temp,
                mode: 3,
            })
        }
        else {
            let temp = [...this.state.listFilter]
            let valueToRemove = id
            let filteredItems = temp.filter(item => item !== valueToRemove)
            this.setState({
                listFilter: filteredItems,
                mode: 3
            })
        }

    }


    async handleFilter(listFilter) {
        let genres = listFilter.toString();
        let res1 = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1&with_genres=' + genres)
        let res2 = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=2&with_genres=' + genres)
        let res3 = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=3&with_genres=' + genres)
        let arr = res1.data.results.concat(res2.data.results, res3.data.results)
        this.setState({
            listMovies: arr,
            query: "",
            currentPage: 1,
            year: "",
        })
    }
    handleYear(event) {
        this.setState({
            year: event.target.value,
        })
    }
    async handleSearchYear(event) {
        let year = this.state.year.toString()
        let res1 = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1&primary_release_year=' + year)
        let res2 = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=2&primary_release_year=' + year)
        let res3 = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=3&primary_release_year=' + year)
        let arr = res1.data.results.concat(res2.data.results, res3.data.results)
        this.setState({
            listMovies: arr,
            mode: 4,
            currentPage: 1,
            listFilter: [],
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
            for (var item in this.state.listGenres) {
                if (genre[id] === this.state.listGenres[item]['id']) {
                    str = str + this.state.listGenres[item]['name'] + ", "
                    break;
                }
            }
        }
        str = str.slice(0, (str.length - 2));
        return str;
    }
    render() {
        let listgenre = this.state.listGenres
        let listfilter = this.state.listFilter
        let list = this.state.listMovies
        list = list.filter(item => item.poster_path !== null)
        return (
            <div className='movie-container'>
                <div className="row no-gutters">
                    <div className="col l-3 m-12 c-12">
                        <div className="sidebar-container">
                            <Search setMode={this.setMode} query={this.state.query} setQuery={this.setQuery} setFilter={this.setFilter} setMovieandPage={this.setMovieandPage}></Search>
                            <div className="genre">
                                <h3 className='genre-title'>Genres</h3>
                                <div className="genre-listgenres">
                                    {listgenre && listgenre.length > 0 &&
                                        listgenre.map((item, index) => {
                                            if (listfilter.includes(item.id)) {
                                                return (<div className="genre-items active" key={item.id} onClick={(event) => this.handleGenreclick(item.id)}>
                                                    {item.name}
                                                </div>)
                                            }
                                            else {
                                                return (<div className="genre-items" key={item.id} onClick={(event) => this.handleGenreclick(item.id)}>
                                                    {item.name}
                                                </div>)
                                            }

                                        })}
                                </div>
                                <button className="find" onClick={(event) => this.handleFilter(this.state.listFilter)}>Find</button>
                            </div>
                            <div className="year">
                                <h3 className="year-title">Years</h3>
                                <div className="year-wrap">
                                    <input type="text" placeholder="year of the movie" onChange={(event) => this.handleYear(event)}></input>
                                    <button className="year-button" onClick={(event) => this.handleSearchYear()}><i className="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col l-9 m-12 c-12">
                        <div className="listmovie-container">
                            <div className="header">
                                <h3>Movie</h3>
                            </div>
                            <div className="listmovie">
                                <div className="row no-gutters">
                                    {list && list.length > 0 &&
                                        list.map((item, index) => {
                                            return (
                                                <div className="col l-2 m-3 c-6">
                                                    <div className="wrap-item" >
                                                        {item.poster_path ?
                                                            <><img src={'https://image.tmdb.org/t/p/w200' + item.poster_path} alt="poster"></img>                                                        <div className="item-content">
                                                                <div className="title"> {item.title}</div>
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
                                                                <button className="watch"><Link to={`/film/movie/${item.id}`} className="link" >Watch</Link></button>
                                                            </div>
                                                                <div className="notification">
                                                                    <div className="adult">{item.adult === true ? "18+" : ""}</div>
                                                                </div></>
                                                            : <></>}

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <Pagebutton setData={this.setMovieandPage} currentPage={this.state.currentPage} query={this.state.query} listFilter={this.state.listFilter} year={this.state.year} mode={this.state.mode}>
                            </Pagebutton>

                        </div>
                    </div>
                </div >
            </div >
        )
    }
}
export default Movie 