import React, {useState, Fragment} from 'react'
import {Link, withRouter,Redirect} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setAlert} from '../../actions/alertActions'
import {register} from '../../actions/authActions'

function Signup({ setAlert, register, isAuthenticated, history }){
const [formData, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
})
const {name, email, password, confirmPassword} = formData

const handleChange = (e) => {
    setState({...formData, [e.target.name]: e.target.value })
}

const handleSubmit = async(e) => {
    e.preventDefault()
    if(password !== confirmPassword){
        setAlert('Password do not match', 'danger')   
    }else{
        register(formData)
        setState({
            name:'',
            email: '',
        password: '',
        confirmPassword: ''
        })
        
    }
}

if(isAuthenticated){
    return <Redirect to = '/dashboard' />   
}

return(
    <Fragment>
        <h1 className="large text-primary">Signup page</h1>
        <p className="lead"> <FaUser/> Create Your Account</p>
            <form className="form" onSubmit = {e => handleSubmit(e)}>

                <div className="form-group">
                    <label>Name:</label>
                    <input 
                        type = "text" 
                        value = {name} 
                        name = 'name'
                        placeholder = "name" 
                        onChange = {e => handleChange(e)}
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>E-mail:</label>
                    <input 
                        type = "text" 
                        value = {email} 
                        name = "email"
                        placeholder = "e-mail" 
                        onChange = {e => handleChange(e)}
                        required 
                    />
                </div>
                <small className="form-text">
                    Use Gravatar email if you want a profile image
                </small>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type = "password" 
                        value = {password} 
                        name = "password"
                        placeholder = "password" 
                        onChange = {e => handleChange(e)}
                        minLength = "5"
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input 
                        type = "password" 
                        value = {confirmPassword} 
                        name = "confirmPassword"
                        placeholder = "Confirm Password" 
                        onChange = {e => handleChange(e)}
                        minLength = "5"
                        required 
                    />
                </div>
                <div>
                    <input type = "submit" className = "btn btn-primary" /> 
                </div>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
    </Fragment>
    )
}

Signup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register })(withRouter(Signup))