import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {addComment} from '../../actions/postActions'
    
function CommentForm({postId, addComment}){
    const [text, setText] = useState('')
    return(
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Read {'&'} Add comments down here </h3>
            </div>
            <form 
                onSubmit={(e) => {
                    e.preventDefault()
                    addComment(postId, {text})
                    setText('')
                    }} 
                className="form my-1"
                >
                <textarea 
                    name="text" 
                    cols="30" 
                    rows="5" 
                    placeholder="Craete a Post" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <input 
                    type="submit" 
                    className="btn btn-dark my-1" 
                    value="submit" 
                />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, {addComment})(CommentForm)