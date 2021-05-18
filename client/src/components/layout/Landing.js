import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }
    return(
        <div className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
            <h1 className="x-large">Connect-in</h1>
            <p className="lead">
                Create a profile,Manage your professional identity, Build and engage with your professional network, share posts and get help from
                other developers
            </p>
            <div className="buttons">
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                <Link to="/login" className="btn btn-light">Login</Link>
            </div>
            </div>
        </div>
    </div>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps)(Landing)