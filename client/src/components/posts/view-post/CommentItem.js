import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'

import {deleteComment} from '../../../actions/postActions'
import { FaTimes } from 'react-icons/fa'

function CommentItem({postId, comment: {_id, text, name, avatar, user, date}, auth, deleteComment}){

    return(
        <div className="post bg-white p-1 my-1">
            <div>
                <img 
                    className="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>
                    {name}
                </h4>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD" >{date}</Moment> 
                </p>
                {
                    !auth.loading && user === auth.user._id && (
                        <button onClick={e => deleteComment(postId, _id)} className="btn btn-danger">
                            <FaTimes />    
                        </button>
                    )
                }
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)