import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import {FaGlobe, FaFacebook, FaTwitter, FaInstagram} from 'react-icons/fa'

function ProfileTop({profile: {status, company, location, user: {name, avatar}}}){
    return(
        <div className="profile-top bg-primary p-2">
            <img 
                src={avatar} 
                alt='' 
                className="round-img my-1" 
            />
            <h1 className="large">
                {name && <span>{name}</span>}
                
            </h1>
            <p className="lead">
                {status && <span>{status}</span>}
                {company && <span> at {company} </span>}
            </p>
            <p>
              {location && <span>{location}</span>}  
            </p>
            <div className="icons my-1">
            <Link href="#" target="_blank" rel="noopener noreferrer">
               <FaGlobe size="20px"/>
             </Link>
             <Link href="#" target="_blank" rel="noopener noreferrer">
               <FaFacebook size="20px"/>
             </Link>
             <Link href="#" target="_blank" rel="noopener noreferrer">
               <FaTwitter size="20px"/>
             </Link>
             <Link href="#" target="_blank" rel="noopener noreferrer">
               <FaInstagram size="20px"/>
             </Link>
            </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop