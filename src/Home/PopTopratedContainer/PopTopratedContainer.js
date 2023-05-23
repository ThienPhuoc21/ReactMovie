import "../grid.css"
// import "./PopTopratedContainer.scss"

import React, { Component } from "react";
import Toprated from "../Toprated/Toprated.js";
import Popular from "../Popular/Popular.js";
export default class PopTopratedContainer extends Component {
    render() {
        return (
            <div>
                <div className="grid">
                    <div className="row no-gutters">
                        <Toprated />
                        <Popular />
                    </div>
                </div>
            </div>
        )
    }
}