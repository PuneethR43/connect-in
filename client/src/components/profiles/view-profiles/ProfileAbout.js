import React, {Fragment} from 'react'
import {FaCheck} from 'react-icons/fa'

function ProfileAbout({ profile: {bio, skills, user: {name}}}){
    return(
        <div className="profile-about bg-light p-2">
            
            {
                bio && <Fragment>
                        <h2 className="text-primary" >{name.split(' ')[0]}'s Bio</h2>
                        <p>{bio}</p>
                    </Fragment>
                }
            
            <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {
                    skills.map((skill, i) => {
                        return(
                            <div key={i} className="p-1">
                                <i><FaCheck /></i>{' '}{skill}  
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ProfileAbout