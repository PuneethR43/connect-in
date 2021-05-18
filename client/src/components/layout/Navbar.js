import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {RiMiniProgramLine, RiAccountBoxLine} from 'react-icons/ri' 
import {IoIosLogOut} from 'react-icons/io'
import {logout} from '../../actions/authActions' 

const NavBar = ({ auth: {isAuthenticated, loading}, logout }) => {
    const guestLinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    Developers
                </Link>
            </li>
            <li>
                <Link to="/signup">
                    Sign up
                </Link>
            </li>
            <li>
                <Link to="/login">
                    Login
                </Link>
            </li>
        </ul>
    )
    
    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    Developers
                </Link>
            </li>
            <li>
                <Link to="/posts">
                    Posts
                </Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <span className="hide-sm">
                        <RiAccountBoxLine size="20px"/> 
                        Dashboard
                        </span>
                </Link>
            </li>
                <li>
                <Link to="/" onClick={logout}>
                    <span className="hide-sm">
                    <IoIosLogOut size="20px"/> 
                    Logout 
                    </span>
                </Link>
            </li>
        </ul>
    )
    return(
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><RiMiniProgramLine /> Connect-in</Link>
            </h1>
            { !loading && (
                <Fragment>
                    { isAuthenticated ? authLinks : guestLinks }
                </Fragment>
            ) }
        </nav>
    )
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, { logout })(NavBar)