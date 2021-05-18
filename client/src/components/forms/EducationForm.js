import React, {Fragment, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {FaUserGraduate} from 'react-icons/fa'

import {addEducation} from '../../actions/profileActions'

function EducationForm({ addEducation, history }){
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        specialization: '',
        from: '',
        to: '',
        current: false
    })

    const {
        school,
        degree,
        specialization,
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
        addEducation(formData, history)
    }

    return(
        <Fragment>
            <h1 className="large text-primary">
                Add An Education
            </h1>
            <p className="lead">
                <FaUserGraduate size="20px" /> Add your Education
            </p>
            <small>* required field</small>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* School" 
                        name="school" 
                        value={school} 
                        onChange={e => handleChange(e)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* Degree" 
                        name="degree" 
                        value={degree} 
                        onChange={e => handleChange(e)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Specialization" 
                        name="specialization" 
                        value={specialization} 
                        onChange={e => handleChange(e)} 
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
                    /> {' '}Current Education?</p>
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
                <input 
                    type="submit" 
                    className="btn btn-primary my-1"
                />
                <Link to="/dashboard" className="btn btn-light my-1">
                    Go Back
                </Link>
            </form>
        </Fragment>
    )
}

EducationForm.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(EducationForm))