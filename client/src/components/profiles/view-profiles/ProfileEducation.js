import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

function ProfileEducation({education: {school, degree, specialization, from, to, current}}){
    return(
        <div>
            <h3 className="text-dark">
                {school}
            </h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p>
                <strong>Degree:</strong>{degree}
            </p>
            <p>
                <strong>Specialization:</strong>{specialization}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired
}

export default ProfileEducation