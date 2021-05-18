import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Loader from '../../layout/Loader'
import { Link } from 'react-router-dom'

import {getProfileById} from '../../../actions/profileActions'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExpeirence'
import ProfileEducation from './ProfileEducation'

function ViewProfile({ getProfileById, profile: {profile, loading}, auth, match }){
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    return (
        <Fragment>
        {profile === null || loading ? (
            <Loader />
            ) : (
                <Fragment>
                    <Link to ="/profiles" className="btn btn-light">
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === 
                    profile.user._id && (<Link to="/edit-profile" className="btn btn-dark">
                            Edit Profile
                        </Link>
                        )}
                        <div className="profile-grid my-1">
                            <ProfileTop profile={profile} />
                            <ProfileAbout profile={profile} />
                                <div className="profile-exp bg-white p-2">
                                    <h2 className="text-primary">Experience</h2>
                                    {profile.experience.length > 0 ? (
                                        <Fragment>
                                            {profile.experience.map((exp, i) => {
                                                return(
                                                    <ProfileExperience key={i} experience={exp} />
                                                )
                                            })}
                                    </Fragment>
                                    ): (
                                        <Fragment>
                                            <h4>
                                                No Experience credentials to show!
                                            </h4>
                                        </Fragment>
                                    )}
                                </div>

                                <div className="profile-edu bg-white p-2">
                                    <h2 className="text-primary">Education</h2>
                                    {profile.education.length > 0 ? (
                                        <Fragment>
                                            {profile.education.map((edu) => {
                                                return(
                                                    <ProfileEducation key={edu._id} education={edu} />
                                                )
                                            })}
                                    </Fragment>
                                    ): (
                                        <Fragment>
                                            <h4>
                                                No Education credentials to show!
                                            </h4>
                                            <Link to="/add-education" className="btn btn-ptimary">Add education</Link>
                                        </Fragment>
                                    )}
                                </div>
                        </div>
                </Fragment>
            )}
    </Fragment>)
}

ViewProfile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profileReducer,
    auth: state.authReducer
})

export default connect(mapStateToProps, { getProfileById })(ViewProfile)