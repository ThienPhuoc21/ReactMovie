import React from "react";
import './Film.scss'
import logo from '../logo.svg'
import axios from 'axios'
import withRouter from "./WithRouter";
import Videos from "./Videos";
import {
    Link
} from 'react-router-dom';

class Film extends React.Component {
    state = {
        film: "",
        id: this.props.params.id,
        mode: this.props.params.movieortv,
        loading: true
    }
    async componentDidMount() {
        this.setState({ loading: true })
        let listcast = await axios.get('https://api.themoviedb.org/3/' + this.state.mode + '/' + this.state.id + '/credits?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
        let recommen1 = await axios.get('https://api.themoviedb.org/3/' + this.state.mode + '/' + this.state.id + '/recommendations?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
        let recommen2 = await axios.get('https://api.themoviedb.org/3/' + this.state.mode + '/' + this.state.id + '/recommendations?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=2')
        let sim1 = await axios.get('https://api.themoviedb.org/3/' + this.state.mode + '/' + this.state.id + '/similar?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=1')
        let sim2 = await axios.get('https://api.themoviedb.org/3/' + this.state.mode + '/' + this.state.id + '/similar?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US&page=2')
        let res = await axios.get('https://api.themoviedb.org/3/' + this.state.mode + '/' + this.state.id + '?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
        this.setState({
            film: res.data,
            listCast: listcast.data.cast,
            recommendations: recommen1.data.results.concat(recommen2.data.results),
            similar: sim1.data.results.concat(sim2.data.results),
        })
        this.setState({ loading: false })
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
            str += genre[id].name + " "
        }
        str = str.slice(0, (str.length - 2));
        return str;
    }
    show_country = (listCountry) => {
        var str = ""
        for (var id in listCountry) {
            str += listCountry[id].name + " - "
        }
        str = str.slice(0, (str.length - 3));
        return str;
    }
    render() {
        let listGenre = this.state.film.genres
        let listCast = this.state.listCast
        let listRec = this.state.recommendations
        let listSim = this.state.similar
        let a = this.show_country(this.state.film.production_countries)
        let loading = this.state.loading
        return (loading ?
            <div className="film-container-loading">
                <h1 color="white">Loading...</h1>
                <img src={logo} className="load-logo" alt="logo" />
            </div>
            : <div className="film-container">
                <img className="film-backdrop" src={"https://image.tmdb.org/t/p/original/" + this.state.film.backdrop_path} alt="">
                </img>
                <div className="film-content">
                    <div className="wrap-content">
                        <img className="film-poster" src={"https://image.tmdb.org/t/p/original/" + this.state.film.poster_path} alt="">
                        </img>
                        <div className="film-detail">
                            <h1 className="film-title">{this.state.mode === "movie" ? this.state.film.title : (this.state.film.name)}</h1>
                            <div className="film-date-language-runtime">{this.state.mode === "movie" ? <div className="date">{this.fix_date(this.state.film.release_date)}</div> : <div className="date"> {this.fix_date(this.state.film.first_air_date) + " - " + this.fix_date(this.state.film.last_air_date)}</div>}
                                {a !== "" ? < div className="country">{this.show_country(this.state.film.production_countries)}</div> : <></>}
                                {this.state.mode === "movie" ? <div className="runtime">{this.state.film.runtime + " minutes"}</div> : <></>}
                                <div className="status">{this.state.film.status}</div>
                            </div>
                            <div className="film-genres"><h4>Genres</h4><div className="wrap-genre">
                                {
                                    listGenre && listGenre.length > 0 &&
                                    listGenre.map((item, index) => {
                                        return (<div key={index} className={item.name.split(" ")[0]}> {item.name}</div>)
                                    })
                                }</div>
                            </div>
                            <div className="film-overview"><h4>Overview</h4>{this.state.film.overview}</div>
                            <div className="film-score">
                                <div>
                                    <h4>Average vote</h4>
                                    <div><span className='vote'>{Math.round(this.state.film.vote_average * 10) / 10} <i className="fa fa-star" ></i></span></div></div>
                                <div>
                                    <h4>Popularity</h4>
                                    <div><span className='pop'>{Math.round(this.state.film.popularity * 10) / 10} <i className="fa fa-users" ></i></span></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <Videos id={this.state.id} mode={this.state.mode}></Videos>

                {
                    listCast && listCast.length > 0 ? <div className="film-cast">
                        <h2 className="film-cast-title">Top Billed Cast</h2>
                        <div className="wrap">
                            {
                                listCast && listCast.length > 0 &&
                                listCast.map((item, index) => {
                                    return (
                                        <div className="wrap-item" key={index}>
                                            <img className="profile-image" src={item.profile_path !== null ? ("https://image.tmdb.org/t/p/w200/" + item.profile_path) : ("https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png")} alt=""></img>
                                            <h4> {item.name}</h4>
                                            <div>{item.character ? item.character : ""}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> :
                        <></>
                }
                {
                    listRec && listRec.length > 0 ? <div className="film-rec">
                        <h2 className="film-rec-title">Recommendations</h2>
                        <div className="wrap">
                            {
                                listRec && listRec.length > 0 &&
                                listRec.map((item, index) => {
                                    return (
                                        <div className="wrap-item" key={index}>
                                            <Link to={`/ReactMovie/film/${this.state.mode}/${item.id}`} className="link" refresh="true" onClick={() => {
                                                setTimeout(() => {
                                                    window.scrollTo(0, 0);
                                                    window.location.reload(true);
                                                }, "2000");
                                            }}>
                                                <img className="profile-image" src={"https://image.tmdb.org/t/p/w200/" + item.poster_path} alt=""></img>
                                                <h4> {item.title ? item.title : item.name}</h4>
                                                <div className="score">
                                                    <div><span className='pop'>{Math.round(item.popularity * 10) / 10} <i className="fa fa-users" ></i></span></div>

                                                    <div><span className='vote'>{Math.round(item.vote_average * 10) / 10} <i className="fa fa-star" ></i></span></div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> : <></>
                }
                {
                    listSim && listSim.length > 0 ?
                        <div className="film-sim">
                            <h2 className="film-sim-title">Similars</h2>
                            <div className="wrap">
                                {
                                    listSim && listSim.length > 0 &&
                                    listSim.map((item, index) => {
                                        return (
                                            <div className="wrap-item" key={index}>
                                                <Link to={`/ReactMovie/film/${this.state.mode}/${item.id}`} className="link" refresh="true" onClick={() => {
                                                    setTimeout(() => {
                                                        window.location.reload(false);
                                                        window.scrollTo(0, 0);
                                                    }, "1000");
                                                }}>
                                                    <img className="profile-image" src={"https://image.tmdb.org/t/p/w200/" + item.poster_path} alt=""></img>
                                                    <h4> {item.title ? item.title : item.name}</h4>
                                                    <div className="score">
                                                        <div><span className='pop'>{Math.round(item.popularity * 10) / 10} <i className="fa fa-users" ></i></span></div>

                                                        <div><span className='vote'>{Math.round(item.vote_average * 10) / 10} <i className="fa fa-star" ></i></span></div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : <></>
                }

            </div >

        )
    }
}

export default withRouter(Film);
