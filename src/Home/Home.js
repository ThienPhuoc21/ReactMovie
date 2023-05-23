import React from "react";
import './Home.scss'

import PopTopratedContainer from "./PopTopratedContainer/PopTopratedContainer.js";
import Trending from "./Trending/Trending.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <Trending />
                <PopTopratedContainer />
            </div>
        )
    }
}
export default Home