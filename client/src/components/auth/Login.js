import React, { Fragment, useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {login} from '../../actions/authActions'
import {setAlert} from '../../actions/alertActions'

function Login({ login, isAuthenticated }){
    const [formData, setState] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const handleChange = (e) => {
        setState({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(formData)
        setAlert('Logged-in Successfuly')
        setState({
          email: '',
          password: ''
        })
    }

    if(isAuthenticated){
      return <Redirect to = '/dashboard' />
    }

    return(
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
              <p className="lead"> <FaUser /> Sign into Your Account</p>
              <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                  <input
                    type = "email"
                    value = {email}
                    placeholder = "Email Address"
                    name = "email"
                    onChange = {e => handleChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type = "password"
                    value = {password}
                    placeholder = "Password"
                    name = "password"
                    onChange = {e => handleChange(e)}
                    required
                  />
                </div>
                <input type="submit" className="btn btn-primary"/>
              </form>
              <p className="my-1">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
        </Fragment>
    )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, { login, setAlert })(Login)