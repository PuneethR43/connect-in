import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {RiGroup2Fill} from 'react-icons/ri'

import {getPosts} from '../../actions/postActions'
import Loader from '../layout/Loader'
import PostItem from './PostItem'
import PostForm from '../forms/PostForm'

function Posts({post: {posts, loading}, getPosts}){
    useEffect(() => {
        getPosts()
    }, [getPosts])
    return(
        loading ? <Loader /> : (
            <Fragment>
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    <RiGroup2Fill size="25px"/> Welcome to the Community
                </p>
                <PostForm />
                <div>
                    {
                        posts.map((post) => {
                            return(
                                <PostItem key={post._id} post={post} />
                            )
                        })
                    }
                </div>
            </Fragment>
            )
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.postReducer
})

export default connect(mapStateToProps, {getPosts})(Posts)