import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FaRegThumbsUp, FaRegThumbsDown, FaTimes} from 'react-icons/fa'

import {addLike, removeLike, deletePost} from '../../actions/postActions'

function PostItem({post: {_id, text, user, username, avatar, likes, comments, date}, auth, addLike, removeLike, deletePost, showActions}){
    return(
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`} >
                    <img src={avatar} className="round-img" alt="" />
                    <h4>{username}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                {showActions && (
                    <Fragment>
                        <button onClick={(e) => addLike(_id)} className="btn btn-light">
                            <span>
                                <FaRegThumbsUp />{' '} {likes.length > 0 && (
                                <span>{likes.length}</span>
                            )}
                            </span>
                        </button>
                        <button onClick={(e) => removeLike(_id)} className="btn btn-light">
                                <FaRegThumbsDown />
                        </button>
                        <Link to={`/posts/${_id}`} className="btn btn-primary">
                            Discussion {comments.length > 0 && (
                                <span className="comment-count">{comments.length}</span>
                            )}
                        </Link>
                        {!auth.loading && user === auth.user._id && (
                        <button onClick={(e) => deletePost(_id)} className="btn btn-danger">
                            <FaTimes size="17px"/>
                        </button>
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    )
}
PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem)