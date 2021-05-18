import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {FaUser} from 'react-icons/fa'
import Loader from '../layout/Loader'

import { deleteAccount, getProfile } from '../../actions/profileActions'
import DashboardLinks from './DashboardLinks'
import Experience from './Experience'
import Education from './Education'

function Dashboard({ auth: {user} , profile: {profile, loading}, getProfile, deleteAccount }){
    useEffect(() => {
        getProfile()
    }, [getProfile])

    return(
        <div> 
            {
                loading && profile === null ? ( <Loader />
                ) : (
                    <Fragment> 
                        <h1 className="large text-primary">Dashboard</h1>
                        <p className="lead"> 
                            <i><FaUser /></i>{' '}Welcome { user && user.name }
                        </p>
                        {
                            profile !== null ? ( 
                            <Fragment> 
                                    <DashboardLinks />
                                    <Experience experience={profile.experience} />
                                    <Education education={profile.education} />
                                    <div className="my-2">
                                        <button onClick={()=>deleteAccount(profile._id)}  className="btn btn-danger">Delete my Account</button>
                                    </div>
                            </Fragment>
                            ) : (
                            <Fragment>
                                <p> You have not created your profile yet, Add some info </p>
                                <Link to="/create-profile" className="btn btn-primary my-1" >Create Profile</Link>
                            </Fragment>
                            )  
                        }
                    </Fragment>
                )
            } 
        </div>
    )
}

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    profile: state.profileReducer
})

export default connect(mapStateToProps, { getProfile, deleteAccount } )(Dashboard)