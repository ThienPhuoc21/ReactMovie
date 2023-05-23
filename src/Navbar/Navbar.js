import React from 'react'
import {
    NavLink
} from 'react-router-dom'
import './Navbar.scss'

class Navbar extends React.Component {
    render() {
        return (
            <div className='nav-container'>
                {/* <img src='https://api.logo.com/api/v2/images?format=webp&logo=logo_47a5b2e7-ccf9-4687-8dc1-87e590f31052&width=1000&background=transparent&fit=contain&u=1670916660' alt="logo" className="logo" /> */}
                <div className='link'>
                    <NavLink to="/" exact activeClassName="active" className="nav-child">Home</NavLink>
                    <NavLink to="/movie" activeClassName="active" className="nav-child">Movie</NavLink>
                    <NavLink to="/tv" activeClassName="active" className="nav-child">TV</NavLink>
                    <NavLink to="/film" activeClassName="active" className="nav-child">Film</NavLink>
                </div>
            </div>
        )
    }
}
export default Navbar