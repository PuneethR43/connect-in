import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

function Alert({alerts}){
    return(
        alerts !== null && 
        alerts.length > 0 && 
        alerts.map((alert) => {
            return(
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
            )
        })
    )
}

Alert.propTypes = ({
    alerts: PropTypes.array.isRequired
})

const mapStateToProps = (state) => ({
    alerts: state.alertReducer
})

export default connect(mapStateToProps)(Alert)