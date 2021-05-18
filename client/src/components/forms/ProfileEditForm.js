import React, {Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import {ImProfile} from 'react-icons/im'
import {createProfile, getProfile} from '../../actions/profileActions'

function ProfileEdit({ profile:{profile, loading}, createProfile, getProfile, history  }){
    const [formData, setFormData] = useState({
            company: '',
            location: '',
            bio: '',
            status:'',
            skills:'',
            gitUserName:''
        })     

        const {
                company,
                location,
                bio,
                status,
                skills,
                gitUserName
            } = formData

            useEffect(() => {
                getProfile()
                setFormData({
                    company: loading || !profile.company ? '' : profile.company,
                    location: location || !profile.location ? '' : profile.location,
                    bio: bio || !profile.bio ? '' : profile.bio,
                    status: status || !profile.status ? '' : profile.status,
                    skills: skills || !profile.skills ? '' : profile.skills.join(', '),
                    gitUserName: gitUserName || !profile.gitUserName ? '' : profile.gitUserName
                })
            },[loading, getProfile])

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            createProfile(formData, history)
        }
    return(
        <Fragment>
            <h1 className="large text-primary"> Create your Profile </h1>
            <p className="lead"><ImProfile size="20px"/> Add some information  </p>
            <small> * required field </small>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <select name='status' value={status} onChange={(e) => handleChange(e)} >
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Intern">Intern</option>
                    </select>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Company" name="company" value={company} onChange={(e) => handleChange(e)} />
                    </div>
                    <div>
                        <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => handleChange(e)} />
                        <small className="form-text">
                            City and State suggested (eg. Bengaluru, Karnataka)
                        </small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="*Skills" name="skills" value={skills} onChange={(e) => handleChange(e)} />
                    </div>
                    <div>
                        <input type="text" placeholder="GitHub user name" name="gitUserName" value={gitUserName} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="A short Bio of yourself" name="bio" value={bio} onChange={(e) => handleChange(e)} />
                        <small className="form-text">
                            Tell us about yourself
                        </small>
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                    
                    <Link to="/dashboard" className="btn btn-light my-1"> 
                        Go Back to Dashboard
                    </Link>
            </form>
        </Fragment>
    )
}

ProfileEdit.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profileReducer
})
export default connect(mapStateToProps, {createProfile, getProfile})(withRouter(ProfileEdit))