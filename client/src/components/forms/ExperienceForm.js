import React, {Fragment, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {FaUserTie} from 'react-icons/fa'

import {addExperience} from '../../actions/profileActions'

function ExperienceForm({ addExperience, history }){
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false
    })

    const {
        title,
        company,
        location,
        from,
        to,
        current
    } = formData
    
    const [toDateDisabled, toDateToggleDisabled] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addExperience(formData, history)
    }

    return(
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <FaUserTie size="20px" /> Add your past Experience
            </p>
            <small>* required field</small>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* Job Title" 
                        name="title" 
                        value={title} 
                        onChange={e => handleChange(e)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* Company" 
                        name="company" 
                        value={company} 
                        onChange={e => handleChange(e)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Location" 
                        name="location" 
                        onChange={e => handleChange(e)} 
                        value={location} 
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                        <input 
                            type="date" 
                            name="from" 
                            value={from} 
                            onChange={e => handleChange(e)}
                        />
                </div>
                <div className="form-group">
                    <p><input 
                        type="checkbox" 
                        name="current" 
                        checked={current} 
                        value={current} 
                        onChange={e => {
                            setFormData({
                                ...formData, 
                                current: !current
                            })
                            toDateToggleDisabled(!toDateDisabled)
                        }} 
                    /> {' '}Current Job?</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                        <input 
                            type="date" 
                            name="to" 
                            value={to} 
                            onChange={e => handleChange(e)} 
                            disabled={toDateDisabled ? 'disabled' : ''} 
                        />
                </div>
                
                <input type="submit" className="btn btn-primary my-1" />
                <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
            </form>
        </Fragment>
    )
}

ExperienceForm.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(ExperienceForm))