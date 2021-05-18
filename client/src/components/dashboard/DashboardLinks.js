import React from 'react'
import { Link } from 'react-router-dom'
import {FaUserEdit, FaUserTie, FaUserGraduate} from 'react-icons/fa'

function DashboardLinks(){
    return(
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
                <FaUserEdit size="20px" /> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                <FaUserTie size="20px" /> Add Experience
            </Link>
            <Link to="/add-education" className="btn btn-light">
                <FaUserGraduate size="20px" /> Add Education
            </Link>
        </div>
    )
}
export default DashboardLinks