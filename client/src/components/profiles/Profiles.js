import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {FaUsers} from 'react-icons/fa'

import {getAllProfiles} from '../../actions/profileActions'
import Loader from '../layout/Loader'
import ProfileItem from './ProfileItem'

function Profiles({ profile:{profiles, loading}, getAllProfiles }){
    useEffect(() => {
        getAllProfiles()
    }, [getAllProfiles])

    return(
        <Fragment>
            {loading ? (<Loader />) : (<Fragment> 
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                   <FaUsers />{' '} Connect with Developers
                </p>
                <div className="profiles">
                    {
                        profiles.length > 0 ? (
                        profiles.map((profile) => ( 
                                <ProfileItem key={profile._id} profile={profile} />
                        ))) : <h4>No Profiles found!</h4>
                    }
                </div>
                </Fragment>
            )}
        </Fragment>
    )
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profileReducer
})

export default connect(mapStateToProps, {getAllProfiles})(Profiles)
