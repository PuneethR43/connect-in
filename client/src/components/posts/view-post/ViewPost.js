import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Loader from '../../layout/Loader'
import PostItem from '../PostItem'
import CommentForm from '../../forms/CommentForm'
import CommentItem from './CommentItem'
import {getPostById, deleteComment} from '../../../actions/postActions'

function ViewPost({post: {post, loading},getPostById,  auth, deleteComment, match}){
    useEffect(() => {
        getPostById(match.params.id)
    }, [getPostById, match.params.id])

    return loading || post === null ? (
            <Loader />
            ) : (
                <Fragment>
                    <Link to='/posts' className="btn">
                        Go Back
                    </Link>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id} />
                    <div className="comments">
                        <ul>
                        {
                        post.comments.length > 0 ? (
                            post.comments.map((comment) => {
                                return(
                                <CommentItem key={comment._id} comment={comment} postId={post._id} />
                            )})
                        ) : (
                            <Fragment>
                                <h3>
                                    If you are not able to see the comment you added RELOAD the page, comments will show up / No comments to Show!!!
                                </h3>
                                <i>Note:Fixing this issue {"&"} will update soon</i>
                            </Fragment>
                            )
                            
                        }
                        </ul>
                    </div>
                </Fragment>
        )
}

ViewPost.propTypes = {
    getPostById: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    post: state.postReducer,
    auth: state.authReducer
})

export default connect(mapStateToProps, {getPostById, deleteComment})(ViewPost)